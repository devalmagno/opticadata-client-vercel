import styles from "./styles.module.scss";

type Props = {
    title: string;
}

export const AddButton = ({ title } : Props) => {

    return (
        <div className={styles.button}>
            <button>
                { title }
            </button>
        </div>
    )
}