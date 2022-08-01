import { useRouter } from "next/router";
import { MdOutlineArrowBack } from "react-icons/md"

import styles from "./styles.module.scss";

type Props = {
    title: string;
}

export default function GoBack({ title }: Props) {

    const router = useRouter();

    function handleNavigation() {
        router.back();
    }


    return (
        <div className={styles.button}>
            <button onClick={handleNavigation}>
                <MdOutlineArrowBack
                    className={styles.icon}
                />
                <span>Voltar para {' '}
                    <strong>{title}</strong>
                </span>
            </button>
        </div>
    );
}