import { useEffect, useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { AddButton } from "../components/AddButton";
import { CustomersTable } from "../components/CustomersTable"
import { ProvidersTable } from "../components/ProvidersTable"

import { api } from "../services/api";

import styles from "../styles/pages.module.scss";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export type Customers = {
    cus_id: string;
    cus_cpf: string;
    cus_name: string;
    cus_phone: string;
    created_at: Date;
    updated_at: Date;
}

export type CustomerAddresses = {
    cad_id: string;
    cad_cus_id: string;
    cad_city: string;
    cad_district: string;
    cad_desc: string;
}

export type Providers = {
    prov_id: string;
    prov_cnpj: string;
    prov_desc: string;
    prov_email: string;
    created_at: Date;
    updated_at: Date;
}

const Stocks = () => {
    const [customers, setCustomers] = useState<Customers[]>([]);
    const [customerAddresses, setCustomerAddresses] = useState<CustomerAddresses[]>([]);
    const [providers, setProviders] = useState<Providers[]>([]);

    const [sidebar, setSidebar] = useState(true);

    useEffect(() => {
        api.get('/customers')
            .then(res => {
                setCustomers(res.data);
            })
            .catch(err => console.log(err));

        api.get('/providers')
            .then(res => {
                setProviders(res.data);
            })
            .catch(err => console.log(err));

    }, []);

    return (
        <div className={
            sidebar ?
                `${styles.container} ${styles.active}`
                : `${styles.container} ${styles.sidebar}`
        }>
            <Header title="Clientes e Fornecedores" />
            <Sidebar 
                sidebar={sidebar}
                setSidebar={setSidebar}
            />

            <section className={styles.main}>
                <div className={styles.buttons}>
                    <AddButton
                        title="Adicionar Cliente"
                        link="/customers/create"
                    />
                    <AddButton
                        title="Adicionar Fornecedor"
                        link="/providers/create"
                    />
                </div>

                <div className={styles.tables}>
                    <CustomersTable
                        customers={customers!}
                    />

                    <ProvidersTable
                        providers={providers!}
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

export default Stocks;