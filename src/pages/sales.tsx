import { useState } from "react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { AddButton } from "../components/AddButton";
import { SalesTable } from "../components/SalesTable";

import styles from "../styles/pages.module.scss";

const Sales = () => {

    const [sidebar, setSidebar] = useState(true);

    return (
        <div className={
            sidebar ?
                `${styles.container} ${styles.active}`
                : `${styles.container} ${styles.sidebar}`
        }>
            <Header title="Vendas" />

            <Sidebar
                sidebar={sidebar}
                setSidebar={setSidebar}
            />

            <section className={styles.main}>
                <AddButton
                    title="Fazer uma venda"
                    link="/sales/create"
                />

                <div className={styles.tables}>
                    <SalesTable 
                    />
                </div>
            </section>
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

export default Sales;