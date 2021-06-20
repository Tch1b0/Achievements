import * as vscode from 'vscode';
import { User } from "../User";
import { Achievement } from "./Achievement";

export function checkForCompletion(user: User, achievements: Array<Achievement>, context: vscode.ExtensionContext) {
    for (let i = 0; i < achievements.length; i++) {
        if (achievements[i].checkCondition(user) && !achievements[i].done) {
            achievements[i].finished(context);
        }
    }
}