import * as vscode from 'vscode';
import { StatusBar } from '../StatusBar/StatusBar';
import { User } from "../User/User";
import { Achievement } from "./Achievement";

export function checkForCompletion(user: User, achievements: Array<Achievement>, context: vscode.ExtensionContext, statusBar: StatusBar) {
    achievements.forEach((achievement) => {
        // If the condition is true and the achievement isn't done
        if (achievement.checkCondition(user) && !achievement.done) {
            achievement.finished(context, achievements, statusBar);
        }
    });
    context.globalState.update("User", user);
    context.globalState.update("Achievements", achievements);
}