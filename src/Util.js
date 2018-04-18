// Scale number between range
export const scaleBetween = (
    value,
    rangeStart,
    rangeEnd,
    minData,
    maxData
) => (
   (rangeEnd - rangeStart) * (value - minData) / (maxData - minData) + rangeStart
);

export const distance = (p1, p2, allowNegative = true) => {
    let dis = p1 - p2;
    if (!allowNegative && dis < 0) {
        dis = 0;
    }

    return dis;
}
