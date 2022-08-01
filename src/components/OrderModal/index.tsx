import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { IoMdTrash } from "react-icons/io";

import styles from "./styles.module.scss";

import PaymentModal from "../PaymentModal";

import { Sale } from "../../pages/orders";
import { Payment } from "../../pages/orders";
import RemoveModal from "../RemoveOrderModal";
import { parseCookies } from "nookies";
import { AuthContext } from "../../contexts/AuthContext";

type Props = {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    currentOrder: Sale;
    ordersInfo: Sale[];
};

const OrderModal = ({
    showModal,
    setShowModal,
    currentOrder,
    ordersInfo,
}: Props) => {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [currentInstallment, setCurrentInstallment] = useState<Payment>();
    const [currentIndex, setCurrentIndex] = useState(0);

    const { user } = useContext(AuthContext);


    const handleInstallment = (ins: Payment, index: number) => {
        setCurrentInstallment(ins);
        setCurrentIndex(index);
        setShowPaymentModal(!showPaymentModal);
    };

    // const sortDates = (date1: Payment, date2: Payment) => {
    //     let newDate1 = date1.pay_pending_date.split('/').reverse().join('');
    //     let newDate2 = date2.pay_pending_date.split('/').reverse().join('');

    //     return newDate1 > newDate2 ? 1 : newDate1 < newDate2 ? -1 : 0;
    // };

    return (
        <>
            {showModal && (
                <div className={styles.bg_modal}>
                    <div className={styles.modal_content}>
                        <div className={styles.header}>
                            <h3>Informações sobre a venda</h3>
                            <div
                                className={styles.box_close}
                                onClick={() => {
                                    setShowModal(!showModal);
                                }}
                            >
                                <div className={styles.close}></div>
                                <div className={styles.close}></div>
                            </div>
                        </div>

                        <div className={styles.container}>
                            <div className={styles.infoTables}>
                                <table className={styles.products}>
                                    <thead>
                                        <tr>
                                            <th>Descrição</th>
                                            <th>Quantidade</th>
                                            <th>Preço</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentOrder.saleProducts!.map(
                                            (product) => (
                                                <tr key={product.spr_id}>
                                                    <td>{product.product!.pro_desc}</td>
                                                    <td
                                                        className={
                                                            styles.quantity
                                                        }
                                                    >
                                                        {product.spr_quantity}
                                                    </td>
                                                    <td>
                                                        R${" "}
                                                        {
                                                            `${(product.product!.pro_unit_price * product.spr_quantity).toFixed(2)}`
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                                <table className={styles.workers}>
                                    <thead>
                                        <tr>
                                            <th>Colaborador</th>
                                            <th>Cargo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{currentOrder.collaborator!.col_name}</td>
                                            <td>{currentOrder.collaborator!.col_function}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.container}>
                                    <strong>Status do pagamento</strong>
                                    {currentOrder.payments!
                                        .map((ins) => ins.pay_status)
                                        .includes(false) ? (
                                        <strong className={styles.pending}>
                                            PENDENTE
                                        </strong>
                                    ) : (
                                        <strong className={styles.paid}>
                                            PAGO
                                        </strong>
                                    )}
                                </div>
                                <div className={styles.container}>
                                    <strong>Pagamento</strong>
                                    <span>{currentOrder.payments!.length > 1 ? "Sinal e Resto" : "Total"}</span>
                                </div>
                                <div className={styles.container}>
                                    <strong>Tipo de pagamento</strong>
                                    <span>
                                        {currentOrder.payments![0].pay_type_of_payment}
                                    </span>
                                </div>
                                <div className={styles.container}>
                                    <strong>Valor do Sinal</strong>
                                    <span>
                                        {
                                            currentOrder.payments![0].pay_desc == "Sinal" ?
                                                `R$ ${currentOrder.payments![0].pay_value.toFixed(2)}`
                                                : "0"
                                        }
                                    </span>
                                </div>

                                <div className={styles.container}>
                                    <strong>Valor total:</strong>
                                    <span>
                                        R${" "}
                                        {currentOrder.fullPrice!
                                            .toFixed(2)
                                            .replace(".", ",")}
                                    </span>
                                </div>

                                <div className={styles.installments}>
                                    <strong>Parcelas</strong>

                                    <div className={styles.boxContainer}>
                                        {currentOrder.payments!
                                            .map((ins, index) => (
                                                <div
                                                    key={ins.pay_id}
                                                    className={
                                                        ins.pay_status
                                                            ? `${styles.box} ${styles.insPaid}`
                                                            : `${styles.box} ${styles.insPending}`
                                                    }
                                                    onClick={() => {
                                                        handleInstallment(
                                                            ins,
                                                            index
                                                        );
                                                    }}
                                                >
                                                    <strong>{index + 1}</strong>

                                                    <div
                                                        className={
                                                            styles.tooltip
                                                        }
                                                    >
                                                        {ins.pay_status ?
                                                            ins.pay_date
                                                            : ins.pay_pending_date
                                                        }
                                                    </div>
                                                </div>
                                            ))}
                                    </div>

                                    <span>
                                        *clique em uma parcela para quitar
                                    </span>
                                </div>

                                {
                                    user?.user_is_admin ?
                                        (
                                            <div className={styles.button}>
                                                <button
                                                    onClick={() => {
                                                        setShowRemoveModal(
                                                            !showRemoveModal
                                                        );
                                                    }}
                                                >
                                                    Desativar Venda
                                                    <IoMdTrash className={styles.icon} />
                                                </button>
                                            </div>
                                        ) : ""
                                }
                            </div>
                        </div>
                    </div>

                    {showPaymentModal ? (
                        <PaymentModal
                            showModal={showPaymentModal}
                            setShowModal={setShowPaymentModal}
                            installment={currentInstallment!}
                            index={currentIndex}
                        />
                    ) : (
                        ""
                    )}

                    {showRemoveModal ? (
                        <RemoveModal
                            showModal={showRemoveModal}
                            setShowModal={setShowRemoveModal}
                            setShowOrderModal={setShowModal}
                            currentOrder={currentOrder}
                            ordersArray={ordersInfo}
                        />
                    ) : (
                        ""
                    )}
                </div>
            )}
        </>
    );
};

export default OrderModal;
