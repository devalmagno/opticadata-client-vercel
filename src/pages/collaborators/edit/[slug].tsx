import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { CollaboratorTable } from "../../../components/CollaboratorTable";
import { EditCollaboratorForm } from "../../../components/EditCollaboratorForm";
import GoBack from "../../../components/GoBack";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { api } from "../../../services/api";

import { Collaborator } from "../../users";

import styles from "./styles.module.scss";

export default function EditCollaborator() {
    const router = useRouter();
    const [sidebar, setSidebar] = useState(true);
    const [collaborator, setCollaborator] = useState<Collaborator | null>(null);

    const { slug } = router.query;

    useEffect(() => {
        if (slug) {
            api.get(`/collaborators/${slug}`)
                .then(res => {
                    setCollaborator(res.data);
                }).catch(err => console.log(err));
        }
    }, []);

    return (
        <div className={
            sidebar ?
                `${styles.container} ${styles.active}`
                : `${styles.container} ${styles.sidebar}`
        }>
            <Header title={`Editar Colaborador ${collaborator?.col_name}`} />
            <Sidebar
                sidebar={sidebar}
                setSidebar={setSidebar}
            />

            <GoBack
                title="Usuários"
            />

            <div className={styles.tables}>
                {collaborator ?
                    (<CollaboratorTable
                        collaborators={[collaborator]}
                        hide={true}
                    />) : ''
                }
            </div>

            <div className={styles.form}>
                <EditCollaboratorForm />
            </div>
        </div>
    );
}