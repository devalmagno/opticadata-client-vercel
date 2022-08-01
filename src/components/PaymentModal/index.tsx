import { Dispatch, FormEvent, SetStateAction, useState } from "react";

import { Payment } from "../../pages/orders";
import { api } from "../../services/api";

import styles from "./styles.module.scss";

type Props = {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    installment: Payment;
    index: number;
};

const PaymentModal = ({
    showModal,
    setShowModal,
    installment,
    index,
}: Props) => {
    const [isButton, setIsButton] = useState(false);

    const handlePayment = async (e: FormEvent) => {
        e.preventDefault();

        try {
            api.put(`/payments/${installment.pay_id}`).then(() => {
                setShowModal(!showModal);
            });
        } catch (err) {
            alert("Não foi possível.");
        }
    };

    return (
        <>
            {showModal && (
                <div className={styles.bg_modal}>
                    <div className={installment.pay_status ? `${styles.content} ${styles.cancel}` : styles.content}>
                        <h3>
                            {installment.pay_status
                                ? `Registro de pagamento da ${index + 1}º parcela`
                                :
                                `Registrar pagamento da ${index + 1
                                }º parcela`
                            }
                        </h3>
                        <div className={styles.field}>
                            <strong>Data agendada: </strong>
                            <span>{installment.pay_pending_date}</span>
                        </div>
                        <div className={styles.field}>
                            <strong>Valor da parcela: </strong>
                            <span>
                                R${" "}
                                {installment.pay_value.toFixed(2).replace(".", ",")}
                            </span>
                        </div>
                        <form onSubmit={handlePayment}>
                            <div className={styles.radio}>
                                <input
                                    type="checkbox"
                                    name="payment"
                                    id="payment"
                                    onClick={() => {
                                        setIsButton(!isButton);
                                    }}
                                    required
                                />
                                <label htmlFor="payment"></label>
                                <span>
                                    {installment.pay_status ?
                                        `Sim, tenho certeza que desejo cancelar o registro de pagamento desta parcela.`
                                        :
                                        `Sim, tenho certeza que desejo registrar o
                                    pagamento desta parcela.`
                                    }
                                </span>
                            </div>

                            <div
                                className={
                                    isButton
                                        ? `${styles.buttons} ${styles.active}`
                                        : styles.buttons
                                }
                            >
                                <input
                                    type="submit"
                                    value={installment.pay_status ? "Remover" : "Confirmar"}
                                    className={styles.buttonStyle}
                                />
                                <button
                                    onClick={() => {
                                        setShowModal(!showModal);
                                    }}
                                    className={styles.buttonStyle}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default PaymentModal;
