export function getPart(name: string, splitter: string): string {
    let splittedString = name.split(splitter);
    return splitter + splittedString[splittedString.length - 1];
}