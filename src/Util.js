// Scale number between range
export const scaleBetween = (
    value,
    rangeStart,
    rangeEnd,
    minData,
    maxData
) => (
   (rangeEnd - rangeStart) * (value - minData) / (maxData - minData) + rangeStart
)