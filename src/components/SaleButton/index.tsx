import { useRouter } from "next/router";
import { FormEvent } from "react";
import styles from "./styles.module.scss";

type Props = {
    title: string;
    func?: (e: FormEvent) => void;
}

export const SaleButton = ({ title, func }: Props) => {

    return (
        <div className={styles.button}>
                <button 
                    onClick={func} 
                >
                    {title}
                </button>
        </div>
    )
}