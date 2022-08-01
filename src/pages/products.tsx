import { useEffect, useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { AddButton } from "../components/AddButton";
import { ProductTable } from "../components/ProductTable";

import { Product } from "../pages/orders";

import { api } from "../services/api";

import styles from "../styles/pages.module.scss";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const [sidebar, setSidebar] = useState(true);

    useEffect(() => {
        api.get('/products')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={
            sidebar ?
                `${styles.container} ${styles.active}`
                : `${styles.container} ${styles.sidebar}`
        }>
            <Header title="Mercadorias e Produtos"/>

            <Sidebar 
                sidebar={sidebar}
                setSidebar={setSidebar}
            />

            <section className={styles.main}>
                <AddButton 
                    title="Adicionar Produto"
                    link="/products/create"
                />

                <div className={styles.tables}>
                    <ProductTable products={products}/>
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

export default Products;