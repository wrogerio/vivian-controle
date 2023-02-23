export default function Home() {
    const dtNow = new Date();

    const getNow = () => {
        const dtNow = new Date();

        // return yyyy-MM
        return dtNow.toISOString().substr(0, 7);
    };

    return (
        <>
            <div className="row border-bottom mb-1">
                <div className="col text-center pt-2">
                    <h3 className="text-danger">Dashboard</h3>
                    <h2>R$ 2.450,36</h2>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="p-2 text-center ">
                        <div className="form-group">
                            <label htmlFor="mes">Selecione Mës/Ano</label>
                            <input type="month" name="mes" className="form-control" style={{ textAlign: "center" }} defaultValue={getNow()} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
