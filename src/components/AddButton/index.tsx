import { useRouter } from "next/router";
import styles from "./styles.module.scss";

type Props = {
    title: string;
    link?: string;
}

export const AddButton = ({ title, link }: Props) => {
    const router = useRouter();

    function handleNavigation() {
        const address = link ? link : "";

        router.push(address);
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