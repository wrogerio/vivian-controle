import HeaderPage from "./../../components/HeaderPage";
import { useEffect, useState } from "react";
import { lancamento } from "./../../interfaces/index";
import { ConvertToMesNome, ConvertToPtBrUTC } from "@/helpers/util";
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

    const HandleSearchText = (e: any) => {
        let txt = e.split(" ");
        let rows = document.querySelectorAll("tbody tr");
        rows.forEach((row: any) => {
            let search = row.getAttribute("data-search");
            let show = true;
            txt.forEach((t: string) => {
                if (search?.indexOf(t.toLowerCase()) === -1) {
                    show = false;
                }
            });
            if (show) {
                row.style.display = "table-row";
            } else {
                row.style.display = "none";
            }
        });
    };

    const RemoveData = (id: string) => {
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

    const togglePagto = async (id: string, statusId: string) => {
        const res = await fetch("/api/lancamentos/toggleStatus/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Id: id,
                StatusId: statusId,
            }),
        });

        if (res) {
            LoadData().then((data) => {
                setLancamentos(data);
            });
        }
    };

    return (
        <>
            <HeaderPage title="Lan??ametos" pageType="index" accessKey="c" textBt="Cadastrar" linkToBack={`/${urlRoot}/AddOrEdit/0`} iconBt="fas fa-money-bill-wave me-2"></HeaderPage>
            <div
                id="divDesc"
                className="bg-primary text-white text-center py-1 d-none"
                style={{ position: "fixed", width: "99vw", top: 2, left: 2 }}
                onClick={() => {
                    $("#divDesc").addClass("d-none");
                }}
            >
                <span className="fs-1 fw-bold" id="tipoDesk"></span>
            </div>
            <input type="text" className="form-control mb-1" id="txtSearch" name="txtSearch" placeholder="Pesquisar valores" onChange={(e) => HandleSearchText(e.target.value)} />
            <table className="table table-sm table-bordered">
                <thead>
                    <tr>
                        <th style={{ width: 110 }}>Data</th>
                        <th className="d-none d-md-table-cell">Categoria</th>
                        <th className="d-none d-md-table-cell">Tipo</th>
                        <th style={{ width: 140 }}>Valor</th>
                        <th className="d-none d-lg-table-cell">Descri????o</th>
                        <th className="text-center">#</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(lancamentos) &&
                        lancamentos.map((obj: lancamento) => (
                            <tr className={obj.Status == "Pago" ? "isPago" : "isPagar"} key={obj.Id} data-search={`${ConvertToMesNome(new Date(obj.DtLancamento).getMonth() + 1).toLowerCase()}${ConvertToPtBrUTC(new Date(obj.DtLancamento)).toLocaleDateString("pt-BR")}${obj.Tipo.toLowerCase()}${obj.Descricao.toLowerCase()}${obj.Categoria.toLowerCase()}`}>
                                <td
                                    onClick={(e) => {
                                        $("#tipoDesk").text(obj.Descricao);
                                        $("#divDesc").removeClass("d-none");
                                    }}
                                >
                                    {ConvertToPtBrUTC(new Date(obj.DtLancamento)).toLocaleDateString("pt-BR")}
                                </td>
                                <td className="d-none d-md-table-cell">{obj.Categoria}</td>
                                <td className="d-none d-md-table-cell">{obj.Tipo}</td>
                                <td onDoubleClick={() => togglePagto(obj.Id, obj.StatusId.toLowerCase())}>
                                    <div className="d-flex justify-content-around px-3">
                                        <div>{obj.Tipo[0] == "D" ? <span className="badge text-bg-success">D</span> : <span className="badge text-bg-danger">M</span>}</div>
                                        <div>
                                            <span>{obj.Valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="d-none d-lg-table-cell">{obj.Descricao}</td>
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
