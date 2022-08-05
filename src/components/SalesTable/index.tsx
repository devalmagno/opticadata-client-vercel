import { Sale } from "../../pages/orders";
import { FcAbout } from "react-icons/fc";

import { FormatedDateAndHour } from "../FormatedDateAndHour";

import styles from "./styles.module.scss";

type Props = {
    sales: Sale[];
}

export const SalesTable = ({ sales }: Props) => {

    return (
        <div className={styles.table_wrapper}>
            <table className={styles.fl_table}>
                <thead>
                    <tr>
                        <th>
                            Data da Venda
                        </th>
                        <th>
                            Data p/ Entrega
                        </th>
                        <th>
                            Nome Cli.
                        </th>
                        <th>
                            Venda por
                        </th>
                        <th>
                            Pagamento
                        </th>
                        <th>
                            Valor Total
                        </th>
                        <th>
                            Status
                        </th>
                        <th>Sobre</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sal => (
                        <tr>
                            <td>
                                <FormatedDateAndHour
                                    date={sal.sal_sold_at}  
                                />
                            </td>
                            <td>
                                 <FormatedDateAndHour
                                    date={sal.sal_delivery_day}  
                                />                               
                            </td>
                            <td>{sal.customer?.cus_name}</td>
                            <td>{sal.collaborator?.col_name}</td>
                            <td>{sal.sal_status_pay}</td>
                            <td>{sal.fullPrice}</td>
                            <td>{sal.sal_status}</td>
                            <td>
                                <FcAbout />
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    );
}