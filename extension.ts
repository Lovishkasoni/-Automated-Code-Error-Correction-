import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('autofixerincredible.showPanel', () => {
    const panel = vscode.window.createWebviewPanel(
      'mrIncrediblePanel',
      'Mr. Incredible',
      vscode.ViewColumn.Two,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src', 'webview'))]
      }
    );

    panel.webview.html = `
      <!doctype html>
      <html>
      <body>
        <h2>Mr. Incredible</h2>
        <p>Waiting for diagnostics...</p>
        <button id="apply">Apply all simple fixes</button>
        <script>
          const vscode = acquireVsCodeApi();
          document.getElementById('apply').addEventListener('click', () => {
            vscode.postMessage({ command: 'applyAll' });
          });
        </script>
      </body>
      </html>`;

    panel.webview.onDidReceiveMessage(async message => {
      if (message.command === 'applyAll') {
        // ✅ FIXED: Get the last active editor (not the webview)
        const editor = vscode.window.visibleTextEditors.find(e => e.viewColumn === 1);

        if (!editor) {
          vscode.window.showErrorMessage('No active file to fix!');
          return;
        }

        const document = editor.document;
        const text = document.getText();

        let fixedText = text;

        // 1. Replace == with ===
        fixedText = fixedText.replace(/==/g, '===');

        // 2. Replace != with !==
        fixedText = fixedText.replace(/!=/g, '!==');

        // 3. Remove trailing spaces
        fixedText = fixedText.replace(/[ \t]+$/gm, '');

        // 4. Auto-fix missing semicolons at end of lines
        fixedText = fixedText.replace(/(?<=[^\s;])\n/g, ';\n');

        // 5. Fix accidental console.logs left behind
        fixedText = fixedText.replace(/console\.log\(.*?\);?/g, '// console.log removed by Autofixer');

        // 6. Fix double spaces → single space
        fixedText = fixedText.replace(/ {2,}/g, ' ');

        // 7. Auto-fix missing parentheses in if statements (simple cases)
        fixedText = fixedText.replace(/if\s+([^()\n]+)\s*{/g, 'if ($1) {');

        //8. fix misplaced commas
        fixedText = fixedText.replace(/,\s*}/g, ' }');

        //9. convert var to let
        fixedText = fixedText.replace(/\bvar\b/g, 'let');

        //10. Convert function () → arrow functions (simple patterns)
        fixedText = fixedText.replace(/function\s*\((.*?)\)\s*{/g, '($1) => {');

        //11.Remove unused empty lines
        fixedText = fixedText.replace(/\n{3,}/g, '\n\n');

        //12. Fix missing commas between object properties
        fixedText = fixedText.replace(/(\w+:\s*[^,\n}]+)\s*\n/g, '$1,\n');


        const edit = new vscode.WorkspaceEdit();
        const fullRange = new vscode.Range(
          document.positionAt(0),
          document.positionAt(text.length)
        );
        edit.replace(document.uri, fullRange, fixedText);

        await vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage('Applied all simple fixes!');
      }
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
