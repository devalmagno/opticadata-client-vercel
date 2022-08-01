import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";

import Loading from "../Loading";
import ProductOrder from "../ProductOrder";
import WorkerOrder from "../WorkerOrder";
import CustomerOrder from "../CustomerOrder";

import { useFetch } from "../../hooks/useFetch";
import { api } from "../../services/api";

import styles from "./styles.module.scss";
import PaymentOrder from "../PaymentOrder";

import { Product, Customer, SaleProduct, Payment } from "../../pages/orders";

export type Worker = {
    id: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    occupation: {
        id: string;
        name: string;
    };
    sales: number;
};

type Props = {
    showSideBar: boolean;
    setShowSideBar: Dispatch<SetStateAction<boolean>>;
};

const OrderSidebar = ({
    setShowSideBar,
    showSideBar
}: Props) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);

    const [saleProducts, setSaleProducts] = useState<SaleProduct[]>([]);
    const [orderCustomer, setOrderCustomer] = useState<Customer>();
    const [orderPayment, setOrderPayment] = useState<Payment[]>([]);

    useEffect(() => {
        api.get('/products')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));

        api.get('/customers')
            .then(res => {
                setCustomers(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    let price = 0;

    const handleCreateNewOrder = () => {
        // const products_id = orderProducts.map((prod) => prod.id);
        // const workers_id = orderWorkers.map((worker) => worker.id);
        // const customer_id =
        //     orderCustomers[0] != null ? orderCustomers[0].id : null;
        // const payment_date = formatedDate(orderPayment.payment_date);
        // const quantity = orderProducts.map((prod) => prod.quantity);

        // api.post("/orders", {
        //     products_id,
        //     workers_id,
        //     customer_id,
        //     payment_date,
        //     price,
        //     quantity,
        //     type_of_payment: orderPayment.type_of_payment,
        // })
        //     .then(() => {
        //         alert("Registro de ordem feito com sucesso");
        //     })
        //     .catch((err) => {
        //         console.log(err.message);
        //     });

        // setOrderProducts([]);
        // setOrderWorkers([]);
        // setOrderCustomers([]);
        // setOrderPayment({
        //     type_of_payment: "Dinheiro",
        //     payment_date: [],
        // });
        // setShowSidebar(!showSidebar);
    };

    return (
        <div
            className={
                styles.sidebar
            }
        >
            <header>
                <h3>Registrar venda</h3>

                <div
                    onClick={() => {
                        setShowSideBar(!showSideBar);
                    }}
                    className={styles.icon}
                >
                    <MdAddShoppingCart />
                </div>
            </header>

            <div className={styles.container}>
                {/* <ProductOrder
                    products={products}
                    orderProducts={saleProducts}
                    setOrderProducts={setSaleProducts}
                /> */}

                <CustomerOrder
                    customers={customers}
                    orderCustomers={customers}
                    setOrderCustomers={setCustomers}
                />

                {/* <PaymentOrder
                    orderPayment={orderPayment}
                    setOrderPayment={setOrderPayment}
                    customer={customers}
                /> */}

                <div style={price == 0 ? { display: "none" } : { display: "block" }}>
                    <strong>Preço total: </strong>
                    <span>R$ {price.toFixed(2)}</span>
                </div>

                {/* <div style={perInstallment == 0? {display: "none"} : {display: "block"}}>
                            <strong>Preço por parcela: </strong>
                            <span>{orderPayment.payment_date.length}x de R$ {perInstallment.toFixed(2)}</span>
                        </div>
 */}
                <div
                    className={
                        // orderProducts.length != 0 &&
                        // orderWorkers.length != 0 &&
                        // orderPayment.payment_date.length != 0
                        // ? styles.button
                        `${styles.button} ${styles.disabled}`
                    }
                >
                    <button
                        disabled={true}
                        onClick={handleCreateNewOrder}
                    >
                        Confirmar venda
                    </button>
                </div>
            </div>
        </div>
    );
};

const formatedDate = (dateList: Date[]) => {
    const currentDate = dateList.map((date) => {
        return {
            date: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
        };
    });

    const payment_date = currentDate.map((date) => {
        const formatedDate = new Date(
            date.year,
            date.month,
            date.date + 1
        ).toISOString();

        return formatedDate;
    });

    return payment_date;
};

export default OrderSidebar;
