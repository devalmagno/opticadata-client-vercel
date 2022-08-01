import { useEffect, useState } from "react";
import { AiFillMinusSquare, AiFillPlusSquare, AiOutlineFieldNumber } from "react-icons/ai";

import { FormButton } from "../FormButton";

import { Product } from '../../pages/orders';

import { api } from "../../services/api";

import styles from "./styles.module.scss";

export const StocksForm = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.get('/products')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));
    })

    return (
        <div className={styles.container}>
            <form action="" >
                <div className={styles.row}>
                    <h4>Estoque</h4>

                    <div className={styles.col_half}>
                        <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                            <span>Produto: </span>
                            <select name="products" id="products">
                                {products.map(pro => (
                                    <option key={pro.pro_id}value={pro.pro_id}>
                                        {pro.pro_desc}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="number"
                            name=""
                            id=""
                            placeholder="Estoque Mínimo"
                            required
                        />
                        <div className={styles.input_icon}>
                            <AiFillMinusSquare className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="number"
                            name=""
                            id=""
                            placeholder="Estoque Máximo"
                            required
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
                            placeholder="Quantidade Inicial Em Estoque"
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