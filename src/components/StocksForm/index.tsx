import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { AiFillMinusSquare, AiFillPlusSquare, AiOutlineFieldNumber } from "react-icons/ai";

import { FormButton } from "../FormButton";

import { Product } from '../../pages/orders';

import { api } from "../../services/api";

import styles from "./styles.module.scss";

export const StocksForm = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const [currentProduct, setCurrentProduct] = useState("");
    const [stoMin, setStoMin] = useState<number>();
    const [stoMax, setStoMax] = useState<number>();
    const [quantity, setQuantity] = useState<number>();

    const router = useRouter();

    useEffect(() => {
        api.get('/products')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const createStock = (e: FormEvent) => {
        e.preventDefault();

        if (currentProduct == "") return;
        if (stoMin! > stoMax!) return;

        api.post('/stocks/create', {
            sto_pro_id: currentProduct,
            sto_min: stoMin,
            sto_max: stoMax,
            sto_quantity: quantity
        }).then(res => {
            window.alert(`Estoque ${res.data.sto_id} criado com sucesso!`)

            router.push('/stocks');
        }).catch(err => console.log(err));

    }

    return (
        <div className={styles.container}>
            <form onSubmit={e => createStock(e)} >
                <div className={styles.row}>
                    <h4>Estoque</h4>

                    <div className={styles.col_half}>
                        <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                            <select
                                name="products"
                                id="products"
                                value={currentProduct}
                                onChange={e => setCurrentProduct(e.target.value)}
                            >
                                <option value="">Selecione um Produto</option>
                                {products.map(pro => (
                                    <option key={pro.pro_id} value={pro.pro_id}>
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
                            value={stoMin}
                            onChange={e => setStoMin(Number(e.target.value))}
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
                            value={stoMax}
                            onChange={e => setStoMax(Number(e.target.value))}
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
                            value={quantity}
                            onChange={e => setQuantity(Number(e.target.value))}
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