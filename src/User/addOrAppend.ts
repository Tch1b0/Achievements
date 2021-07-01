// Increment value in Map or create it
export function addOrAppend(map: Map<string, number>, val: string): Map<string, number> {
    let num = map.get(val);
    if (num === undefined) {
        map.set(val, 1);
    } else {
        map.set(val, num + 1);
    }
    return map;
}