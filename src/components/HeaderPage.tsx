import Link from "next/link";

const HeaderPage = (props: any) => {
    const { title, pageType, linkToBack, textBt, iconBt, accessKey } = props;
    let buttomClass: string = "";
    let buttomText: string = "";
    let titleFormat: string = "";
    let redirect: string = "";

    switch (pageType) {
        case "cadastrar":
            buttomClass = "btn btn-outline-primary";
            titleFormat = "mb-2 text-primary";
            break;
        case "index":
            buttomClass = "btn btn-outline-primary";
            titleFormat = "mb-2 text-primary";
            break;
        case "remover":
            buttomClass = "btn btn-outline-danger";
            titleFormat = "mb-2 text-danger";
            break;
        case "alterar":
            buttomClass = "btn btn-outline-warning";
            titleFormat = "mb-2 text-warning";
            break;
    }

    return (
        <div className="row mb-2">
            <div className="col">
                <div className="headerPageBg py-2 px-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className={titleFormat}>{title}</h3>
                        <Link href={linkToBack} className={buttomClass} accessKey={accessKey}>
                            <i className={iconBt}></i>
                            {textBt}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderPage;
