import { useState } from "react";

import { CustomerForm } from "../../../components/CustomerForm";
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
            <Header title="Adicionar Cliente" />
            <Sidebar
                sidebar={sidebar}
                setSidebar={setSidebar}
            />

            <GoBack 
                title="Clientes e Fornecedores" 
            />

            <div className={styles.form}>
                <CustomerForm />
            </div>
        </div>
    );
}