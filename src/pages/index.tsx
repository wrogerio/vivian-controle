import { MutableRefObject, useEffect, useRef, useState } from "react";
import { categoria, lancamento, gastoDiario, items } from "@/interfaces";
import { ConvertNumberTwoDigits, ConvertToBrlCurrency } from "@/helpers/util";
import Link from "next/link";

export default function Home() {
    // usereff
    const titleTotalDiarioRef = useRef<HTMLInputElement>(null);
    const titleTotalMensalRef = useRef<HTMLInputElement>(null);
    const [ano, setAno] = useState(new Date().getFullYear());
    const [mes, setMes] = useState(new Date().getMonth() + 1);
    const [items, setItems] = useState([]);
    const [gastoDiario, setGastoDiario] = useState([]);
    let isImpar = false;

    const getItems = () => {
        var xBody = JSON.stringify({ ano: ano, mes: mes });
        fetch(`/api/dashboard/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: xBody,
        })
            .then((obj) => {
                return obj.json();
            })
            .then((res) => {
                setItems(res);
            });
    };

    const getGastoDiarioSum = () => {
        var xBody = JSON.stringify({ ano, mes });
        fetch(`/api/dashboard/gastoDiario`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: xBody,
        })
            .then((obj) => {
                return obj.json();
            })
            .then((res) => {
                setGastoDiario(res);
            });
    };

    const getGastoDiario = () => {
        var xBody = JSON.stringify({ ano: ano, mes: mes });
        fetch(`/api/dashboard/gastoDiario`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: xBody,
        })
            .then((obj) => {
                return obj.json();
            })
            .then((res) => {
                setGastoDiario(res);
            });
    };

    const getTotal = () => {
        var xBody = JSON.stringify({ ano: ano, mes: mes });
        fetch(`/api/dashboard/total`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: xBody,
        })
            .then((obj) => {
                return obj.json();
            })
            .then((res) => {
                if (titleTotalDiarioRef.current && titleTotalMensalRef.current) {
                    const totalDiario = res.filter((x: any) => x.Tipo == "Diario")[0].Total;
                    const totalMensal = res.filter((x: any) => x.Tipo == "Mensal")[0].Total;
                    titleTotalDiarioRef.current.innerHTML = `${ConvertToBrlCurrency(totalDiario || 0)}`;
                    titleTotalMensalRef.current.innerHTML = `${ConvertToBrlCurrency(totalMensal || 0)}`;
                }
            });
    };

    useEffect(() => {
        getTotal();
        getItems();
        getGastoDiario();
    }, [ano, mes]);

    return (
        <>
            <div className="row">
                <div className="col text-center pt-2">
                    <div className="d-flex justify-content-between bg-danger text-white px-2 py-2 mb-1">
                        <h2 className="fw-bold m-0">Diário</h2>
                        <h2 className="fw-bold m-0" ref={titleTotalDiarioRef} id="totalDiarioTitle"></h2>
                        <Link href="/lancamentos/AddOrEdit/0" className="m-0">
                            <i className="fas fa-plus-circle fa-2x text-white m-0" style={{ cursor: "pointer" }}></i>
                        </Link>
                    </div>
                    <div className="d-flex justify-content-between bg-success text-white px-2 py-2 mb-1">
                        <h2 className="fw-bold m-0">Mensal</h2>
                        <h2 className="fw-bold m-0" ref={titleTotalMensalRef} id="totalMensalTitle"></h2>
                        <Link href="/lancamentos/AddOrEdit/0" className="m-0">
                            <i className="fas fa-plus-circle fa-2x text-white m-0" style={{ cursor: "pointer" }}></i>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-5">
                    <div className="form-group">
                        <label htmlFor="mes">Ano</label>
                        <select name="ano" className="form-control" onChange={(e) => setAno(parseInt(e.target.value))}>
                            <option value="2023">2023</option>
                        </select>
                    </div>
                </div>
                <div className="col-7">
                    <div className="form-group">
                        <label htmlFor="mes">Mês</label>
                        <select name="mes" className="form-control" value={mes} onChange={(e) => setMes(parseInt(e.target.value))}>
                            <option value="1">Janeiro</option>
                            <option value="2">Fevereiro</option>
                            <option value="3">Março</option>
                            <option value="4">Abril</option>
                            <option value="5">Maio</option>
                            <option value="6">Junho</option>
                            <option value="7">Julho</option>
                            <option value="8">Agosto</option>
                            <option value="9">Setembro</option>
                            <option value="10">Outubro</option>
                            <option value="11">Novembro</option>
                            <option value="12">Dezembro</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <table className="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <th>Dia</th>
                                <th>Nome</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(gastoDiario) &&
                                gastoDiario.map((item: gastoDiario, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.Dia}</td>
                                            <td>{item.DiaNome}</td>
                                            <td style={{ width: 150 }}>
                                                <span style={{ fontSize: "1.1rem" }} className="fw-bold">
                                                    {ConvertToBrlCurrency(item.Total)}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                {Array.isArray(items) &&
                    items.map((obj: items, index: number) => {
                        isImpar = !isImpar;
                        return (
                            <div className={isImpar ? "col-6 col-md-4 col-lg-3 col-xl-2 pe-1 mb-2" : "col-6 col-md-4 col-lg-3 col-xl-2  ps-1 mb-2"} key={index}>
                                <div className="card">
                                    <div className="card-title bg-primary text-white py-2">
                                        <span className="m-0 text-center fs-6">
                                            <div className="d-flex justify-content-between px-2">
                                                {obj.Categoria}
                                                <span className="fw-bold">{ConvertNumberTwoDigits(index + 1)} º</span>
                                            </div>
                                        </span>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="text-center">{ConvertToBrlCurrency(obj.Total)}</h4>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
