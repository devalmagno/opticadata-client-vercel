import { useEffect, useState } from "react";
import { AiFillMinusSquare, AiFillPlusSquare, AiOutlineFieldNumber } from "react-icons/ai";
import { MdCategory, MdAttachMoney, MdOutlineProductionQuantityLimits} from "react-icons/md";

import { FormButton } from "../FormButton";

import { Product } from '../../pages/orders';

import { api } from "../../services/api";

import styles from "./styles.module.scss";

export const ProductsForm = () => {
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
                    <h4>Produto</h4>
                    
                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Descrição do Produto"
                            required
                        />
                        <div className={styles.input_icon}>
                            <MdOutlineProductionQuantityLimits className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Categória"
                            required
                        />
                        <div className={styles.input_icon}>
                            <MdCategory className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="number"
                            step="0.01"
                            prefix="R$"
                            name=""
                            id=""
                            placeholder="Preço p/ unidade"
                            required
                        />
                        <div className={styles.input_icon}>
                            <MdAttachMoney className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <h4></h4>
                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <FormButton
                            title="Adicionar"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}