import Link from "next/link";
import Router from "next/router";
import { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { destroyCookie } from "nookies";
import { MdAddShoppingCart } from "react-icons/md";

import { BiGlassesAlt, BiUser, BiLogOut } from "react-icons/bi";
import { IoGrid, IoBag, IoSettings } from "react-icons/io5";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { AiOutlineDropbox } from "react-icons/ai";

import { AuthContext } from "../../contexts/AuthContext";

import styles from "./styles.module.scss";
import { api } from "../../services/api";
import { useFetch } from "../../hooks/useFetch";
import Loading from "../Loading";
import OrderSidebar from "../OrderSidebar";

type Props = {
    sidebar: boolean;
    setSidebar: Dispatch<SetStateAction<boolean>>;
};

type Settings = {
    id: string;
    optics_name: string;
    optics_unit: string;
    optics_color: string;
    created_at: Date;
    updated_at: Date;
}

type Collaborator = {
    col_id: string;
    col_name: string;
    col_cpf: string;
    col_function: string;
}

const Sidebar = ({ setSidebar, sidebar }: Props) => {
    const { user, collaborator } = useContext(AuthContext);

    const [showOrderSidebar, setShowOrderSidebar] = useState(false);
    const [settings, setSettings] = useState<Settings>()

    useEffect(() => {
        api.get('/settings')
            .then(res => {
                setSettings(res.data);
            });
    }, []);

    const handleLogOut = () => {
        destroyCookie(null, "opdauth.token");

        Router.push("/");
    };

    return (
        <div
            className={
                !sidebar ? `${styles.sidebar} ${styles.active}` : styles.sidebar
            }
        >
            <div className={styles.logo_content}>
                <div className={styles.logo}>
                    <BiGlassesAlt className={styles.logo_icon} />
                    <div className={styles.logo_name}>ÓpticoData</div>
                </div>
                <div
                    className={styles.menu}
                    onClick={() => {
                        setSidebar(!sidebar);
                    }}
                >
                    <div className={styles.burger}></div>
                    <div className={styles.burger}></div>
                    <div className={styles.burger}></div>
                </div>
            </div>

            {settings &&
                (
                    <div className={styles.optics_settings}>
                        <strong>{settings.optics_name}</strong>
                        <span>{settings.optics_unit}</span>
                    </div>
                )}

            <ul className={styles.nav_list}>
                {/* <li>
                    <Link href="/dashboard">
                        <a>
                            <IoGrid className={styles.icons} />
                            <span className={styles.links_name}>Dashboard</span>
                        </a>
                    </Link>
                    <span className={styles.tooltip}>Dashboard</span>
                </li> */}

                {user?.user_is_admin ? (
                    <li>

                        <Link href="/users">
                            <a href="#">
                                <FaUser className={styles.icons} />
                                <span className={styles.links_name}>Usuários</span>
                            </a>
                        </Link>

                        <span className={styles.tooltip}>Usuários</span>
                    </li>
                ) : ''}

                <li>
                    <Link href="/sales">
                        <a>
                            <FaShoppingCart className={styles.icons} />
                            <span className={styles.links_name}>Vendas</span>
                        </a>
                    </Link>
                    <span className={styles.tooltip}>Vendas</span>
                </li>
                <li>
                    <Link href="/stocks">
                        <a>
                            <AiOutlineDropbox className={styles.icons} />
                            <span className={styles.links_name}>Estoque</span>
                        </a>
                    </Link>
                    <span className={styles.tooltip}>Estoque</span>
                </li>
                <li>
                    <Link href="/products">
                        <a>
                            <IoBag className={styles.icons} />
                            <span className={styles.links_name}>
                                Mercadorias e Produtos
                            </span>
                        </a>
                    </Link>
                    <span className={styles.tooltip}>
                        Mercadorias e Produtos
                    </span>
                </li>

                {user?.user_is_admin ? (
                    <li>
                        <Link href="/settings">
                            <a>
                                <IoSettings className={styles.icons} />
                                <span className={styles.links_name}>Configurações</span>
                            </a>
                        </Link>
                        <span className={styles.tooltip}>Configurações</span>
                    </li>
                ) : ''}

                <li>
                    <a onClick={() => { setShowOrderSidebar(!showOrderSidebar) }}>
                        <MdAddShoppingCart className={styles.icons} />
                        <span className={styles.links_name}>Fazer uma venda</span>
                    </a>
                    <span className={styles.tooltip}>Fazer uma venda</span>
                </li>
            </ul>

            <div className={styles.profile_content}>
                <div className={styles.profile}>
                    <div className={styles.profile_details}>
                        <BiUser className={styles.user} />
                        <div className={styles.name_job}>
                            <div className={styles.name}>{collaborator?.col_name}</div>
                            <div className={styles.job}>{collaborator?.col_function}</div>
                        </div>
                    </div>

                    <BiLogOut
                        className={styles.logout}
                        onClick={handleLogOut}
                    />
                    <span className={styles.tooltip}>Sair</span>
                </div>
            </div>

            {showOrderSidebar ?
                <OrderSidebar
                    showSideBar={showOrderSidebar}
                    setShowSideBar={setShowOrderSidebar}
                />
                : ''
            }
        </div>
    );
};

export default Sidebar;
