import { Achievement } from "./Achievement";

export function accomplishedAchievements(achievements: Array<Achievement>) {
    let accomplishedAchievements = [];
    for (let i = 0; i < achievements.length; i++) {
        if (achievements[i].done) {
            accomplishedAchievements.push(achievements[i]);
        }
    }
    return accomplishedAchievements;
}