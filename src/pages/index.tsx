import { MutableRefObject, useEffect, useRef, useState } from "react";

export default function Home() {
    // usereff
    const titleTotalRef = useRef<HTMLInputElement>(null);
    const [ano, setAno] = useState(new Date().getFullYear());
    const [mes, setMes] = useState(new Date().getMonth() + 1);

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
                if (titleTotalRef.current) {
                    titleTotalRef.current.innerHTML = ConvertToBrlCurrency(0);
                    if (res[0].total) {
                        titleTotalRef.current.innerHTML = ConvertToBrlCurrency(res[0].total);
                    }
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
    }, []);

    useEffect(() => {
        getTotal();
    }, [ano, mes]);

    return (
        <>
            <div className="row border-bottom mb-1">
                <div className="col text-center pt-2">
                    <h3 className="text-danger">Dashboard</h3>
                    <h2 ref={titleTotalRef} id="totalTitle"></h2>
                </div>
            </div>

            <div className="row border-bottom mb-1 pb-2">
                <div className="col-5">
                    <div className="form-group">
                        <label htmlFor="mes">Ano</label>
                        <select name="ano" className="form-control" onChange={(e) => setAno(parseInt(e.target.value))}>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
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
        </>
    );
}
