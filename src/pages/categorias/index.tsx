import HeaderPage from "./../../components/HeaderPage";
import { useEffect, useState } from "react";
import { categoria } from "./../../interfaces/index";
const Index = () => {
    const [categorias, setCategorias] = useState({} as categoria);
    const urlRoot = "categorias";

    useEffect(() => {
        LoadData().then((data) => {
            setCategorias(data);
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
                            setCategorias(data);
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
            <HeaderPage title="Categorias" pageType="index" accessKey="c" textBt="Cadastrar" linkToBack={`/${urlRoot}/AddOrEdit/0`} iconBt="fas fa-plus-circle me-2"></HeaderPage>
            <table className="table table-sm table-bordered">
                <thead>
                    <tr>
                        <th>Categoria</th>
                        <th className="text-center">#</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(categorias) &&
                        categorias.map((obj: categoria) => (
                            <tr key={obj.Id}>
                                <td>{obj.Nome}</td>
                                <td className="text-center">
                                    <a href={`/${urlRoot}/AddOrEdit/${obj.Id}`} className="me-2">
                                        <i className="fas fa-edit"></i>
                                    </a>
                                    <span className="text-danger" onClick={(e) => RemoveData(obj.Id)}>
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
