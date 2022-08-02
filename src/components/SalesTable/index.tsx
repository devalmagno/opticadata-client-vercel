import { Sale } from "../../pages/orders";

import { FormatedDate } from "../FormatedDate";

import styles from "./styles.module.scss";

type Props = {
    stockMoves: Sale[];
}

export const SalesTable = () => {

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
                </tbody>
            </table>
        </div>
    );
}