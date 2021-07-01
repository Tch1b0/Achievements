import * as vscode from 'vscode';
import { StatusBar } from '../StatusBar/StatusBar';
import { User } from "../User/User";
import { Achievement } from "./Achievement";

// Check wether an achievement is done
export function checkForCompletion(user: User, achievements: Array<Achievement>, context: vscode.ExtensionContext, statusBar: StatusBar) {
    achievements.forEach((achievement) => {

        // If the condition is true and the achievement isn't done
        if (!achievement.done && achievement.checkCondition(user)) {
            achievement.finished(context, achievements, statusBar);
        }
    });

    // Update the keys
    context.globalState.update("User", user);
    context.globalState.update("Achievements", achievements);
}