import { useRouter } from "next/router";
import { FiEdit } from "react-icons/fi";

import { FormatedDateAndHour } from "../FormatedDateAndHour";

import { CustomerAddresses } from "../../pages/customers";

import styles from "./styles.module.scss";

type Props = {
    customerAddresses: CustomerAddresses[];
    hide?: boolean;
}

export const CustomerAddressesTable = ({ customerAddresses, hide = false }: Props) => {
    const router = useRouter();

    const navigateToEditCustomer = (id: string) => {
        router.push(`/customers/edit/${id}`);
    }

    return (
        <div className={styles.table_wrapper}>
            <h4>Endereços</h4>

            <table className={styles.fl_table}>
                <thead>
                    <tr>
                       <th>
                            Cidade
                        </th>
                        <th>
                            Bairro
                        </th>
                        <th>
                            Rua, Número
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
                    {customerAddresses.map(cad => (
                        <tr key={cad.cad_id}>
                           <td>
                                {cad.cad_city}
                            </td>
                            <td>
                                {cad.cad_district}
                            </td>
                            <td>
                                {cad.cad_desc}
                            </td>
                            {!hide ?
                                <td
                                    style={{ cursor: "pointer" }}
                                    // onClick={() => navigateToEditCustomer(cus.cus_id)}
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

