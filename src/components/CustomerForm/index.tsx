import { useRouter } from "next/router";
import { FormEvent, KeyboardEvent, useContext, useState } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { HiIdentification, HiOfficeBuilding } from "react-icons/hi";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";

import { FormButton } from "../FormButton";

import styles from "./styles.module.scss";

export const CustomerForm = () => {
    const { user } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [cpf, setCPF] = useState("");

    const router = useRouter();

    const handleCPF = (e: KeyboardEvent<HTMLInputElement>) => {
        const regex = /[0-9]|\./;

        if (e.key == 'Backspace') return;
        if (!regex.test(e.key)) e.preventDefault();
        if (cpf.length == 3) setCPF(`${cpf}.`);
        if (cpf.length == 7) setCPF(`${cpf}.`);
        if (cpf.length == 11) setCPF(`${cpf}-`);
    }

    const handlePhoneMask = (e: KeyboardEvent<HTMLInputElement>) => {
        const regex = /[0-9]|\./;

        if (e.key == 'Backspace') return;
        if (!regex.test(e.key)) e.preventDefault();
        if (phone.length == 1) setPhone(`(${phone}`);
        if (phone.length == 3) setPhone(`${phone}) `);
        if (phone.length == 10) setPhone(`${phone}-`);
    }

    const createCustomer = (e: FormEvent) => {
        e.preventDefault();

        api.post('/customers/create', {
            cus_name: name,
            cus_phone: phone,
            cus_cpf: cpf
        }).then(res => {
            window.alert(`Cliente ${res.data.cus_name} criado com sucesso!`)

        }).catch(err => {
            console.log(err);
            window.alert("Houve um erro.\n" + err);
            return;
        });

        api.post('/userlogs/create', {
            ulog_user_id: user?.user_id,
            ulog_user_cpf: user?.user_cpf,
            ulog_action: "Criou Cliente"
        }).then(res => {
            console.log("Log created.")
        }).catch(err => {
            console.log(err);
        });

        router.push('/customers');
    }

    return (
        <div className={styles.container}>
            <form onSubmit={e => createCustomer(e)} >
                <div className={styles.row}>
                    <h4>Cliente</h4>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            name=""
                            id=""
                            value={name}
                            onChange={e => setName(e.target.value)}
                            maxLength={26}
                            placeholder="Nome"
                            required
                        />
                        <div className={styles.input_icon}>
                            <FaUser className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            value={cpf}
                            onChange={(e) => setCPF(e.target.value)}
                            onKeyDown={(e) => handleCPF(e)}
                            name=""
                            id=""
                            maxLength={14}
                            placeholder="CPF"
                            required
                        />
                        <div className={styles.input_icon}>
                            <HiIdentification className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            name=""
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            onKeyDown={(e) => handlePhoneMask(e)}
                            id=""
                            maxLength={15}
                            placeholder="Telefone"
                            required
                        />
                        <div className={styles.input_icon}>
                            <FaPhoneAlt className={`${styles.fa} ${styles.fa_user}`} />
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