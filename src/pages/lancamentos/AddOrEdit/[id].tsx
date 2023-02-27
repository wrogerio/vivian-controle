import HeaderPage from "@/components/HeaderPage";
import { ConvertToStringDate } from "@/helpers/util";
import { categoria, lancamento } from "@/interfaces";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

export const Alterar = () => {
    const router = useRouter();
    const urlRoot = "lancamentos";

    const [lancamentos, setLancamentos] = useState({} as lancamento);
    const [categorias, setCategorias] = useState({} as categoria);
    const dtHoje = ConvertToStringDate(new Date());

    const handleData = async () => {
        const id = window.location.href.split("/AddOrEdit/")[1];
        if (id != "0") {
            const res = await fetch(`/api/${urlRoot}/` + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Id: lancamentos.Id,
                    DtLancamento: lancamentos.DtLancamentoString,
                    Descricao: lancamentos.Descricao,
                    Valor: lancamentos.Valor,
                    CategoriaId: lancamentos.CategoriaId,
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
                    DtLancamento: lancamentos.DtLancamentoString,
                    Descricao: lancamentos.Descricao,
                    Valor: lancamentos.Valor,
                    CategoriaId: lancamentos.CategoriaId,
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
        setLancamentos({ ...lancamentos, [name]: value });
    };

    const getCategorias = async () => {
        const res = await fetch("/api/categorias");
        const data = await res.json();
        setCategorias(data);
    };

    useEffect(() => {
        getCategorias();
        const id = window.location.href.split("/AddOrEdit/")[1];
        if (id != "0") {
            fetch(`/api/${urlRoot}/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setLancamentos(data[0] as lancamento);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setLancamentos({ ...lancamentos, DtLancamentoString: dtHoje } as lancamento);
        }
    }, []);

    return (
        <>
            <HeaderPage title="Lançamentos" pageType="cadastrar" accessKey="v" textBt="Voltar" linkToBack={"/" + urlRoot} iconBt="fas fa-list me-2"></HeaderPage>
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-12 col-md-6 col-lg-3 mb-2">
                                    <div className="form-group">
                                        <label>Data</label>
                                        <input type="date" className="form-control" name="DtLancamento" id="DtLancamento" defaultValue={dtHoje} value={lancamentos.DtLancamentoString} onChange={(e) => setLancamentos({ ...lancamentos, DtLancamentoString: e.target.value, DtLancamento: new Date(e.target.value) })} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-3 mb-2">
                                    <div className="form-group">
                                        <label>Categoria</label>
                                        <select className="form-control" name="CategoriaId" id="CategoriaId" autoFocus value={lancamentos.CategoriaId} onChange={(e) => setLancamentos({ ...lancamentos, CategoriaId: e.target.value, Categoria: e.target.options[e.target.selectedIndex].text })}>
                                            <option value="0">Selecione</option>
                                            {Array.isArray(categorias) &&
                                                categorias.map((item) => (
                                                    <option key={item.Id} value={item.Id}>
                                                        {item.Nome}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-md-8 col-lg-4 mb-2">
                                    <div className="form-group">
                                        <label>Descrição</label>
                                        <input type="text" className="form-control" name="Descricao" id="Descricao" value={lancamentos.Descricao} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-4 col-lg-2  mb-2">
                                    <div className="form-group">
                                        <label>Valor</label>
                                        <input type="number" step={0.01} className="form-control" name="Valor" id="Valor" value={lancamentos.Valor} onChange={handleChange} />
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
