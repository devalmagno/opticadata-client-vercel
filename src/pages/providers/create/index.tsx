import { useState } from "react";

import { ProviderForm } from "../../../components/ProviderForm";
import GoBack from "../../../components/GoBack";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

import styles from "./styles.module.scss";

export default function CreateCustomer() {
    const [sidebar, setSidebar] = useState(true);

    return (
        <div className={
            sidebar ?
                `${styles.container} ${styles.active}`
                : `${styles.container} ${styles.sidebar}`
        }>
            <Header title="Adicionar Fornecedor" />
            <Sidebar
                sidebar={sidebar}
                setSidebar={setSidebar}
            />

            <GoBack 
                title="Clientes e Fornecedores" 
            />

            <div className={styles.form}>
                <ProviderForm />
            </div>
        </div>
    );
}