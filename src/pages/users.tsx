import { useEffect, useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { AddButton } from "../components/AddButton";
import { CollaboratorTable } from "../components/CollaboratorTable";

import styles from "../styles/pages.module.scss";
import { api } from "../services/api";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

type User = {
    user_col_id: string;
}

export type Collaborator = {
    col_id: string;
    col_name: string;
    col_cpf: string;
    col_function: string;
    isUser?: boolean;
    created_at: Date;
    updated_at: Date;
}

const Users = () => {
    const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const [sidebar, setSidebar] = useState(true);

    useEffect(() => {
        api.get('/collaborators')
            .then(res => {
                setCollaborators(res.data);
            }).catch(err => console.log(err));

        api.get('/users')
            .then(res => {
                setUsers(res.data);
            }).catch(err => console.log(err));
    }, []);

    collaborators.forEach(col => {
        users.forEach(user => {
            if (col.col_id == user.user_col_id) col.isUser = true;
        });
    })

    return (
        <div className={
            sidebar ?
                styles.container
                : `${styles.container} ${styles.sidebar}`
        }>
            <Header title="Usuários" />
            <Sidebar 
                sidebar={sidebar}
                setSidebar={setSidebar}
            />

            <AddButton
                title="Adicionar Colaborador"
            />

            <div className={styles.tables}>
                <CollaboratorTable
                    collaborators={collaborators}
                />
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

export default Users;
