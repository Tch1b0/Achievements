export function getExtention(name: string): string {
    let splittedString = name.split(".");
    return splittedString[splittedString.length - 1];
}