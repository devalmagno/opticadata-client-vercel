import { useState } from "react";

import { SaleForm } from "../../../components/SaleForm";
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
                `${styles.container} ${styles.active}`
                : `${styles.container} ${styles.sidebar}`
        }>
            <Header title="Fazer uma venda" />
            <Sidebar
                sidebar={sidebar}
                setSidebar={setSidebar}
            />

            <GoBack
                title="Vendas"
            />

            <div className={styles.form}>
                <SaleForm />
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