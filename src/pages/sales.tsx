import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { AddButton } from "../components/AddButton";
import { SalesTable } from "../components/SalesTable";

import styles from "../styles/pages.module.scss";
import { api } from "../services/api";

export type Sale = {
    sal_id: string;
    sal_cus_id: string;
    sal_cad_id: string;
    sal_dpr_id: string;
    sal_col_id: string;
    sal_sold_at: Date;
    sal_delivery_day: Date;
    sal_status_pay: boolean;
    sal_status: boolean;
    created_at: Date;
    updated_at: Date;

    payments?: Payment[];
    customer?: Customer;
    saleProducts?: SaleProduct[];
    collaborator?: Collaborator;
    doctorPrescription?: DoctorPrescription;
    fullPrice?: number;
}

export type Payment = {
    pay_id: string;
    pay_sal_id: string;
    pay_type_of_payment: string;
    pay_desc: string;
    pay_value: number;
    pay_status: boolean;
    pay_date: Date;
    pay_pending_date: Date;
    created_at: Date;
    updated_at: Date;
}

export type Customer = {
    cus_id?: string;
    cus_name: string;
    cus_cpf: string;
    cus_phone: string;
};

export type SaleProduct = {
    spr_id: string;
    spr_sal_id: string;
    spr_pro_id: string;
    spr_quantity: number;

    product?: Product;
};

export type Product = {
    pro_id?: string;
    pro_desc: string;
    pro_type: string;
    pro_unit_price: number;
    pro_status?: boolean;
}

export type Collaborator = {
    col_id: string;
    col_name: string;
    col_cpf: string;
    col_function: string;
};

export type DoctorPrescription = {
    dpr_id: string;
    dpr_dnp_od: number;
    dpr_dnp_oe: number;
    dpr_height_segment: number;
    dpr_dp: number;
    dpr_crm: string;
    dpr_receipt_date: Date;

    eyeInfo?: EyeInfo[];
}

export type EyeInfo = {
    ein_id: string;
    ein_dpr_id: string;
    ein_type: string;
    ein_esf: number;
    ein_cil: number;
    ein_eixo: number;
}

const Sales = () => {
    const [sales, setSales] = useState<Sale[]>([]);

    const [sidebar, setSidebar] = useState(true);

    useEffect(() => {
        api.get("/sales")
            .then(res => {
                setSales(res.data);
            }).catch(err => console.log(err));
    }, [])

    return (
        <div className={
            sidebar ?
                `${styles.container} ${styles.active}`
                : `${styles.container} ${styles.sidebar}`
        }>
            <Header title="Vendas" />

            <Sidebar
                sidebar={sidebar}
                setSidebar={setSidebar}
            />

            <section className={styles.main}>
                <AddButton
                    title="Fazer uma venda"
                    link="/sales/create"
                />

                <div className={styles.tables}>
                    <SalesTable 
                        sales={sales!}
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

export default Sales;