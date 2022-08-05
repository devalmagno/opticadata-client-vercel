import { useRouter } from "next/router";
import { FormEvent, KeyboardEvent, useContext, useState } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi";
import { GiStreetLight } from "react-icons/gi";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";

import { FormButton } from "../FormButton";

import { Customers } from "../../pages/customers";

import styles from "./styles.module.scss";
import { MdLocationCity, MdLocationPin } from "react-icons/md";

type Props = {
    customer: Customers;
};

export const EditCustomerForm = ({ customer }: Props) => {
    const { user } = useContext(AuthContext);

    const [name, setName] = useState(customer.cus_name);
    const [phone, setPhone] = useState(customer.cus_phone);
    const [cpf, setCPF] = useState(customer.cus_cpf);

    const [createAddress, setCreateAddress] = useState(false);

    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [desc, setDesc] = useState("");

    const router = useRouter();

    const handleCPF = (e: KeyboardEvent<HTMLInputElement>) => {
        const regex = /[0-9]|\./;

        if (e.key == 'Backspace') return;
        if (!regex.test(e.key)) e.preventDefault();
        if (cpf.length == 3) setCPF(`${cpf}.`);
        if (cpf.length == 7) setCPF(`${cpf}.`);
        if (cpf.length == 11) setCPF(`${cpf}-`);
    }

    const handlePhoneMask = (e: KeyboardEvent<HTMLInputElement>) => {
        const regex = /[0-9]|\./;

        if (e.key == 'Backspace') return;
        if (!regex.test(e.key)) e.preventDefault();
        if (phone.length == 1) setPhone(`(${phone}`);
        if (phone.length == 3) setPhone(`${phone}) `);
        if (phone.length == 10) setPhone(`${phone}-`);
    }

    const handlerCreateAddress = () => {
        api.post('/customeraddresses/create', {
            cad_cus_id: customer.cus_id,
            cad_city: city,
            cad_desc: desc,
            cad_district: district
        }).then(res => {
            console.log(`Address created for Customer`);
        }).catch(err => {
            console.log(err);
            window.alert("Houve um erro.\n" + err);
            return;
        });

        api.post('/userlogs/create', {
            ulog_user_id: user?.user_id,
            ulog_user_cpf: user?.user_cpf,
            ulog_action: "Adicionou Endereço"
        }).then(res => {
            console.log("Log created.")
        }).catch(err => {
            console.log(err);
        });

    }

    const handlerUpdateCustomer = (e: FormEvent) => {
        e.preventDefault();

        if (createAddress) handlerCreateAddress();

        api.put(`/customers/${customer.cus_id}`, {
            cus_name: name,
            cus_phone: phone,
            cus_cpf: cpf
        }).then(res => {
            window.alert(`Cliente ${res.data.cus_name} alterado com sucesso!`)
        }).catch(err => {
            console.log(err);
            window.alert("Houve um erro.\n" + err);
            return;
        });

        api.post('/userlogs/create', {
            ulog_user_id: user?.user_id,
            ulog_user_cpf: user?.user_cpf,
            ulog_action: "Alterou Cliente"
        }).then(res => {
            console.log("Log created.")
        }).catch(err => {
            console.log(err);
        });

        router.push('/customers');
    }

    return (
        <div className={styles.container}>
            <form onSubmit={e => handlerUpdateCustomer(e)} >
                <div className={styles.row}>
                    <h4>Cliente</h4>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            name=""
                            id=""
                            value={name}
                            onChange={e => setName(e.target.value)}
                            maxLength={26}
                            placeholder="Nome"
                        />
                        <div className={styles.input_icon}>
                            <FaUser className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            value={cpf}
                            onChange={(e) => setCPF(e.target.value)}
                            onKeyDown={(e) => handleCPF(e)}
                            name=""
                            id=""
                            maxLength={14}
                            placeholder="CPF"
                        />
                        <div className={styles.input_icon}>
                            <HiIdentification className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            type="text"
                            name=""
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            onKeyDown={(e) => handlePhoneMask(e)}
                            id=""
                            maxLength={15}
                            placeholder="Telefone"
                        />
                        <div className={styles.input_icon}>
                            <FaPhoneAlt className={`${styles.fa} ${styles.fa_user}`} />
                        </div>
                    </div>
                </div>

                <div className={styles.row}>
                    <h4>Endereço</h4>

                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <input
                            id="address"
                            type="checkbox"
                            onClick={() => setCreateAddress(!createAddress)}
                            name=""
                        />
                        <label htmlFor="address">Adicionar Endereço</label>
                    </div>

                    {createAddress ?
                        (
                            <>
                                <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={city}
                                        onChange={e => setCity(e.target.value)}
                                        maxLength={40}
                                        placeholder="Cidade"
                                        required
                                    />
                                    <div className={styles.input_icon}>
                                        <MdLocationCity className={`${styles.fa} ${styles.fa_user}`} />
                                    </div>
                                </div>

                                <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={district}
                                        onChange={e => setDistrict(e.target.value)}
                                        maxLength={26}
                                        placeholder="Bairro"
                                        required
                                    />
                                    <div className={styles.input_icon}>
                                        <MdLocationPin className={`${styles.fa} ${styles.fa_user}`} />
                                    </div>
                                </div>

                                <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={desc}
                                        onChange={e => setDesc(e.target.value)}
                                        maxLength={40}
                                        placeholder="Rua, Número"
                                        required
                                    />
                                    <div className={styles.input_icon}>
                                        <GiStreetLight className={`${styles.fa} ${styles.fa_user}`} />
                                    </div>
                                </div>
                            </>
                        ) : ''
                    }


                </div>
                <div className={styles.row}>
                    <h4></h4>
                    <div className={`${styles.input_group} ${styles.input_group_icon}`}>
                        <FormButton
                            title="Alterar"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}