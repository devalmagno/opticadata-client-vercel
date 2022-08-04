import styles from "./styles.module.scss";

type Props = {
    title: string;
}

export const RemoveButton = ({ title }: Props) => {

    return (
        <div className={styles.button}>
                <button 
                >
                    {`Remover ${title}`}
                </button>
        </div>
    )
}