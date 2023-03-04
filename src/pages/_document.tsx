import { Html, Main, NextScript, Head } from "next/document";

export default function Document() {
    return (
        <Html lang="pt-BR">
            <Head>
                <meta charSet="utf-8" />
                <meta lang="pt-BR" />
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link href="https://cdn.staticaly.com/gh/hung1001/font-awesome-pro/4cac1a6/css/all.css" rel="stylesheet" type="text/css" />
            </Head>
            <body>
                <Main />
                <NextScript />
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" defer></script>
            </body>
        </Html>
    );
}
