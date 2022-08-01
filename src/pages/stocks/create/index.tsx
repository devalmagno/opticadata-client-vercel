import { useState } from "react";

import { StocksForm } from "../../../components/StocksForm";
import GoBack from "../../../components/GoBack";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

import styles from "./styles.module.scss";

export default function CreateStocks() {
    const [sidebar, setSidebar] = useState(true);

    return (
        <div className={
            sidebar ?
                `${styles.container} ${styles.active}`
                : `${styles.container} ${styles.sidebar}`
        }>
            <Header title="Registrar Estoque" />
            <Sidebar
                sidebar={sidebar}
                setSidebar={setSidebar}
            />

            <GoBack 
                title="Estoque" 
            />

            <div className={styles.form}>
                <StocksForm />
            </div>
        </div>
    );
}