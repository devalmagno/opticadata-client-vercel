import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AiOutlineFieldNumber, AiFillEye } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { HiIdentification } from "react-icons/hi";
import { MdAttachMoney, MdDeliveryDining } from "react-icons/md";

import { Product } from "../../pages/orders";
import { CustomerAddresses, Customers } from "../../pages/customers";
import { Stocks } from "../../pages/stocks";

import { api } from "../../services/api";

import { SaleButton } from "../SaleButton";
import { EyeInfoForm } from "../EyeInfoForm";
import { FormButton } from "../FormButton";

import styles from "./styles.module.scss";

type SaleProducts = {
    spr_pro_id: string;
    spr_desc: string;
    spr_price: number;
    spr_quantity: number;
}

export const SaleForm = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [customers, setCustomers] = useState<Customers[]>([]);
    const [customerAddresses, setCustomerAddresses] = useState<CustomerAddresses[]>([]);
    const [stocks, setStocks] = useState<Stocks[]>([]);

    const [saleProducts, setSaleProducts] = useState<SaleProducts[]>([]);

    const [currentProduct, setCurrentProduct] = useState("");
    const [quantity, setQuantity] = useState<number>();

    const [currentCustomer, setCurrentCustomer] = useState("");;
    const [currentAddress, setCurrentAddress] = useState("");;
    const [deliveryDate, setDeliveryDate] = useState<Date>();;

    const [needDoctorPrescription, setNeedDoctorPrescription] = useState(false);
    const [rightEye, setRightEye] = useState(false);
    const [leftEye, setLeftEye] = useState(false);

    const [dnpOd, setDnpOd] = useState<number>();
    const [dnpOe, setDnpOe] = useState<number>();
    const [heightSegment, setHeightSegment] = useState<number>();
    const [dp, setDp] = useState<number>();
    const [crm, setCrm] = useState("");

    const [esfD, setEsfD] = useState<number>();
    const [eixoD, setEixoD] = useState<number>();
    const [cilD, setCilD] = useState<number>();

    const [eixoE, setEixoE] = useState<number>();
    const [esfE, setEsfE] = useState<number>();
    const [cilE, setCilE] = useState<number>();

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

        api.get('/customers')
            .then(res => {
                setCustomers(res.data);
            })
            .catch(err => console.log(err));

    }, []);

    products.forEach(pro => {
        stocks.forEach(sto => {
            if (sto.sto_pro_id == pro.pro_id) sto.product = pro;

        });
    });

    const handlerDeliveryDate = (value: string) => {
        const formatedDate = new Date(value);

        setDeliveryDate(formatedDate);
    }

    const handlerAddProductToSaleProducts = (e: FormEvent) => {
        e.preventDefault();
        if (quantity == 0 || !quantity || !products) return;
        let salePro = [...saleProducts];

        let desc: string = "";
        let price: number = 0;

        products.forEach(pro => {
            if (pro.pro_id == currentProduct) {
                desc = pro.pro_desc;
                price = pro.pro_unit_price;
            }
        });

        salePro.push({
            spr_pro_id: currentProduct,
            spr_quantity: quantity,
            spr_desc: desc,
            spr_price: price
        });

        setSaleProducts(salePro);
        setCurrentProduct("");
        setQuantity(0);
    }

    const handlerCustomerSelection = (value: string) => {
        setCurrentCustomer(value);

        api.get(`/customeraddresses/${value}`)
            .then(res => {
                setCustomerAddresses(res.data);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={styles.container}>
            <form action="">
                <h4>Produto</h4>

                <div className={styles.col_half}>
                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <select
                            name="stock"
                            id="stock"
                            value={currentProduct}
                            onChange={e => setCurrentProduct(e.target.value)}
                        >
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

                {/* <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                    <input
                        type="search"
                        name=""
                        id=""
                        placeholder="Pesquisar Produto"
                    />
                    <div className={styles.input_icon}>
                        <BiSearchAlt className={`${styles.fa} ${styles.fa_user}`} />
                    </div>
                </div>
 */}
                {currentProduct != "" ?
                    (
                        <>
                            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                                <input
                                    type="number"
                                    name=""
                                    id=""
                                    value={quantity}
                                    onChange={e => setQuantity(Number(e.target.value))}
                                    placeholder="Quantidade"
                                    required
                                />
                                <div className={styles.input_icon}>
                                    <AiOutlineFieldNumber className={`${styles.fa} ${styles.fa_user}`} />
                                </div>
                            </div>

                            <SaleButton
                                title="Adicionar Produto"
                                func={e => handlerAddProductToSaleProducts(e)}
                            />
                        </>
                    ) : ''
                }

                {saleProducts.length > 0 ?
                    (
                        <div className={styles.sale_products}>
                            {saleProducts.map(spr => (
                                <div className={styles.sal_pro}>
                                    {spr.spr_desc} Qtde. {spr.spr_quantity} Total: R$ {spr.spr_price * spr.spr_quantity}
                                </div>
                            ))}
                        </div>
                    ) : ''
                }


                <h4>Cliente</h4>
                <div className={styles.col_half}>
                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <select
                            name="customer"
                            id="customer"
                            value={currentCustomer}
                            onChange={e => handlerCustomerSelection(e.target.value)}
                        >
                            <option value="">Selecione um cliente</option>
                            {customers.map(cus => (
                                <option value={cus.cus_id}>
                                    {cus.cus_name} - {cus.cus_cpf}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Pesquisar Cliente CPF"
                    />
                    <div className={styles.input_icon}>
                        <BiSearchAlt className={`${styles.fa} ${styles.fa_user}`} />
                    </div>
                </div> */}

                {currentCustomer != ""
                    ? (
                        <div className={styles.row}>
                            <h4>Entrega</h4>

                            <div className={styles.col_half}>
                                <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                                    <select 
                                        name="customer_address" 
                                        id="customer_address"
                                        value={currentAddress}
                                        onChange={e => setCurrentAddress(e.target.value)}
                                    >
                                        <option value="">Selecione um Endereço</option>
                                        {customerAddresses.map(cad => (
                                            <option value={cad.cad_id}>
                                                {cad.cad_desc} - {cad.cad_district}, {cad.cad_city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* <div className={`${styles.input_group} ${styles.input_group_icon}`}>
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
 */}
                            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                                <input
                                    type="date"
                                    name=""
                                    id=""
                                    onChange={e => handlerDeliveryDate(e.target.value)}
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
                                    value={dnpOd}
                                    onChange={e => setDnpOd(Number(e.target.value))}
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