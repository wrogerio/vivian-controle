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
    TipoId: string;
    StatusId: string;
    Status: string;
    Categoria: string;
    Tipo: string;
}

export interface items {
    Categoria: string;
    Total: number;
}

export interface gastoDiario {
    Ano: number;
    Mes: number;
    Dia: number;
    DiaNome: string;
    Total: number;
}
