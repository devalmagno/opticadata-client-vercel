import { useEffect, useState } from "react";
import { AiFillMinusSquare, AiFillPlusSquare, AiOutlineFieldNumber } from "react-icons/ai";

import { FormButton } from "../FormButton";

import { Product } from '../../pages/orders';
import { Stocks } from '../../pages/stocks';

import { api } from "../../services/api";

import styles from "./styles.module.scss";

export const StockMovesForm = () => {
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
    });

    products.forEach(pro => {
        stocks.forEach(sto => {
            if (sto.sto_pro_id == pro.pro_id) sto.product = pro;

        });
    });

    return (
        <div className={styles.container}>
            <form action="" >
                <div className={styles.row}>
                    <h4>Movimentação de Estoque</h4>

                    <div className={styles.col_half}>
                        <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                            <span>Estoque do Produto: </span>
                            <select name="stock" id="stock">
                                {stocks.map(sto => (
                                    <option key={sto.sto_id} value={sto.sto_pro_id}>
                                        {sto.product?.pro_desc}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.col_half}>
                        <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                            <span>Tipo de Movimentação </span>
                            <select name="type" id="type">
                                <option  value="E">
                                    Entrada
                                </option>
                                <option  value="S">
                                    Saída
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Descrição da Movimentação"
                            required
                        />
                        <div className={styles.input_icon}>
                            <AiFillMinusSquare className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="number"
                            step="0.01"
                            name=""
                            id=""
                            prefix="R$"
                            placeholder="Preço p/ unidade"
                        />
                        <div className={styles.input_icon}>
                            <AiFillPlusSquare className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="number"
                            name=""
                            id=""
                            placeholder="Quantidade Movimentada"
                            required
                        />
                        <div className={styles.input_icon}>
                            <AiOutlineFieldNumber className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <h4></h4>
                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <FormButton
                            title="Registrar"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

