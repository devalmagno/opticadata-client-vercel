import {
    Dispatch,
    FormEvent,
    SetStateAction,
    useRef,
    useState,
    KeyboardEvent,
} from "react";
import { BiCheckCircle } from "react-icons/bi";

import { useFetch } from "../../hooks/useFetch";
import { api } from "../../services/api";

import { Collaborator } from "../../pages/users";

import styles from "./styles.module.scss";

type Props = {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    collaborators: Collaborator[];
};

const CollaboratorForm = ({ showModal, setShowModal, collaborators }: Props) => {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [occupation, setOccupation] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const cpfRef = useRef<HTMLInputElement>(null);

    const handleCPFInput = (keyEvent: KeyboardEvent) => {
        if (
            keyEvent.key != "Backspace" &&
            keyEvent.key != "Tab" &&
            keyEvent.key != "Enter"
        ) {
            if (!/\d/.test(keyEvent.key)) {
                return;
            }

            if (
                cpfRef.current?.value.length == 3 ||
                cpfRef.current?.value.length == 7
            ) {
                cpfRef.current.value += ".";
            }

            if (cpfRef.current?.value.length == 11) {
                cpfRef.current.value += "-";
            }
        }
    };

    const handleCreateWorker = (e: FormEvent) => {
        e.preventDefault();

        api.post(`/collaborators/create`, {
            col_name: name,
            col_cpf: cpf,
            col_function: occupation
        })
            .then(res => {
                const collaborator: Collaborator = res.data;

                collaborators.push(collaborator);
                setShowModal(!showModal);
            }).catch(err => {
                alert(err.message);
            })
    };

    return (
        <>
            {showModal ? (
                <div className={styles.bg_modal}>
                    <div className={styles.modal_content}>
                        <div className={styles.header}>
                            <h3>Adicionar Colaborador</h3>
                            <div
                                className={styles.box_close}
                                onClick={() => {
                                    setShowModal(!showModal);
                                }}
                            >
                                <div className={styles.close}></div>
                                <div className={styles.close}></div>
                            </div>
                        </div>

                        <form onSubmit={handleCreateWorker}>
                            <div className={styles.inputBox}>
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    id="name"
                                    maxLength={40}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    required
                                />
                                <label htmlFor="name">
                                    <BiCheckCircle className={styles.icon} />
                                </label>
                                <div className={styles.bottom}></div>
                            </div>
                            
                            <div className={styles.inputBox}>
                                <input
                                    ref={cpfRef}
                                    type="text"
                                    placeholder="CPF"
                                    id="cpf"
                                    pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                                    autoComplete="off"
                                    maxLength={14}
                                    onChange={(e) => {
                                        setCpf(e.target.value);
                                    }}
                                    onKeyDown={(keyEvent) =>
                                        handleCPFInput(keyEvent)
                                    }
                                    required
                                />
                                <label htmlFor="cpf">
                                    <BiCheckCircle className={styles.icon} />
                                </label>
                                <div className={styles.bottom}></div>
                            </div>

                            <div className={styles.inputBox}>
                                <input
                                    type="text"
                                    placeholder="Cargo"
                                    id="occupation"
                                    onChange={(e) => {
                                        setOccupation(e.target.value);
                                    }}
                                    required
                                />
                                <label htmlFor="occupation">
                                    <BiCheckCircle className={styles.icon} />
                                </label>
                                <div className={styles.bottom}></div>
                            </div>

                            <div className={styles.isAdmin}>
                                    <strong>Administrador?</strong>
                                    <input 
                                        type="checkbox" 
                                        id="isAdmin" 
                                        onChange={() => {
                                            setIsAdmin(!isAdmin);
                                        }}
                                    />
                            </div> 
                            
                            <div className={styles.inputBox}>
                                <input
                                    type="submit"
                                    value="Cadastrar Colaborador"
                                    className={styles.submit}
                                />
                            </div>
                        </form>
                    </div>

                </div>
            ) : undefined}
        </>
    );
};

export default CollaboratorForm;
