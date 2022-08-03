import { Dispatch } from "react";
import styles from "./styles.module.scss";

type Props = {
    title: string;
}

export const FormButton = ({ title }: Props) => {

    return (
        <div className={styles.button}>
            <input type="submit"
                // onClick={handleNavigation} 
                value={title}
            />
        </div>
    );
}