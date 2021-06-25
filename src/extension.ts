import * as vscode from 'vscode';
import { User } from './User/User';
import { getExtension } from './getExtension';
import { checkForCompletion } from './achievements/checkForCompletion';
import { getAchievements } from './achievements/achievements';
import { AchievementPanel } from './Panel/AchievementPanel';
import { addOrAppend } from './User/addOrAppend';

export function activate(context: vscode.ExtensionContext) {
	var user = new User();
	var achievements = getAchievements();
	var watcher = vscode.workspace.createFileSystemWatcher('**/*');

	watcher.onDidCreate((e) => {
		console.log(e.fsPath);
		user.filesCreated = addOrAppend(
			user.filesCreated,
			getExtension(e.fsPath, !e.fsPath.includes("."))
		);
		checkForCompletion(user, achievements, context);
	});
	watcher.onDidChange((e) => {
		user.filesChanged = addOrAppend(
			user.filesChanged,
			getExtension(e.fsPath, !e.fsPath.includes("."))
		);
		checkForCompletion(user, achievements, context);
	});
	watcher.onDidDelete((e) => {
		user.filesDeleted = addOrAppend(
			user.filesDeleted,
			getExtension(e.fsPath, !e.fsPath.includes("."))
		);
		checkForCompletion(user, achievements, context);
	});
	context.subscriptions.push(watcher);

	context.subscriptions.push(vscode.commands.registerCommand("achievements.achievements", () => {
		AchievementPanel.createOrShow(context.extensionUri, achievements);
	}));
	checkForCompletion(user, achievements, context);
}

export function deactivate() { }
