import { useState } from "react";

import { StockMovesForm } from "../../../components/StockMovesForm";
import GoBack from "../../../components/GoBack";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

import styles from "./styles.module.scss";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function CreateStockMoves() {
    const [sidebar, setSidebar] = useState(true);

    return (
        <div className={
            sidebar ?
                styles.container
                : `${styles.container} ${styles.sidebar}`
        }>
            <Header title="Registrar Movimentação de Estoque" />
            <Sidebar
                sidebar={sidebar}
                setSidebar={setSidebar}
            />

            <GoBack 
                title="Estoque" 
            />

            <div className={styles.form}>
                <StockMovesForm />
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { "opdauth.token": token } = parseCookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};