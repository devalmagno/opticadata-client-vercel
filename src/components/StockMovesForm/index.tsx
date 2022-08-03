import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AiFillMinusSquare, AiOutlineFieldNumber } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";

import { FormButton } from "../FormButton";

import { Product } from '../../pages/orders';
import { Stocks } from '../../pages/stocks';

import { api } from "../../services/api";

import styles from "./styles.module.scss";

export const StockMovesForm = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [stocks, setStocks] = useState<Stocks[]>([]);

    const [stockId, setStockId] = useState("");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState<number>();
    const [quantity, setQuantity] = useState<number>();

    const router = useRouter();

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

    const createStockMoves = (e: FormEvent) => {
        e.preventDefault();

        let quantityInStock: number;

        if (stockId == "") return;

        if (quantityInStock! < quantity!) return;

        api.post('/stockmoves/create', {
            smo_pro_id: stockId,
            smo_prov_id: null,
            smo_type: type,
            smo_desc: desc,
            smo_unit_price: price,
            smo_quantity: quantity
        }).then(res => {
            window.alert(`Movimentação de Estoque criado com sucesso!`)

            router.push('/stocks');
        }).catch(err => console.log(err));

    }

    return (
        <div className={styles.container}>
            <form onSubmit={e => createStockMoves(e)} >
                <div className={styles.row}>
                    <h4>Movimentação de Estoque</h4>

                    <div className={styles.col_half}>
                        <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                            <span>Estoque do Produto: </span>
                            <select
                                name="stock"
                                id="stock"
                                value={stockId}
                                onChange={e => setStockId(e.target.value)}
                            >
                                <option value="">Selecione um Estoque</option>
                                {stocks.map(sto => (
                                    <option key={sto.sto_id} value={sto.sto_pro_id}>
                                        {`${sto.product?.pro_desc} Qtde. ${sto.sto_quantity}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.col_half}>
                        <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                            <span>Tipo de Movimentação </span>
                            <select
                                name="type"
                                value={type}
                                onChange={e => setType(e.target.value)}
                                id="type"
                            >
                                <option value="E">
                                    Entrada
                                </option>
                                <option value="S">
                                    Saída
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            name=""
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
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
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                            id=""
                            prefix="R$"
                            placeholder="Preço p/ unidade"
                        />
                        <div className={styles.input_icon}>
                            <MdAttachMoney className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="number"
                            name=""
                            value={quantity}
                            onChange={e => setQuantity(Number(e.target.value))}
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

