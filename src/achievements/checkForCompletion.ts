import * as vscode from 'vscode';
import { StatusBar } from '../StatusBar/StatusBar';
import { User } from "../User/User";
import { Achievement } from "./Achievement";

export function checkForCompletion(user: User, achievements: Array<Achievement>, context: vscode.ExtensionContext, statusBar: StatusBar) {
    achievements.forEach((achievement) => {
        if (achievement.checkCondition(user) && !achievement.done) {
            achievement.finished(context, achievements, statusBar);
        }
    });
    context.workspaceState.update("User", user);
    context.workspaceState.update("Achievements", achievements);
}