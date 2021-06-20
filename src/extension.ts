import * as vscode from 'vscode';
import { User } from './User';
import { getExtention } from './utils';
import { checkForCompletion } from './achievements/check';
import { getAchievements } from './achievements/achievements';

export function activate(context: vscode.ExtensionContext) {
	var user = new User();
	var achievements = getAchievements();
	var watcher = vscode.workspace.createFileSystemWatcher('**/*.*');

	watcher.onDidCreate((e) => {
		user.filesCreated.push(
			getExtention(e.fsPath)
		);
		checkForCompletion(user, achievements);
	});
	watcher.onDidDelete((e) => {
		user.filesDeleted.push(
			getExtention(e.fsPath)
		);
		checkForCompletion(user, achievements);
	});
	context.subscriptions.push(watcher);

	context.subscriptions.push(vscode.commands.registerCommand("achievements.info", () => {
		vscode.window.showInformationMessage(
			`Files Created: ${user.filesCreated.toString()}` +
			`Files Deleted: ${user.filesDeleted.toString()}`
		);
	}));

	checkForCompletion(user, achievements);
}

export function deactivate() { }
