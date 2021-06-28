import * as vscode from 'vscode';
import { User } from './User/User';
import { getExtension } from './utils/getExtension';
import { checkForCompletion } from './achievements/checkForCompletion';
import { getAchievements } from './achievements/achievements';
import { AchievementPanel } from './Panel/AchievementPanel';
import { addOrAppend } from './User/addOrAppend';
import { StatusBar } from './StatusBar/StatusBar';
import { Achievement } from './achievements/Achievement';

export function activate(context: vscode.ExtensionContext) {
	// load from storage
	var user = context.globalState.get<User>("User") || new User();
	var achievements = context.globalState.get<Array<Achievement>>("Achievements") || getAchievements();

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

export function deactivate(context: vscode.ExtensionContext) {
	context.globalState.update("User", context.workspaceState.get("User"));
	context.globalState.update("Achievements", context.workspaceState.get("Achievements"));
	context.globalState.setKeysForSync(["User", "Achievements"]);
}
