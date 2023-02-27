export const ConvertToPtBrUTC = (date: Date) => {
    date.setHours(date.getHours() + 3);
    return date;
};

export const ConvertNumberTwoDigits = (numero: number) => {
    return numero < 10 ? `0${numero}` : numero;
};

export const ConvertToStringDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? `0${month}` : `${month}`}-${day < 10 ? `0${day}` : `${day}`}`;
};
