export interface categoria {
import { categoria } from './index';
    id: number;
    nome: string;
}

export interface lancamento {
    id: number;
    dtLancamento: Date;
    dtLancamentostring: string;
    descricao: string;
    valor: number;
    categoriaId: number;
    categoria: string;
}

export interface items {
    categoria: string;
    total: number;
}
