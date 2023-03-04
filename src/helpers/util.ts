export const ConvertToPtBrUTC = (date: Date) => {
    date.setHours(date.getHours() + 3);
    return date;
};

export const ConvertToBrlCurrency = (numero: number) => {
    return numero?.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
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

export const ConvertToMesNome = (mesNumero: number) => {
    switch (mesNumero) {
        case 1:
            return "Janeiro";
            break;
        case 2:
            return "Fevereiro";
            break;
        case 3:
            return "Marco";
            break;
        case 4:
            return "Abril";
            break;
        case 5:
            return "Maio";
            break;
        case 6:
            return "Junho";
            break;
        case 7:
            return "Julho";
            break;
        case 8:
            return "Agosto";
            break;
        case 9:
            return "Setembro";
            break;
        case 10:
            return "Outubro";
            break;
        case 11:
            return "Novembro";
            break;
        case 12:
            return "Dezembro";
            break;
        default:
            return "";
            break;
    }
};
