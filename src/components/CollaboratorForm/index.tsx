import { useRouter } from "next/router";
import { FormEvent, KeyboardEvent, useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiIdentification, HiOfficeBuilding } from "react-icons/hi";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";

import { FormButton } from "../FormButton";

import styles from "./styles.module.scss";

export const CollaboratorForm = () => {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [occupation, setOccupation] = useState("");
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

    const createCollaborator = (e: FormEvent) => {
        e.preventDefault();

        api.post('/collaborators/create', {
            col_name: name,
            col_function: occupation,
            col_cpf: cpf
        }).then(res => {
            window.alert(`Colaborador ${res.data.col_name} criado com sucesso!`)

        }).catch(err => {
            console.log(err);
            window.alert("Houve um erro.\n" + err);
            return;
        });

        api.post('/userlogs/create', {
            ulog_user_id: user?.user_id,
            ulog_user_cpf: user?.user_cpf,
            ulog_action: "Criou Colaborador"
        }).then(res => {
            console.log("Log created.")
        }).catch(err => {
            console.log(err);
        });

        router.push('/users');
    }

    return (
        <div className={styles.container}>
            <form onSubmit={e => createCollaborator(e)} >
                <div className={styles.row}>
                    <h4>Colaborador</h4>

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
                            value={occupation}
                            onChange={e => setOccupation(e.target.value)}
                            id=""
                            maxLength={26}
                            placeholder="Cargo"
                            required
                        />
                        <div className={styles.input_icon}>
                            <HiOfficeBuilding className={`${styles.fa} ${styles.fa_user}`} />
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