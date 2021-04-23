export const range = (start: number, end: number) => {
    if (end < start) return [];
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
}

export const areEqualSign = (a: number, b: number) => {
    if (a === b) return true;
    if (a === 0 || b === 0) return false;
    return a / Math.abs(a) === b / Math.abs(b);
}

export const areDifSignNonZero = (a: number, b: number) => {
    if (a === 0 || b === 0) return false;
    return a / Math.abs(a) !== b / Math.abs(b);
}