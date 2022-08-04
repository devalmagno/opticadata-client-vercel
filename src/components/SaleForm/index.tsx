import { useEffect, useState } from "react";
import { AiOutlineFieldNumber, AiFillEye } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { HiIdentification } from "react-icons/hi";
import { MdAttachMoney, MdDeliveryDining } from "react-icons/md";

import { Product } from "../../pages/orders";
import { Stocks } from "../../pages/stocks";

import { api } from "../../services/api";
import { AddButton } from "../AddButton";
import { EyeInfoForm } from "../EyeInfoForm";
import { FormButton } from "../FormButton";

import styles from "./styles.module.scss";

export const SaleForm = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [stocks, setStocks] = useState<Stocks[]>([]);

    const [currentProduct, setCurrentProduct] = useState("");
    const [currentCustomer, setCurrentCustomer] = useState("");;

    const [needDoctorPrescription, setNeedDoctorPrescription] = useState(false);
    const [rightEye, setRightEye] = useState(false);
    const [leftEye, setLeftEye] = useState(false);

    const [signal, setSignal] = useState(false);

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
                <h4>Produto</h4>

                <div className={styles.col_half}>
                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <select name="stock" id="stock">
                            <option value="">Selecione um produto</option>
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

                <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                    <input
                        type="number"
                        name=""
                        id=""
                        placeholder="Quantidade"
                        required
                    />
                    <div className={styles.input_icon}>
                        <AiOutlineFieldNumber className={`${styles.fa} ${styles.fa_user}`} />
                    </div>
                </div>


                <h4>Cliente</h4>
                <div className={styles.col_half}>
                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <select name="customer" id="customer">
                            <option value="">Selecione um cliente</option>
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

                {currentCustomer != ""
                    ? (
                        <div className={styles.row}>
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
                        </div>
                    ) : ''
                }

                <h4>Receita Médica</h4>
                <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                    <input
                        id="doctor_prescription"
                        type="checkbox"
                        onClick={() => setNeedDoctorPrescription(!needDoctorPrescription)}
                        name=""
                    />
                    <label htmlFor="doctor_prescription">Sim</label>
                </div>

                {needDoctorPrescription
                    ? (
                        <div className={styles.row}>
                            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                                <input
                                    id="righteye"
                                    type="checkbox"
                                    value={rightEye ? "on" : "off"}
                                    onClick={() => setRightEye(!rightEye)}
                                    name=""
                                />
                                <label htmlFor="righteye">Olho Direito</label>
                            </div>

                            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                                <input
                                    id="lefteye"
                                    type="checkbox"
                                    value={leftEye ? "on" : "off"}
                                    onClick={() => setLeftEye(!leftEye)}
                                    name=""
                                />
                                <label htmlFor="lefteye">Olho Esquerdo</label>
                            </div>

                            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="DNP Olho Direito"
                                    required
                                />
                                <div className={styles.input_icon}>
                                    <AiFillEye className={`${styles.fa} ${styles.fa_user}`} />
                                </div>

                            </div>

                            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="DNP Olho Esquerdo"
                                    required
                                />
                                <div className={styles.input_icon}>
                                    <AiFillEye className={`${styles.fa} ${styles.fa_user}`} />
                                </div>

                            </div>

                            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Altura de Segmento"
                                    required
                                />
                                <div className={styles.input_icon}>
                                    <AiFillEye className={`${styles.fa} ${styles.fa_user}`} />
                                </div>
                            </div>

                            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="dp"
                                    required
                                />
                                <div className={styles.input_icon}>
                                    <AiFillEye className={`${styles.fa} ${styles.fa_user}`} />
                                </div>
                            </div>

                            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="CRM do Médico Responsável"
                                    required
                                />
                                <div className={styles.input_icon}>
                                    <HiIdentification className={`${styles.fa} ${styles.fa_user}`} />
                                </div>
                            </div>

                            {rightEye
                                ? <EyeInfoForm
                                    eye="Olho Direito"
                                />
                                : ''
                            }

                            {leftEye
                                ? <EyeInfoForm
                                    eye="Olho Esquerdo"
                                />
                                : ''
                            }
                        </div>
                    ) : ''
                }

                <div className={styles.col_half}>
                    <h4>Pagamento</h4>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <select name="payment_type" id="payment_type">
                            <option value="">Selecione um meio de pagamento</option>
                            <option value="Dinheiro">Dinheiro</option>
                            <option value="Pix">Pix</option>
                            <option value="Cartão de Crédito">Cartão de Crédito</option>
                            <option value="Cartão de Débito">Cartão de Débito</option>
                        </select>
                    </div>

                    <div className="box">
                        <strong>Valor Total: </strong>
                        <span>R$ 49.50</span>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            id="signal"
                            type="checkbox"
                            onClick={() => setSignal(!signal)}
                            name=""
                        />
                        <label htmlFor="signal">Sinal</label>
                    </div>

                    {signal
                        ? (
                            <div className="row">
                                <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                                    <input
                                        type="text"
                                        prefix="R$"
                                        name=""
                                        id=""
                                        placeholder="Valor para sinal"
                                        required
                                    />
                                    <div className={styles.input_icon}>
                                        <MdAttachMoney className={`${styles.fa} ${styles.fa_user}`} />
                                    </div>
                                </div>

                                <div className={styles.box}>
                                    <strong>Resto do valor: </strong>
                                    <span>R$ 30</span>
                                </div>
                            </div>
                        ) : ''
                    }
                </div>

                <FormButton
                    title="Fazer venda"
                />
            </form>
        </div>
    );
}