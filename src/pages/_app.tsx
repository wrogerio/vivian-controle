import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Vivian Controle</title>
            </Head>
            <Navbar />
            <div className="container">
                <Component {...pageProps} />
            </div>
        </>
    );
}
