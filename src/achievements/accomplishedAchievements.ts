import { Achievement } from "./Achievement";

// return an Array including all achivements that are done
export function accomplishedAchievements(achievements: Array<Achievement>) {
    let accomplishedAchievements = [];
    for (let i = 0; i < achievements.length; i++) {
        if (achievements[i].done) {
            accomplishedAchievements.push(achievements[i]);
        }
    }
    return accomplishedAchievements;
}