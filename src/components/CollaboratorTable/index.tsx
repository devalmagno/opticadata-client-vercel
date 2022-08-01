import { FiEdit, FiTrash2 } from "react-icons/fi";

import { Collaborator } from "../../pages/users";

import styles from "./styles.module.scss";

type Props = {
    collaborators: Collaborator[];
}

export const CollaboratorTable = ({ collaborators }: Props) => {

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
                        <th>
                            Editar
                        </th>
                        <th>
                            Remover
                        </th>
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
                            <td
                                style={{cursor: "pointer"}}
                            >
                                <FiEdit />
                            </td>
                            <td
                                style={{cursor: "pointer"}}
                            >
                                <FiTrash2 />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}