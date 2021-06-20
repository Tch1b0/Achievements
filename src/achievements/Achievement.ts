import * as vscode from 'vscode';

export class Achievement {
    name!: string;
    description!: string;
    condition!: string;
    done!: boolean;
    checkCondition!: any;

    constructor(name: string, description: string, condition: string, done: boolean, checkCondition: any) {
        this.name = name;
        this.description = description;
        this.condition = condition;
        this.done = done;
        this.checkCondition = checkCondition;
    }

    async finished(): Promise<void> {
        this.done = true;
        let answer = await vscode.window.showInformationMessage(
            `Achievement unlocked!\t${this.name}`,
            "show"
        );
        if (answer === "show") {

        }
    }
}