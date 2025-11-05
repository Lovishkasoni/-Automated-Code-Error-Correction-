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

        // Example of a simple ESLint-style fix (replace == with ===)
        const fixedText = text.replace(/==/g, '===');

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
