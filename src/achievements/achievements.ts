import { User } from "../User";
import { Achievement } from "./Achievement";

export function getAchievements(): Array<Achievement> {
    return [
        new Achievement(
            "Welcome!",
            "Thank you for downloading the Achievements extention!",
            "Download the Achievements extention",
            false,
            (_user: User) => {
                return true;
            }
        ),
        new Achievement(
            "Life Completed",
            "Start working on assembler projects and move to a lonely hut somewhere in Canada",
            "Create a .asm file",
            false,
            (user: User) => {
                return user.filesCreated.includes("asm");
            }
        )
    ];
}