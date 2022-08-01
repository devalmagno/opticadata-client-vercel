import { useEffect, useState } from "react";
import { FaGlasses } from "react-icons/fa";
import { RiCommunityFill } from "react-icons/ri";

import { FormButton } from "../FormButton";

import { api } from "../../services/api";

import styles from "./styles.module.scss";

type Settings = {
    optics_name: string;
    optics_unit: string;
}

export const SettingsForm = () => {

    const [settings, setSettings] = useState<Settings>();

    useEffect(() => {
        api.get('/settings')
            .then(res => {
                setSettings(res.data);
            }).catch(err => console.log(err));
    }, []);

    return (
        <div className={styles.container}>
            <form action="" >
                <div className={styles.row}>
                    <h4>Configurações</h4>

                    <div className={styles.info}>
                        <strong>{settings?.optics_name}</strong>
                        <span>{settings?.optics_unit}</span>
                    </div>

                    <span style={{fontSize: "0.8rem"}}>Alterar Dados</span>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            name=""
                            id=""
                            maxLength={26}
                            placeholder="Nome da Ótica"
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