import { useRouter } from "next/router";
import { FiEdit } from "react-icons/fi";

import { FormatedDateAndHour } from "../FormatedDateAndHour";

import { Providers } from "../../pages/customers";

import styles from "./styles.module.scss";

type Props = {
    providers: Providers[];
    hide?: boolean;
}

export const ProvidersTable = ({ providers, hide = false }: Props) => {
    const router = useRouter();

    const navigateToEditProvider = (id: string) => {
        router.push(`/providers/edit/${id}`);
    }

    return (
        <div className={styles.table_wrapper}>
            <h4>Fornecedores</h4>

            <table className={styles.fl_table}>
                <thead>
                    <tr>
                        <th>
                            Data de Criação
                        </th>
                        <th>
                            Nome Fornecedor
                        </th>
                        <th>
                            CNPJ
                        </th>
                        <th>
                            Email
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
                    {providers.map(prov => (
                        <tr key={prov.prov_id}>
                            <td>
                                <FormatedDateAndHour
                                    date={prov.created_at}
                                />
                            </td>
                            <td>
                                {prov.prov_desc}
                            </td>
                            <td>
                                {prov.prov_cnpj}
                            </td>
                            <td>
                                {prov.prov_email}
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

