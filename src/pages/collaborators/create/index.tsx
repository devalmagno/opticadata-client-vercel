import { useState } from "react";

import { CollaboratorForm } from "../../../components/CollaboratorForm";
import GoBack from "../../../components/GoBack";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

import styles from "./styles.module.scss";

export default function Collaborator() {
    const [sidebar, setSidebar] = useState(true);

    return (
        <div className={
            sidebar ?
                `${styles.container} ${styles.active}`
                : `${styles.container} ${styles.sidebar}`
        }>
            <Header title="Adicionar Colaborador" />
            <Sidebar
                sidebar={sidebar}
                setSidebar={setSidebar}
            />

            <GoBack 
                title="Colaboradores" 
            />

            <div className={styles.form}>
                <CollaboratorForm />
            </div>
        </div>
    );
}