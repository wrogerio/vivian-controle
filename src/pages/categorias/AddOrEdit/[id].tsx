import HeaderPage from "@/components/HeaderPage";
import { categoria } from "@/interfaces";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

export const Alterar = () => {
    const router = useRouter();
    const urlRoot = "categorias";

    const [categorias, setCategorias] = useState({} as categoria);

    const handleData = async () => {
        const id = window.location.href.split("/AddOrEdit/")[1];
        if (id != "0") {
            const res = await fetch(`/api/${urlRoot}/` + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Id: categorias.Id,
                    Nome: categorias.Nome,
                }),
            });
            redirectToList(await res.json());
        } else {
            const res = await fetch(`/api/${urlRoot}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Nome: categorias.Nome,
                }),
            });
            redirectToList(await res.json());
        }
    };

    const redirectToList = (respResult: boolean) => {
        if (respResult) router.push(`/${urlRoot}`);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategorias({ ...categorias, [name]: value });
    };

    useEffect(() => {
        const id = window.location.href.split("/AddOrEdit/")[1];
        if (id != "0") {
            fetch(`/api/${urlRoot}/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setCategorias(data[0] as categoria);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    return (
        <>
            <HeaderPage title="Categorias" pageType="cadastrar" accessKey="v" textBt="Voltar" linkToBack={"/" + urlRoot} iconBt="fas fa-list me-2"></HeaderPage>
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col mb-2">
                                    <div className="form-group">
                                        <label>Categoria</label>
                                        <input type="text" className="form-control" name="nome" autoFocus value={categorias.Nome} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="d-flex justify-content-between">
                                        <span onClick={handleData} className="btn btn-outline-primary" accessKey="s">
                                            <i className="fas fa-save"></i>
                                            <span className="ms-2">Salvar</span>
                                        </span>
                                        <Link href={"/" + urlRoot} className="btn btn-outline-secondary" accessKey="v">
                                            <i className="fas fa-times"></i>
                                            <span className="ms-2">Voltar</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Alterar;
