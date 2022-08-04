import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import { Collaborator } from "../../pages/users";
import { api } from "../../services/api";

import styles from "./styles.module.scss";

type Props = {
    collaborators: Collaborator[];
    hide?: boolean;
}

export const CollaboratorTable = ({ collaborators, hide = false }: Props) => {
    const router = useRouter();

    const navigateToEditCollaborator = (id: string) => {
        router.push(`/collaborators/edit/${id}`);
    }

    return (
        <div className={styles.table_wrapper}>

            <table className={styles.fl_table}>
                <thead>
                    <tr>
                        <th>
                            Nome
                        </th>
                        <th>
                            CPF
                        </th>
                        <th>
                            Usuário
                        </th>
                        <th>
                            Cargo
                        </th>
                        {
                            !hide ?
                                <th>
                                    Editar
                                </th> :
                                <></>
                        }
                    </tr>
                </thead>
                <tbody>
                    {collaborators.map(col => (
                        <tr key={col.col_id}>
                            <td>
                                {col.col_name}
                            </td>
                            <td>
                                {col.col_cpf}
                            </td>
                            <td>
                                {col.isUser ? "Sim" : "Não"}
                            </td>
                            <td>{col.col_function}</td>
                            {!hide ?
                                <td
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigateToEditCollaborator(col.col_id)}
                                >
                                    <FiEdit />
                                </td> : <></>
                        }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

