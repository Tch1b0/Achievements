export function getExtension(name: string, isFolder: boolean = false): string {
    if (isFolder) {
        let splitted = name.split("/");
        if (splitted[0] === name) {
            splitted = name.split("\\");
        }
        return "/" + splitted[splitted.length - 1];
    } else {
        let splitted = name.split(".");
        return "." + splitted[splitted.length - 1];
    }
}