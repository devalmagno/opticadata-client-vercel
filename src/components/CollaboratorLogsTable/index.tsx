import { useRouter } from "next/router";
import { FiEdit } from "react-icons/fi";

import { FormatedDate } from "../FormatedDate";

import styles from "./styles.module.scss";

type Props = {
    collaboratorLogs: CollaboratorLogs[];
    hide?: boolean;
}

type CollaboratorLogs = {
    clog_id: string;
    clog_col_id: string;
    clog_old_col_function: string;
    created_at: Date;
}

export const CollaboratorLogsTable = ({ collaboratorLogs, hide = false }: Props) => {
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
                            Cargos Exercidos
                        </th>
                        <th>
                            Data de Ínicio do Cargo
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
                    {collaboratorLogs.map(clog => (
                        <tr key={clog.clog_id}>
                            <td>
                                {clog.clog_old_col_function}
                            </td>
                            <td>
                                <FormatedDate
                                    date={clog.created_at}
                                />
                            </td>
                            {!hide ?
                                <td
                                    style={{ cursor: "pointer" }}
                                    // onClick={() => navigateToEditCollaborator(col.col_id)}
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

