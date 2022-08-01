import { FiEdit } from "react-icons/fi";

import { Product } from "../../pages/orders";

import styles from "./styles.module.scss";

type Props = {
    products: Product[];
}

export const ProductTable = ({ products }: Props) => {

    return (
        <div className={styles.table_wrapper}>
            <table className={styles.fl_table}>
                <thead>
                    <tr>
                        <th>
                            Código
                        </th>
                        <th>
                            Descrição
                        </th>
                        <th>
                            Categoria
                        </th>
                        <th>
                            Preço/unidade
                        </th>
                        <th>
                            Ativo
                        </th>
                        <th>
                            Editar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(pro => (
                        <tr key={pro.pro_id}>
                            <td>
                                {pro.pro_id}
                            </td>
                            <td>
                                {pro.pro_desc}
                            </td>
                            <td>
                                {pro.pro_type}
                            </td>
                            <td>
                                R$
                                {pro.pro_unit_price}
                            </td>
                            <td>
                                {pro.pro_status 
                                    ? 'Sim'
                                    : 'Não'
                                }
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