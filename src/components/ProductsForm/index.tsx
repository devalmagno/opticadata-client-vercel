import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect, useState } from "react";
import { MdCategory, MdAttachMoney, MdOutlineProductionQuantityLimits } from "react-icons/md";

import { FormButton } from "../FormButton";

import { Product } from '../../pages/orders';

import { api } from "../../services/api";

import styles from "./styles.module.scss";
import { AuthContext } from "../../contexts/AuthContext";

export const ProductsForm = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState<Product[]>([]);
    const [desc, setDesc] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState<number>();

    const router = useRouter();

    useEffect(() => {
        api.get('/products')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const createProduct = (e: FormEvent) => {
        e.preventDefault();

        api.post('/products/register', {
            pro_desc: desc,
            pro_type: type,
            pro_unit_price: price
        })
            .then(res => {
                window.alert(`Produto ${res.data.pro_desc} criado com sucesso!`)
            }).catch(err => {
                console.log(err);
                window.alert("Houve um erro.\n" + err);
                return;
            });

        api.post('/userlogs/create', {
            ulog_user_id: user?.user_id,
            ulog_user_cpf: user?.user_cpf,
            ulog_action: "Adicionou Produto"
        }).then(res => {
            console.log("Log created.")
        }).catch(err => {
            console.log(err);
        });

        router.push('/products');
    }

    return (
        <div className={styles.container}>
            <form onSubmit={e => createProduct(e)} >
                <div className={styles.row}>
                    <h4>Produto</h4>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Descrição do Produto"
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
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
                            value={type}
                            onChange={e => setType(e.target.value)}
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
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
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