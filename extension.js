"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
function activate(context) {
    const disposable = vscode.commands.registerCommand('autofixerincredible.showPanel', () => {
        const panel = vscode.window.createWebviewPanel('mrIncrediblePanel', 'Mr. Incredible', vscode.ViewColumn.Two, {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src', 'webview'))]
        });
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
        panel.webview.onDidReceiveMessage(async (message) => {
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
                const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
                edit.replace(document.uri, fullRange, fixedText);
                await vscode.workspace.applyEdit(edit);
                vscode.window.showInformationMessage('Applied all simple fixes!');
            }
        });
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map