import { Dispatch, SetStateAction } from "react";
import { AiFillEye } from "react-icons/ai";

import styles from "../SaleForm/styles.module.scss";

type Props = {
    eye: string;

    esf: number;
    setEsf: Dispatch<SetStateAction<number>>;

    cil: number;
    setCil: Dispatch<SetStateAction<number>>;

    eixo: number;
    setEixo: Dispatch<SetStateAction<number>>;
}

export const EyeInfoForm = ({ eye, cil, eixo, esf, setCil, setEixo, setEsf }: Props) => {

    return (
        <div className={styles.row}>
            <h4>{eye}</h4>

            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                <input
                    type="text"
                    name=""
                    id=""
                    value={esf}
                    onChange={e => setEsf(Number(e.target.value))}
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
                    value={eixo}
                    onChange={e => setEixo(Number(e.target.value))}

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
                    value={cil}
                    onChange={e => setCil(Number(e.target.value))}
                    required
                />
                <div className={styles.input_icon}>
                    <AiFillEye className={`${styles.fa} ${styles.fa_user}`} />
                </div>

            </div>

        </div>
    );
}