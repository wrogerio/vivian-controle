export interface categoria {
    Id: number;
    Nome: string;
}

export interface lancamento {
    Id: number;
    DtLancamento: Date;
    DtLancamentoString: string;
    Descricao: string;
    Valor: number;
    CategoriaId: number;
}
