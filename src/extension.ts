import * as vscode from 'vscode';
import { User } from './User';
import { getExtention } from './utils';
import { checkForCompletion } from './achievements/check';
import { getAchievements } from './achievements/achievements';
import { AchievementPanel } from './Panel/AchievementPanel';

export function activate(context: vscode.ExtensionContext) {
	var user = new User();
	var achievements = getAchievements();
	var watcher = vscode.workspace.createFileSystemWatcher('**/*.*');

	watcher.onDidCreate((e) => {
		user.filesCreated.push(
			getExtention(e.fsPath)
		);
		checkForCompletion(user, achievements, context);
	});
	watcher.onDidDelete((e) => {
		user.filesDeleted.push(
			getExtention(e.fsPath)
		);
		checkForCompletion(user, achievements, context);
	});
	context.subscriptions.push(watcher);

	context.subscriptions.push(vscode.commands.registerCommand("achievements.achievements", () => {
		AchievementPanel.createOrShow(context.extensionUri);
	}));

	checkForCompletion(user, achievements, context);
}

export function deactivate() { }
