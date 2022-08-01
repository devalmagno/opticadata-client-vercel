import { useContext, useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import { useFetch } from "../../hooks/useFetch";
import { Collaborator } from "../../pages/users";
import { api } from "../../services/api";
import OrderSidebar from "../OrderSidebar";

import styles from "./styles.module.scss";

type Props = {
    title: string;
}

type Installments = {
    id: string;
    payment_id: string;
    price: string;
    payment_date: Date;
    status: boolean;
    created_at: Date;
    updated_at: Date;
}

export default function Header({ title }: Props) {
    const { user } = useContext(AuthContext);
//    const [installments, setInstallments] = useState<Installments[]>([]);
    const [openBox, setOpenBox] = useState(false);
    const [collaborator, setCollaborator] = useState<Collaborator>();

    // useEffect(() => {
    //     api.get(`/installments/${currentDate()}`)
    //         .then(response => {
    //             setInstallments(response.data);
    //         })
    // }, []);

    useEffect(() => {
        api.get(`/collaborators/${user?.user_col_id}`)
            .then(res => {
                setCollaborator(res.data);
            })
            .catch(err => console.log(err));
    })

    return (
        <div className={styles.container}>
            <h2>{title}</h2>
            {/* <div 
                className={
                    installments[0] ? 
                    `${styles.notification} ${styles.active}` 
                    : styles.notification 
                }
                onClick={() => { installments[0] && setOpenBox(!openBox) }}
            >
                <FaBell className={installments[0] ? `${styles.cursorActive} ${styles.icon}` : styles.icon} />
            </div>
            <div className={openBox ? `${styles.box} ${styles.open}` : styles.box }>
                    <h4>Notificações</h4>
                    {
                        installments.map(installment => ( 
                            <div key={installment.id} className={styles.content}>
                                <span>pagamento pendente marcado para hoje</span>
                            </div>
                        ))
                    }
            </div> */}
            <div className={styles.functions}>
            </div>
            <div className={styles.user}>
                <strong>{collaborator?.col_name}</strong>
                <span>{collaborator?.col_function}</span>
            </div>
        </div>
    );
}

const currentDate = () => {
    const currentDate = {
        date: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    }

    const payment_date = new Date(currentDate.year, currentDate.month, currentDate.date).toISOString();

    return payment_date;
}