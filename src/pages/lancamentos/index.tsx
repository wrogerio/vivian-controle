import HeaderPage from "./../../components/HeaderPage";
import { useEffect, useState } from "react";
import { lancamento } from "./../../interfaces/index";
const Index = () => {
    const [lancamentos, setLancamentos] = useState({} as lancamento);
    const urlRoot = "lancamentos";

    useEffect(() => {
        LoadData().then((data) => {
            setLancamentos(data);
        });
    }, []);

    const LoadData = async () => {
        const res = await fetch(`/api/${urlRoot}`);
        const data = await res.json();

        // error handle
        if (data.error) console.log(data.error);
        return data;
    };

    const RemoveData = (id: number) => {
        if (confirm("Deseja realmente remover ?")) {
            fetch(`/api/${urlRoot}/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data: boolean) => {
                    if (data) {
                        LoadData().then((data) => {
                            setLancamentos(data);
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <>
            <HeaderPage title="Lançamentos" pageType="index" accessKey="c" textBt="Cadastrar" linkToBack={`/${urlRoot}/AddOrEdit/0`} iconBt="fas fa-money-bill-wave me-2"></HeaderPage>
            <table className="table table-sm table-bordered">
                <thead>
                    <tr>
                        <th style={{ width: 110 }}>Data</th>
                        <th className="d-none d-md-table-cell">Categoria</th>
                        <th style={{ width: 110 }}>Valor</th>
                        <th className="d-none d-lg-table-cell">Descrição</th>
                        <th className="text-center">#</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(lancamentos) &&
                        lancamentos.map((obj: lancamento) => (
                            <tr key={obj.id}>
                                <td>{new Date(obj.dtLancamento).toLocaleDateString("pt-BR")}</td>
                                <td className="d-none d-md-table-cell">{obj.categoria}</td>
                                <td>{obj.valor.toLocaleString("pt-BR")}</td>
                                <td className="d-none d-lg-table-cell">{obj.descricao}</td>
                                <td className="text-center">
                                    <a href={`/${urlRoot}/AddOrEdit/${obj.id}`} className="me-2">
                                        <i className="fas fa-edit"></i>
                                    </a>
                                    <span className="text-danger" onClick={(e) => RemoveData(obj.id)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </span>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
};

export default Index;
