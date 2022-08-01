import { useState } from "react";

import { ProductsForm } from "../../../components/ProductsForm";
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
            <Header title="Adicionar Produto" />
            <Sidebar
                sidebar={sidebar}
                setSidebar={setSidebar}
            />

            <GoBack 
                title="Produto" 
            />

            <div className={styles.form}>
                <ProductsForm />
            </div>
        </div>
    );
}