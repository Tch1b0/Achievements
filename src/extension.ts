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
	// Sync the 'User' and 'Achievements' Key with the account
	context.globalState.setKeysForSync(["User", "Achievements"]);

	// load from storage
	let user = new User(context.globalState.get<User>("User"));
	let achievements = getAchievements(context.globalState.get<Array<Achievement>>("Achievements"));

	// Initiate StatusBar
	const statusBar = new StatusBar("Achievements", "achievements.achievements");
	var watcher = vscode.workspace.createFileSystemWatcher('**/*');

	// Called when a file/directory is created
	watcher.onDidCreate((e) => {
		user.filesCreated = addOrAppend(
			user.filesCreated,
			getExtension(e.fsPath, !e.fsPath.includes("."))
		);
		checkForCompletion(user, achievements, context, statusBar);
	});

	// Called whene a file/directory is deleted
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
	context.subscriptions.push(vscode.commands.registerCommand("achievements.reset", async () => {
		let answer = await vscode.window.showInformationMessage(
			"Do you really want to reset your Achievements?",
			"Yes",
			"No"
		);
		if (answer === "Yes") {
			AchievementPanel.kill();
			achievements.forEach((achievement) => {
				achievement.done = false;
			});
			user = new User();
			checkForCompletion(user, achievements, context, statusBar);
		}
	}));

	checkForCompletion(user, achievements, context, statusBar);

}

export function deactivate(context: vscode.ExtensionContext) { }
