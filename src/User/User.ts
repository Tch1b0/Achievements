export class User {
    charactersWritten!: number;
    filesCreated: Map<string, number> = new Map();
    filesChanged: Map<string, number> = new Map();
    filesDeleted: Map<string, number> = new Map();
}