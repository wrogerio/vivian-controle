export const ConvertToPtBrUTC = (date: Date) => {
    date.setHours(date.getHours() + 3);
    return date;
};
