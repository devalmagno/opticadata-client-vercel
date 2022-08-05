import { Dispatch } from "react";
import styles from "./styles.module.scss";

type Props = {
    title: string;
    handlerRemove?: () => void;
}

export const RemoveButton = ({ title, handlerRemove }: Props) => {

    return (
        <div className={styles.button} onClick={handlerRemove}>
                <button 
                >
                    {`Remover ${title}`}
                </button>
        </div>
    )
}