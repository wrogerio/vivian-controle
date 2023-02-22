import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import "reflect-metadata"

import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Navbar />
            <div className="container">
                <Component {...pageProps} />
            </div>
        </>
    );
}
