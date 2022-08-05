import { useRouter } from "next/router";
import { FormEvent, KeyboardEvent, useContext, useState } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiIdentification, HiOfficeBuilding } from "react-icons/hi";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";

import { FormButton } from "../FormButton";

import styles from "./styles.module.scss";

export const ProviderForm = () => {
    const { user } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cnpj, setCNPJ] = useState("");

    const router = useRouter();

    const handleCNPJ = (e: KeyboardEvent<HTMLInputElement>) => {
        const regex = /[0-9]|\./;

        if (e.key == 'Backspace') return;
        if (!regex.test(e.key)) e.preventDefault();
        if (cnpj.length == 2) setCNPJ(`${cnpj}.`);
        if (cnpj.length == 6) setCNPJ(`${cnpj}.`);
        if (cnpj.length == 10) setCNPJ(`${cnpj}/`);
        if (cnpj.length == 15) setCNPJ(`${cnpj}-`);
    }

    const createCustomer = (e: FormEvent) => {
        e.preventDefault();

        api.post('/providers/create', {
            prov_desc: name,
            prov_email: email,
            prov_cnpj: cnpj
        }).then(res => {
            window.alert(`Fornecedor ${res.data.prov_desc} criado com sucesso!`)

        }).catch(err => {
            console.log(err);
            window.alert("Houve um erro.\n" + err);
            return;
        });

        api.post('/userlogs/create', {
            ulog_user_id: user?.user_id,
            ulog_user_cpf: user?.user_cpf,
            ulog_action: "Criou fornecedor"
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
                    <h4>Fornecedor</h4>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            name=""
                            id=""
                            value={name}
                            onChange={e => setName(e.target.value)}
                            maxLength={16}
                            placeholder="Nome Fornecedor"
                            required
                        />
                        <div className={styles.input_icon}>
                            <FaUser className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            value={cnpj}
                            onChange={(e) => setCNPJ(e.target.value)}
                            onKeyDown={(e) => handleCNPJ(e)}
                            name=""
                            id=""
                            maxLength={18}
                            placeholder="CNPJ"
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
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            id=""
                            maxLength={80}
                            placeholder="Email"
                        />
                        <div className={styles.input_icon}>
                            <MdEmail className={`${styles.fa} ${styles.fa_user}`} />
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