import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { RemoveButton } from "../../../components/RemoveButton";
import { CustomersTable } from "../../../components/CustomersTable";
import { CustomerAddressesTable } from "../../../components/CustomerAddressesTable";
import { EditCustomerForm } from "../../../components/EditCustomerForm";
import GoBack from "../../../components/GoBack";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { api } from "../../../services/api";

import { Customers } from "../../customers";
import { CustomerAddresses } from "../../customers";

import styles from "./styles.module.scss";
import { AuthContext } from "../../../contexts/AuthContext";

export default function EditCollaborator() {
    const { user } = useContext(AuthContext);

    const router = useRouter();
    const [sidebar, setSidebar] = useState(true);
    const [customer, setCustomer] = useState<Customers | null>(null);
    const [customerAddresses, setCustomerAddresses] = useState<CustomerAddresses[]>([]);

    let modifyCollaborator: Customers;

    const { slug } = router.query;

    useEffect(() => {
        if (slug) {
            api.get(`/customers/${slug}`)
                .then(res => {
                    setCustomer(res.data);
                }).catch(err => console.log(err));

            api.get(`/customeraddresses/${slug}`)
                .then(res => {
                    setCustomerAddresses(res.data);
                }).catch(err => console.log(err));
        }
    }, []);

    const handlerRemoveCustomer = () => {
        const isConfirmed = window.confirm(`Tem certeza que deseja remover o cliente ${customer?.cus_name}?`)

        if (!isConfirmed) return;

        api.delete(`/customers/${slug}`)
            .then(res => {
                window.alert(`Cliente ${res.data.col_name} removido com sucesso`);
            }).catch(err => {
                console.log(err);
                window.alert(err);
                return;
            });

        api.post('/userlogs/create', {
            ulog_user_id: user?.user_id,
            ulog_user_cpf: user?.user_cpf,
            ulog_action: "Removeu Cliente"
        }).then(res => {
            console.log("Log created.")
        }).catch(err => {
            console.log(err);
        });

        router.push('/customers');
    }



    return (
        <div className={
            sidebar ?
                `${styles.container} ${styles.active}`
                : `${styles.container} ${styles.sidebar}`
        }>
            <Header title={`Editar Cliente ${customer?.cus_name}`} />
            <Sidebar
                sidebar={sidebar}
                setSidebar={setSidebar}
            />

            <GoBack
                title="Clientes e Fornecedores"
            />

            <div className={styles.tables}>
                {customer ?
                    (
                        <>
                            <CustomersTable
                                customers={[customer]}
                                hide={true}
                            />

                            <CustomerAddressesTable
                                customerAddresses={customerAddresses}
                                hide={true}
                            />
                        </>
                    ) : ''
                }
            </div>

            <div className={styles.form}>
                {customer ?
                    <EditCustomerForm
                        customer={customer}
                    /> : ''
                }
            </div>

            <RemoveButton
                title="Cliente"
                handlerRemove={handlerRemoveCustomer}
            />

        </div>
    );
}