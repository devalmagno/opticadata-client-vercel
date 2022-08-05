import { useRouter } from "next/router";
import { FiEdit } from "react-icons/fi";

import { FormatedDateAndHour } from "../FormatedDateAndHour";

import { Customers } from "../../pages/customers";

import styles from "./styles.module.scss";

type Props = {
    customers: Customers[];
    hide?: boolean;
}

export const CustomersTable = ({ customers, hide = false }: Props) => {
    const router = useRouter();

    const navigateToEditCollaborator = (id: string) => {
        router.push(`/customers/edit/${id}`);
    }

    return (
        <div className={styles.table_wrapper}>
            <h4>Clientes</h4>

            <table className={styles.fl_table}>
                <thead>
                    <tr>
                        <th>
                            Data de Criação
                        </th>
                        <th>
                            Nome
                        </th>
                        <th>
                            CPF
                        </th>
                        <th>
                            Telefone
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
                    {customers.map(cus => (
                        <tr key={cus.cus_id}>
                            <td>
                                <FormatedDateAndHour
                                    date={cus.created_at}
                                />
                            </td>
                            <td>
                                {cus.cus_name}
                            </td>
                            <td>
                                {cus.cus_cpf}
                            </td>
                            <td>
                                {cus.cus_phone}
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

