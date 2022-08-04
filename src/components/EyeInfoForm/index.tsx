import { AiFillEye } from "react-icons/ai";

import styles from "../SaleForm/styles.module.scss";

type Props = {
    eye: string;
}

export const EyeInfoForm = ({ eye }: Props) => {

    return (
        <div className={styles.row}>
            <h4>{eye}</h4>

            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Esfera"
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
                    placeholder="Eixo"
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
                    placeholder="Cilindro"
                    required
                />
                <div className={styles.input_icon}>
                    <AiFillEye className={`${styles.fa} ${styles.fa_user}`} />
                </div>

            </div>

        </div>
    );
}