import { useRouter } from "next/router";
import { FormEvent, KeyboardEvent, useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { HiIdentification, HiOfficeBuilding } from "react-icons/hi";
import { AuthContext } from "../../contexts/AuthContext";
import { Collaborator } from "../../pages/users";
import { api } from "../../services/api";

import { FormButton } from "../FormButton";

import styles from "./styles.module.scss";

type Props = {
    collaborator: Collaborator;
}

export const EditCollaboratorForm = ({ collaborator }: Props) => {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState(collaborator.col_name);
    const [occupation, setOccupation] = useState(collaborator.col_function);

    const [createUser, setCreateUser] = useState(false);
    const [userIsAdmin, setUserIsAdmin] = useState(false);
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handlerCreateUser = () => {
        api.post('/users/create', {
            user_col_id: collaborator.col_id,
            user_cpf: collaborator.col_cpf,
            user_is_admin: userIsAdmin,
            user_password: password
        }).then(res => {
            console.log(`User created CPF: ${res.data.cpf}`);
        }).catch(err => {
            console.log(err);
            window.alert("Houve um erro.\n" + err);
            return;
        });

        api.post('/userlogs/create', {
            ulog_user_id: user?.user_id,
            ulog_user_cpf: user?.user_cpf,
            ulog_action: "Criou Usuário"
        }).then(res => {
            console.log("Log created.")
        }).catch(err => {
            console.log(err);
        });
    }

    const handlerUpdateCollaborator = (e: FormEvent) => {
        e.preventDefault();

        if (createUser) handlerCreateUser();

        api.put(`/collaborators/${collaborator.col_id}`, {
            col_name: name,
            col_function: occupation,
        }).then(res => {
            window.alert(`Colaborador ${res.data.col_name} alterado com sucesso!`)
        }).catch(err => {
            console.log(err);
            window.alert("Houve um erro.\n" + err);
            return;
        });

        api.post('/userlogs/create', {
            ulog_user_id: user?.user_id,
            ulog_user_cpf: user?.user_cpf,
            ulog_action: "Alterou Colaborador"
        }).then(res => {
            console.log("Log created.")
        }).catch(err => {
            console.log(err);
        });

        router.push('/users');
    }

    return (
        <div className={styles.container}>
            <form onSubmit={e => handlerUpdateCollaborator(e)} >
                <div className={styles.row}>
                    <h4>Colaborador</h4>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            name=""
                            id=""
                            value={name}
                            onChange={e => setName(e.target.value)}
                            maxLength={26}
                            placeholder="Nome"
                        />
                        <div className={styles.input_icon}>
                            <FaUser className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            name=""
                            value={occupation}
                            onChange={e => setOccupation(e.target.value)}
                            id=""
                            maxLength={26}
                            placeholder="Cargo"
                        />
                        <div className={styles.input_icon}>
                            <HiOfficeBuilding className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>
                </div>


                <div className={styles.row}>
                    {!collaborator.isUser ?
                        (
                            <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                                <input
                                    id="user"
                                    type="checkbox"
                                    onClick={() => setCreateUser(!createUser)}
                                    name=""
                                />
                                <label htmlFor="user">Tornar Usuário</label>
                            </div>
                        ) : ''
                    }

                    {createUser ?
                        (
                            <>
                                <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                                    <input
                                        id="isadmin"
                                        type="checkbox"
                                        onClick={() => setUserIsAdmin(!userIsAdmin)}
                                        name=""
                                    />
                                    <label htmlFor="isadmin">Administrador</label>
                                </div>

                                <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                                    <input
                                        type="password"
                                        name=""
                                        id=""
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        maxLength={26}
                                        placeholder="Senha"
                                        required
                                    />
                                    <div className={styles.input_icon}>
                                        <MdPassword className={`${styles.fa} ${styles.fa_user}`} />
                                    </div>
                                </div>


                            </>
                        ) : ''
                    }
                </div>

                <div className={styles.row}>
                    <h4></h4>
                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <FormButton
                            title="Alterar"
                        />
                    </div>
                </div>
            </form>

        </div>
    );
}