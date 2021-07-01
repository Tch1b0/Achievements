import { User } from "../User/User";
import { Achievement } from "./Achievement";

export function getAchievements(obj?: Array<Achievement> | undefined): Array<Achievement> {
    let achievements = [
        new Achievement(
            "Welcome!",
            "Thank you for downloading the Achievements extension!",
            "Download the Achievements extension",
            false,
            (_user: User) => {
                return true;
            }
        ),
        new Achievement(
            "Bye Friends",
            "Start working on assembly projects and move to a lonely hut somewhere in Canada",
            "Create a assembly file",
            false,
            (user: User) => {
                return user.filesCreated.has(".asm");
            }
        ),
        new Achievement(
            "Keep it simple",
            "Work with beginner friendly programming languages",
            "Create a python, ruby and html file",
            false,
            (user: User) => {
                return (user.filesCreated.has(".html") &&
                    user.filesCreated.has(".py") &&
                    user.filesCreated.has(".rb"));
            }
        ),
        new Achievement(
            "That's not how a brain works",
            "Deleting it was propably a better decision than creating it",
            "Delete a .b file",
            false,
            (user: User) => {
                return user.filesDeleted.has(".b") || user.filesDeleted.has(".bf");
            }
        ),
        new Achievement(
            "Time to personalize",
            "This may be a pretty good idea",
            "Create a file that ends with rc",
            false,
            (user: User) => {
                for (let key of user.filesCreated.keys()) {
                    if (key.endsWith("rc")) { return true; }
                }
                return false;
            }
        )
    ];
    if (obj === undefined) { return achievements; }
    achievements.forEach((achievement) => {
        let item = obj.find((k) => k.name === achievement.name);
        if (item !== undefined) {
            achievement.done = item.done;
        }
    });
    return achievements;
}