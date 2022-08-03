import { FiEdit, FiTrash2 } from "react-icons/fi";

import { FormatedDateAndHour } from "../FormatedDateAndHour";

import { UserLogs } from "../../pages/users";

import styles from "./styles.module.scss";

type Props = {
    userLogs: UserLogs[];
}

export const UserLogsTable = ({ userLogs }: Props) => {

    return (
        <div className={styles.table_wrapper}>

            <h4>Logs de Usuários</h4>

            <table className={styles.fl_table}>
                <thead>
                    <tr>
                        <th>
                            Data e Hora
                        </th>
                        <th>
                            CPF Usuário                       
                        </th>
                        <th>
                            Ação
                        </th>
                   </tr>
                </thead>
                <tbody>
                    {userLogs.slice(0).reverse().map(ulog => (
                        <tr key={ulog.ulog_id}>
                            <td>
                                <FormatedDateAndHour
                                    date={ulog.created_at} 
                                />
                            </td>
                            <td>
                                {ulog.ulog_user_cpf}
                            </td>
                            <td>
                                {ulog.ulog_action}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}