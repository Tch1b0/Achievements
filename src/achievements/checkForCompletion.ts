import * as vscode from 'vscode';
import { User } from "../User/User";
import { Achievement } from "./Achievement";

export function checkForCompletion(user: User, achievements: Array<Achievement>, context: vscode.ExtensionContext) {
    achievements.forEach((achievement) => {
        if (achievement.checkCondition(user) && !achievement.done) {
            achievement.finished(context, achievements);
        }
    });
}