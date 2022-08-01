import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import { BiInfoCircle } from "react-icons/bi";

import { useFetch } from "../hooks/useFetch";

import Header from "../components/Header";
import OrderModal from "../components/OrderModal";
import Loading from "../components/Loading";

import styles from "../styles/orders.module.scss";


export type Order = {
    id: string;
    payment_id: string;
    customer_id: string;
    created_at: Date;
    updated_at: Date;
};

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

export default function Orders() {
    const [showModal, setShowModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState<Sale>();
    const [currentSale, setCurrentSale] = useState<Sale>();

    const { data: sales } = useFetch<Sale[]>("/sales");
    const { data: payments } = useFetch<Payment[]>("/payments/");
    const { data: customers } = useFetch<Customer[]>("/customers/");
    const { data: products } = useFetch<Product[]>("/products/");
    const { data: doctorPrescription } = useFetch<DoctorPrescription[]>("/doctorprescription/");
    const { data: saleProducts } = useFetch<SaleProduct[]>("/saleproducts/");
    const { data: eyeInfos } = useFetch<EyeInfo[]>("/eyeinfo/");
    if (!sales || 
        !payments ||
        !saleProducts ||
        !doctorPrescription ||
        !products ||
        !customers ||
        !eyeInfos
    ) return <Loading />;

    if (!showModal) document.body.style.overflow = 'unset';

    sales.forEach((sale) => {
        sale.fullPrice = 0;

        payments.forEach(pay => {
            if (sale.sal_id == pay.pay_sal_id) {
                sale.payments?.push(pay);
                sale.fullPrice! += pay.pay_value;
            }
        });

        saleProducts.forEach(spr => {
            products.forEach(pro => {
                if (pro.pro_id == spr.spr_pro_id) spr.product = pro;
            });

            if (spr.spr_sal_id == sale.sal_id) sale.saleProducts?.push(spr);
        });

        doctorPrescription.forEach(dpr => {
            eyeInfos.forEach(ein => {
                if (ein.ein_dpr_id == dpr.dpr_id) dpr.eyeInfo?.push(ein);
            })

            if (dpr.dpr_id == sale.sal_dpr_id) sale.doctorPrescription = dpr;
        });

        customers.forEach(cus => {
            if (cus.cus_id == sale.sal_cus_id) sale.customer = cus;
        })
    });

    function handleModal(info: Sale) {
        setCurrentOrder(info);
        setShowModal(!showModal);
    }

    return (
        <div className={styles.container}>
            <Header title="Vendas" />

            <table>
                <thead>
                    <tr>
                        <th>ID da Venda</th>
                        <th>Preço</th>
                        <th>Pagamento</th>
                        <th>Status</th>
                        <th>Cliente</th>
                        <th>Sobre</th>
                        <th>Data da Venda</th>
                        <th>Data para Entrega</th>
                        <th>Ultima Atualização</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.slice(0).reverse().map((info) => {
                        return (
                            <tr key={info.sal_id}>
                                <td>R$ {info.fullPrice!.toFixed(2)}</td>
                                <td
                                    className={
                                        info.sal_status_pay
                                            ? styles.paid
                                            : styles.pending
                                    }
                                >
                                    {info.sal_status_pay
                                        ? "Pago"
                                        : "Pendente"}
                                </td>
                                <td>
                                    {info.sal_status
                                        ? "Ativa"
                                        : "Desativada"
                                    }
                                </td>
                                <td>
                                    {info.customer!.cus_name}
                                </td>
                                <td>{
                                    `${info.sal_sold_at.getDate()}/${info.sal_sold_at.getMonth()}/${info.sal_sold_at.getFullYear()}`
                                }</td>
                                <td>{
                                    `${info.sal_delivery_day.getDate()}/${info.sal_delivery_day.getMonth()}/${info.sal_delivery_day.getFullYear()}`
                                }</td>
                                <td>{
                                    `${info.updated_at.getDate()}/${info.updated_at.getMonth()}/${info.updated_at.getFullYear()}`
                                }</td>
                                <td
                                    onClick={() => { handleModal(info) }}
                                >
                                    <BiInfoCircle className={styles.icon} />
                                    <div className={styles.tooltip}>
                                        <span>Informações e Remoção</span>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {showModal ? <OrderModal 
                showModal={showModal} 
                setShowModal={setShowModal}
                currentOrder={currentOrder!} 
                ordersInfo={sales}
            /> : ''}
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
