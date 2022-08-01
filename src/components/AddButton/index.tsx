import Router from "next/router";
import styles from "./styles.module.scss";

type Props = {
    title: string;
    link?: string;
}

export const AddButton = ({ title, link }: Props) => {

    function handleNavigation() {
        const address = link ? link : "";

        Router.push(address);
    }

    return (
        <div className={styles.button}>
            <button
                onClick={handleNavigation} 
            >
                {title}
            </button>
        </div>
    )
}