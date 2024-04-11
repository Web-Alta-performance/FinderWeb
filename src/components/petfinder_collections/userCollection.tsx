/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ApiURLContext } from "../pages/Home";
import { LoadingIcon } from "../loading-icon/LoadingIcon";
import { UserCreateInput } from "./UserCreateInput";

interface User {
    id: string;
    created_at: string;
    name: string;
    email: string;
    password_hash: string;
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
            <UserCreateInput callback={fetch} />
            {updateButton}
        </div>
    )
};

export { UserCollection };