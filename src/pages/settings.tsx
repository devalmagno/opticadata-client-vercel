import { useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { AddButton } from "../components/AddButton";
import { SettingsForm } from "../components/SettingsForm";

import styles from "../styles/pages.module.scss";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

const Settings = () => {
    const [sidebar, setSidebar] = useState(true);

    return (
        <div className={
            sidebar ?
                `${styles.container} ${styles.active}`
                : `${styles.container} ${styles.sidebar}`
        }>
            <Header title="Configurações da Ótica" />

            <Sidebar
                sidebar={sidebar}
                setSidebar={setSidebar}
            />

            <section className={styles.main}>
                <div className={styles.tables}>
                    <SettingsForm />
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

export default Settings;