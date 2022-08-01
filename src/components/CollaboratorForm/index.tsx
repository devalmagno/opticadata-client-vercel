import { FaUser } from "react-icons/fa";
import { HiIdentification, HiOfficeBuilding } from "react-icons/hi";

import { FormButton } from "../FormButton";

import styles from "./styles.module.scss";

export const CollaboratorForm = () => {

    return (
        <div className={styles.container}>
            <form action="" >
                <div className={styles.row}>
                    <h4>Colaborador</h4>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            name=""
                            id=""
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