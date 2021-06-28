import * as vscode from 'vscode';
import { User } from './User/User';
import { getExtension } from './utils/getExtension';
import { checkForCompletion } from './achievements/checkForCompletion';
import { getAchievements } from './achievements/achievements';
import { AchievementPanel } from './Panel/AchievementPanel';
import { addOrAppend } from './User/addOrAppend';
import { StatusBar } from './StatusBar/StatusBar';

export function activate(context: vscode.ExtensionContext) {
	var user = new User();
	var achievements = getAchievements();
	const statusBar = new StatusBar("Achievements", "achievements.achievements");
	var watcher = vscode.workspace.createFileSystemWatcher('**/*');

	watcher.onDidCreate((e) => {
		user.filesCreated = addOrAppend(
			user.filesCreated,
			getExtension(e.fsPath, !e.fsPath.includes("."))
		);
		checkForCompletion(user, achievements, context, statusBar);
	});
	watcher.onDidChange((e) => {
		user.filesChanged = addOrAppend(
			user.filesChanged,
			getExtension(e.fsPath, !e.fsPath.includes("."))
		);
		checkForCompletion(user, achievements, context, statusBar);
	});
	watcher.onDidDelete((e) => {
		user.filesDeleted = addOrAppend(
			user.filesDeleted,
			getExtension(e.fsPath, !e.fsPath.includes("."))
		);
		checkForCompletion(user, achievements, context, statusBar);
	});
	context.subscriptions.push(watcher);

	context.subscriptions.push(vscode.commands.registerCommand("achievements.achievements", () => {
		AchievementPanel.createOrShow(context.extensionUri, achievements, statusBar);
	}));

	checkForCompletion(user, achievements, context, statusBar);
}

export function deactivate() { }
