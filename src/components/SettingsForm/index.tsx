import { FormEvent, useContext, useEffect, useState } from "react";
import { FaGlasses } from "react-icons/fa";
import { RiCommunityFill } from "react-icons/ri";

import { FormButton } from "../FormButton";

import { api } from "../../services/api";

import styles from "./styles.module.scss";
import { AuthContext } from "../../contexts/AuthContext";

type Settings = {
    id: string;
    optics_name: string;
    optics_unit: string;
}

export const SettingsForm = () => {
    const { user } = useContext(AuthContext);
    const [settings, setSettings] = useState<Settings>();
    const [name, setName] = useState("");
    const [unit, setUnit] = useState("");

    useEffect(() => {
        api.get('/settings')
            .then(res => {
                setSettings(res.data);
            }).catch(err => console.log(err));
    }, []);

    const handleUpdateSettings = (e: FormEvent) => {
        e.preventDefault();

        if (name == "" && unit == "") return;
        if (name == "") setName(settings!.optics_name);
        if (unit == "") setUnit(settings!.optics_unit);

        api.put(`/settings/${settings?.id}`, {
            optics_name: name,
            optics_unit: unit,
        }).then(res => {
            window.alert("Configuração alterada com Sucesso!!");
            setSettings(res.data);
        }).catch(err => {
            console.log(err);
            window.alert("Houve um erro.\n" + err);
            return;
        });

        api.post('/userlogs/create', {
            ulog_user_id: user?.user_id,
            ulog_user_cpf: user?.user_cpf,
            ulog_action: "Atualizou Configuração"
        }).then(res => {
            console.log("Log created.")
        }).catch(err => {
            console.log(err);
        });


    }

    return (
        <div className={styles.container}>
            <form onSubmit={e => handleUpdateSettings(e)} >
                <div className={styles.row}>
                    <h4>Configurações</h4>

                    <div className={styles.info}>
                        <strong>{settings?.optics_name}</strong>
                        <span>{settings?.optics_unit}</span>
                    </div>

                    <span style={{ fontSize: "0.8rem" }}>Alterar Dados</span>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            name=""
                            id=""
                            maxLength={26}
                            placeholder="Nome da Ótica"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <div className={styles.input_icon}>
                            <FaGlasses className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            name=""
                            id=""
                            maxLength={30}
                            placeholder="Unidade"
                            value={unit}
                            onChange={e => setUnit(e.target.value)}
                        />
                        <div className={styles.input_icon}>
                            <RiCommunityFill className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>

                </div>
                <div className={styles.row}>
                    <h4></h4>
                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <FormButton
                            title="Alterar"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}