import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { MdDeliveryDining } from "react-icons/md";

import { Product } from "../../pages/orders";
import { Stocks } from "../../pages/stocks";

import { api } from "../../services/api";
import { AddButton } from "../AddButton";

import styles from "./styles.module.scss";

export const SaleForm = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [stocks, setStocks] = useState<Stocks[]>([]);

    useEffect(() => {
        api.get('/products')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));

        api.get('/stocks')
            .then(res => {
                setStocks(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    products.forEach(pro => {
        stocks.forEach(sto => {
            if (sto.sto_pro_id == pro.pro_id) sto.product = pro;

        });
    });


    return (
        <div className={styles.container}>
            <form action="">
                    <h4>Ficha de Venda</h4>

                    <div className={styles.col_half}>
                        <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                            <span>Produto: </span>
                            <select name="stock" id="stock">
                                {stocks.map(sto => (
                                    <option key={sto.sto_id} value={sto.sto_pro_id}>
                                        {sto.product?.pro_desc} {' - '}
                                        Qtde. {sto.sto_quantity} {' - '}
                                        Preço R$ {' '} {sto.product?.pro_unit_price}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Pesquisar Produto"
                        />
                        <div className={styles.input_icon}>
                            <BiSearchAlt className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>

                    <div className={styles.col_half}>
                        <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                            <span>Cliente: </span>
                            <select name="customer" id="customer">
                           </select>
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Pesquisar Cliente CPF"
                        />
                        <div className={styles.input_icon}>
                            <BiSearchAlt className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>

                    <h4>Entrega</h4>

                    <div className={styles.col_half}>
                        <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                            <span>Endereço: </span>
                            <select name="customer_address" id="customer_address">
                           </select>
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Pesquisar Endereço"
                        />
                        <div className={styles.input_icon}>
                            <BiSearchAlt className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="date"
                            name=""
                            id=""
                        />
                        <div className={styles.input_icon}>
                            <MdDeliveryDining className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>

                    <h4>Receita Médica</h4>
                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            id="doctor_prescription"
                            type="checkbox"
                            name=""
                        />
                        <label htmlFor="doctor_prescription">Sim</label>
                    </div>
            </form>
        </div>
    );
}