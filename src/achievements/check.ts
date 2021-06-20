import { User } from "../User";
import { Achievement } from "./Achievement";

export function checkForCompletion(user: User, achievements: Array<Achievement>) {
    for (let i = 0; i < achievements.length; i++) {
        if (achievements[i].checkCondition(user) && !achievements[i].done) {
            achievements[i].finished();
        }
    }
}