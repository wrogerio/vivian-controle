export interface categoria {
    Id: string;
    Nome: string;
}

export interface lancamento {
    Id: string;
    DtLancamento: Date;
    DtLancamentoString: string;
    Descricao: string;
    Valor: number;
    CategoriaId: string;
    Categoria: string;
}

export interface items {
    categoria: string;
    total: number;
}
