export class User {
    filesCreated: Map<string, number> = new Map();
    filesDeleted: Map<string, number> = new Map();

    constructor(obj?: User | undefined) {
        // Load ancient User if not undefined
        if (obj !== undefined) {
            this.filesCreated = new Map(Object.entries(obj.filesCreated));
            this.filesDeleted = new Map(Object.entries(obj.filesDeleted));
        }
    }
}