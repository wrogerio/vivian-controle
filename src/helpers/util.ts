export const ConvertToPtBrUTC = (date: Date) => {
    date.setHours(date.getHours() + 3);
    return date;
};

export const ConvertNumberTwoDigits = (numero: number) => {
    return numero < 10 ? `0${numero}` : numero;
};
