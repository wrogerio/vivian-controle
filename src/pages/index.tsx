import { MutableRefObject, useEffect, useRef, useState } from "react";
import { gastoDiario, items } from "./../interfaces/index";
import { categoria } from "@/interfaces";
import { ConvertNumberTwoDigits } from "@/helpers/util";
import { ConvertToMesNome } from "./../helpers/util";

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
                console.log(res);
                if (titleTotalDiarioRef.current && titleTotalMensalRef.current) {
                    titleTotalDiarioRef.current.innerHTML = ConvertToBrlCurrency(0);
                    titleTotalMensalRef.current.innerHTML = ConvertToBrlCurrency(0);
                    if (res[0].Total) titleTotalDiarioRef.current.innerHTML = `Diário: ${ConvertToBrlCurrency(res[0].Total)}`;
                    if (res[0].Total) titleTotalMensalRef.current.innerHTML = `Mensal: ${ConvertToBrlCurrency(res[1].Total)}`;
                    // }
                }
            });
    };

    const ConvertToBrlCurrency = (numero: number) => {
        return numero.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
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
                    <h1 className="text-danger fw-bold" ref={titleTotalDiarioRef} id="totalDiarioTitle"></h1>
                    <h1 className="text-success fw-bold" ref={titleTotalMensalRef} id="totalMensalTitle"></h1>
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
