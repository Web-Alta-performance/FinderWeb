/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosError } from "axios";
import React, { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { ApiURLContext } from "../pages/Home";
import { LoadingIcon } from "../loading-icon/LoadingIcon";

interface User {
    id: string;
    created_at: string;
    name: string;
    email: string;
    password_hash: string;
}

interface UserCreateFields {
    name: string,
    email: string,
    password: string,
}

// TODO: add an UPDATE and a DELETE buttons.
const UserList = ({ users }: { users: User[] }) => {
    if (users.length === 0) {
        return <p className='text center size-115'>Nenhum usuário encontrado.</p>;
    }

    const columns = (
        <div className='flex center column gap-15' style={{ marginBlock: 20 }}>
            {users.map((user, i) => {
                const KEY = i + 1;
                return (
                    <div
                        key={KEY}
                        className='flex-1 column'
                        style={{
                            backgroundColor: 'var(--dark-background)',
                            paddingInline: 14,
                            paddingBlock: 10,
                            marginInline: 20,
                            borderRadius: 15,
                        }}
                    >
                        <div>
                            <p key={KEY * 2} className='text gap-10'>
                                <span className='text bold'>ID: </span>{user.id}
                            </p>
                            <p key={KEY * 3} className='text gap-10'>
                                <span className='text bold'>Nome: </span>{user.name}
                            </p>
                            <p key={KEY * 4} className='text gap-10'>
                                <span className='text bold'>E-mail: </span>{user.email}
                            </p>
                            <p key={KEY * 5} className='text gap-10'>
                                <span className='text bold'>Criado em: </span>{new Date(user.created_at).toDateString()}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    )

    return (
        <div>
            {columns}
        </div>
    );
};

const InputField = forwardRef<HTMLInputElement, { children: React.ReactNode }>(({
    children
}, ref) => {
    return (
        <div className='flex space-between gap-20'>
            <p className='text gap-10'>
                <span className='text bold'>
                    {children}
                </span>
            </p>
            <input
                ref={ref}
                className='input flex'
                style={{
                    marginBlock: 7,
                    padding: '5px 7px',
                    backgroundColor: 'var(--background-color)',
                }}
            />
        </div>
    );
});

const CreateUserInput = ({ callback }: { callback: () => Promise<void> }) => {

    const baseURL = useContext(ApiURLContext);

    const [goneWrong, setGoneWrong] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Algo deu errado.');

    const nameField = useRef<HTMLInputElement>(null);
    const emailField = useRef<HTMLInputElement>(null);
    const passwordField = useRef<HTMLInputElement>(null);

    const validateFields = (): UserCreateFields | undefined => {
        if (!nameField.current
            || !emailField.current
            || !passwordField.current
            || !nameField.current.value
            || !emailField.current.value
            || !passwordField.current.value) {
            return;
        }

        const fields: UserCreateFields = {
            name: nameField.current.value,
            email: emailField.current.value,
            password: passwordField.current.value,
        };

        return fields;
    }

    const createUser = async () => {

        setGoneWrong(false);
        setLoading(true);

        const fields = validateFields();
        if (!fields) return;

        await axios.post(`${baseURL}/users`, {
            name: fields.name,
            email: fields.email,
            password: fields.password,
        })
            .then(async () => await callback())
            .catch((error: AxiosError) => {
                console.log(error);
                switch (error.response?.status) {
                    case 404:
                        setErrorMessage('Algo deu errado. O link da API está correto?');
                        break;

                    case 401:
                        setErrorMessage('Já existe um usuário com este e-mail.');
                        break;

                    case 400:
                        setErrorMessage('Veja se os campos estão válidos.');
                        break;
                    default:
                        setErrorMessage('Algo deu errado.');
                }
                setGoneWrong(true);
            });

        setLoading(false);
    }

    return (
        <div className='flex center column' style={{ overflow: 'hidden' }}>
            <p className="text size-125 bold center" style={{ borderBottom: '2px solid var(--element-green)' }}>Criar usuário</p>
            <div
                className='flex flex-start column'
                style={{
                    backgroundColor: 'var(--dark-background)',
                    paddingInline: 20,
                    paddingBlock: 10,
                    marginInline: 20,
                    borderRadius: 15,
                }}
            >
                <div>
                    <InputField ref={nameField}>
                        Nome:
                    </InputField>
                    <InputField ref={emailField}>
                        E-mail:
                    </InputField>
                    <InputField ref={passwordField}>
                        Senha:
                    </InputField>
                </div>
                {goneWrong && <p className='text error center flex wrap'>{errorMessage}</p>}
                {loading
                    ? <LoadingIcon />
                    : <button
                        className='create button bold text'
                        style={{ marginTop: 15, marginBottom: 5 }}
                        onClick={() => createUser()}
                    >
                        Criar
                    </button>}
            </div>
        </div>
    );
};

const UserCollection = () => {

    const baseURL = useContext(ApiURLContext);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const fetch = async () => {
        setLoading(true);
        const response = await axios.get('/users', { baseURL })
            .catch((error) => console.error(error))
            .then((response) => response ?? { data: { users: [] } });
        setUsers(response.data.users);
        setLoading(false);
    }

    useEffect(() => {
        fetch()
    }, []);

    const updateButton =
        <button
            className='text center bold size-115 button'
            style={{ margin: 20 }}
            onClick={fetch}
        >
            Atualizar
        </button>;

    if (loading) {
        return (
            <div className='flex center column gap-10'>
                {updateButton}
                <LoadingIcon showText />
            </div>
        )
    }

    return (
        <div className='flex center column'>
            <UserList users={users} />
            <CreateUserInput callback={fetch} />
            {updateButton}
        </div>
    )
};

export { UserCollection };