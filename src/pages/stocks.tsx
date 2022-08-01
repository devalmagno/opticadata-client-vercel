import { useEffect, useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { AddButton } from "../components/AddButton";
import { StockTable } from "../components/StockTable";
import { StockMovesTable } from "../components/StockMovesTable";

import { Product } from "../pages/orders";

import { api } from "../services/api";

import styles from "../styles/pages.module.scss";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export type Stocks = {
    sto_id: string;
    sto_pro_id: string;
    sto_quantity: number;
    sto_min: number;
    sto_max: number;
    created_at?: Date;
    updated_at?: Date;
    product?: Product;
}

export type StockMoves = {
    smo_id: string;
    smo_pro_id: string;
    smo_sto_id: string;
    smo_prov_id: string;
    smo_type: string;
    smo_desc: string;
    smo_quantity: number;
    smo_unit_price: number;
    created_at: Date;
    updated_at?: Date;
    product?: Product;
}

const Stocks = () => {
    const [stocks, setStocks] = useState<Stocks[]>([]);
    const [stockMoves, setStockMoves] = useState<StockMoves[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    const [sidebar, setSidebar] = useState(true);

    useEffect(() => {
        api.get('/stocks')
            .then(res => {
                setStocks(res.data);
            })
            .catch(err => console.log(err));

        api.get('/stockmoves')
            .then(res => {
                setStockMoves(res.data)
            })
            .catch(err => console.log(err));


        api.get('/products')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));

    }, []);

    products.forEach(pro => {
        stocks.forEach(sto => {
            if (sto.sto_pro_id == pro.pro_id) sto.product = pro;

        });

        stockMoves.forEach(smo => {
            if (smo.smo_pro_id == pro.pro_id) smo.product = pro;
        })
    });

    return (
        <div className={
            sidebar ?
                styles.container
                : `${styles.container} ${styles.sidebar}`
        }>
            <Header title="Estoque" />
            <Sidebar 
                sidebar={sidebar}
                setSidebar={setSidebar}
            />

            <section className={styles.main}>
                <div className={styles.buttons}>
                    <AddButton
                        title="Registrar Estoque"
                        link="/stocks/create"
                    />
                    <AddButton
                        title="Registrar Movimentação de Estoque"
                        link="/stockmoves/create"
                    />
                </div>

                <div className={styles.tables}>
                    <StockTable
                        stocks={stocks}
                    />

                    <StockMovesTable
                        stockMoves={stockMoves}
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