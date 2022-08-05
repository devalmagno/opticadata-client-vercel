import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { RemoveButton } from "../../../components/RemoveButton";
import { CollaboratorTable } from "../../../components/CollaboratorTable";
import { CollaboratorLogsTable } from "../../../components/CollaboratorLogsTable";
import { EditCollaboratorForm } from "../../../components/EditCollaboratorForm";
import GoBack from "../../../components/GoBack";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { api } from "../../../services/api";

import { Collaborator } from "../../users";

import styles from "./styles.module.scss";
import { AuthContext } from "../../../contexts/AuthContext";

type User = {
    user_id: string;
    user_col_id: string;
    user_cpf: string;
    user_is_admin: string;
}

type CollaboratorLogs = {
    clog_id: string;
    clog_col_id: string;
    clog_old_col_function: string;
    created_at: Date;
}

export default function EditCollaborator() {
    const { user } = useContext(AuthContext);

    const router = useRouter();
    const [sidebar, setSidebar] = useState(true);
    const [collaborator, setCollaborator] = useState<Collaborator | null>(null);
    const [collaboratorLogs, setCollaboratorLogs] = useState<CollaboratorLogs[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    let modifyCollaborator: Collaborator;

    const { slug } = router.query;

    useEffect(() => {
        if (slug) {
            api.get(`/collaborators/${slug}`)
                .then(res => {
                    setCollaborator(res.data);
                }).catch(err => console.log(err));

            api.get(`/users/`)
                .then(res => {
                    setUsers(res.data);
                }).catch(err => console.log(err));

            api.get(`/collaborator/logs/${slug}`)
                .then(res => {
                    setCollaboratorLogs(res.data);
                }).catch(err => console.log(err));
        }
    }, []);

    users.forEach(user => {
        if (user.user_col_id == collaborator?.col_id) collaborator.isUser = true;
    });

    const handlerRemoveCollaborator = () => {
        const isConfirmed = window.confirm(`Tem certeza que deseja remover o colaborador ${collaborator?.col_name}?`)

        if (!isConfirmed) return;

        api.delete(`/collaborators/${slug}`)
            .then(res => {
                window.alert(`Colaborador ${res.data.col_name} removido com sucesso`);
            }).catch(err => console.log(err));

        api.post('/userlogs/create', {
            ulog_user_id: user?.user_id,
            ulog_user_cpf: user?.user_cpf,
            ulog_action: "Removeu Colaborador"
        }).then(res => {
            console.log("Log created.")
        }).catch(err => {
            console.log(err);
        });

        router.push('/users');
    }

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
                    (
                        <>
                            <CollaboratorTable
                                collaborators={[collaborator]}
                                hide={true}
                            />

                        </>
                    ) : ''
                }

                {collaboratorLogs ?
                    (
                        <CollaboratorLogsTable
                            collaboratorLogs={collaboratorLogs}
                            hide={true}
                        />

                    ) : ''
                }
            </div>

            <div className={styles.form}>
                {collaborator ?
                    <EditCollaboratorForm
                        collaborator={collaborator}
                    /> : ''
                }
            </div>

            <RemoveButton
                title="Colaborador"
                handlerRemove={handlerRemoveCollaborator}
            />

        </div>
    );
}