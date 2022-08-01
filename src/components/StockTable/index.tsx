import { FiEdit } from "react-icons/fi";

import { Stocks } from "../../pages/stocks";

import styles from "./styles.module.scss";

type Props = {
    stocks: Stocks[];
}

export const StockTable = ({ stocks }: Props) => {

    return (
        <div className={styles.table_wrapper}>

            <table className={styles.fl_table}>
                <thead>
                    <tr>
                        <th>
                            Código Prod.
                        </th>
                        <th>
                            Descrição do Prod.                       
                        </th>
                        <th>
                            Quant. em Estoque
                        </th>
                        <th>
                            Estoque Max.
                        </th>
                        <th>
                            Estoque Min.
                        </th>
                        <th>
                            Editar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map(sto => (
                        <tr key={sto.sto_id}>
                            <td>
                                {sto.product?.pro_id}
                            </td>
                            <td>
                                {sto.product?.pro_desc}
                            </td>
                            <td>
                                {sto.sto_quantity}
                            </td>
                            <td>
                                {sto.sto_max}
                            </td>
                            <td>
                                {sto.sto_min}
                            </td>
                            <td>
                                <FiEdit />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}