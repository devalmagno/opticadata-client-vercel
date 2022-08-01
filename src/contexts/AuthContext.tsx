import Router from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";

import { api } from "../services/api";
import Loading from "../components/Loading";

type AuxPropsType = {
    children: ReactNode;
}

type SignInDataType = {
    cpf: string;
    password: string;
}

type UserType = {
    user_id: string;
    user_col_id: string;
    user_is_admin: string;
    created_at: string;
    updated_at: string;
}

type Collaborator = {
    col_id: string;
    col_name: string;
    col_cpf: string;
    col_function: string;
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: UserType | null;
    collaborator: Collaborator | null;
    signIn: (data: SignInDataType) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

const AuthProvider = ({ children }: AuxPropsType) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [collaborator, setCollaborator] = useState<Collaborator | null>(null);

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'opdauth.token': token } = parseCookies();

        if (token) {
            api.post('/token', {
                token,
            }).then(res => {
                setUser(res.data.user);
                setCollaborator(res.data.collaborator);
            })
        }
    }, []);

    const signIn = async ({ cpf, password }: SignInDataType) => {
        const { acessToken: token, user, collaborator } = await api.post('/users/login', {
            cpf,
            password
        }).then(res => {
            return res.data;
        });

        if (token) {
            setCookie(undefined, 'opdauth.token', token, {
                maxAge: 60 * 60 * 1.5, // 1 hour 30 minutes
            });

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser(user);
            setCollaborator(collaborator);

            Router.push('/users');
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, collaborator, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;