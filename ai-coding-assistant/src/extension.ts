// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ai-coding-assistant" is now active!');

	let disposable = vscode.commands.registerCommand('ai-coding-assistant.suggestCode', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const text = editor.document.getText(editor.selection);
            const suggestion = await fetchCodeSuggestion(text);
            editor.edit(editBuilder => {
                editBuilder.insert(editor.selection.end, suggestion);
            });
        }
    });

	context.subscriptions.push(disposable);
}

async function fetchCodeSuggestion(codeSnippet: string): Promise<string> {
    const response = await fetch('https://localhost:4000/generate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeSnippet, language: "JavaScript" })
    });
    const data: { suggestion: string } = await response.json() as { suggestion: string };
    return data.suggestion;
}

export function deactivate() {}