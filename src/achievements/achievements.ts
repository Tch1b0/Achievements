import { User } from "../User";
import { Achievement } from "./Achievement";

export function getAchievements(): Array<Achievement> {
    return [
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
                return user.filesCreated.includes(".asm");
            }
        ),
        new Achievement(
            "Keep it simple",
            "Work with beginner friendly programming languages",
            "Create a python, ruby and html file",
            false,
            (user: User) => {
                return user.filesCreated.includes(".html") && user.filesCreated.includes(".py") && user.filesCreated.includes(".rb");
            }
        ),
        new Achievement(
            "Not your storage",
            "These npm packages really require lots of space",
            "Delete a node_modules directory",
            false,
            (user: User) => {
                for (let i = 0; i < user.filesDeleted.length; i++) {
                    if (user.filesDeleted[i].endsWith("node_modules")) {
                        return true;
                    }
                }
                return false;
            }
        ),
        new Achievement(
            "That's not how a brain works",
            "Deleting it was propably a better decision than creating it",
            "Delete a .b file",
            false,
            (user: User) => {
                return user.filesDeleted.includes(".b");
            }
        )
    ];
}