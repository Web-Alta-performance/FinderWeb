/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useState } from "react";
import { ApiURLContext } from "../pages/Home";
import { LoadingIcon } from "../loading-icon/LoadingIcon";

interface User {
    id: string;
    phone_number: string,
    created_at: string;
    name: string;
    email: string;
    password_hash: string;
}

const UserTable = ({ users }: { users: User[] }) => {
    // TODO: add a CREATE, UPDATE, and DELETE buttons.
    if (users.length === 0) {
        return <p className='text center size-115'>Nenhum usuário encontrado.</p>;
    }

    const columns = (
        <div className='flex-1 center' style={{ marginTop: 20 }}>
            {users.map((user, i) => {
                const GAP = 10;
                const KEY = i + 1;
                return (
                    <div
                        key={KEY}
                        className='flex-1 flex-start column'
                        style={{
                            backgroundColor: 'var(--dark-background)',
                            paddingInline: 14,
                            paddingBlock: 10,
                            marginInline: 20,
                            borderRadius: 15,
                        }}
                    >
                        <div>
                            <p key={KEY * 2} className='text' style={{ margin: GAP }}>
                                <span className='text bold'>ID: </span>{user.id}
                            </p>
                            <p key={KEY * 3} className='text' style={{ margin: GAP }}>
                                <span className='text bold'>Nome: </span>{user.name}
                            </p>
                            <p key={KEY * 4} className='text' style={{ margin: GAP }}>
                                <span className='text bold'>E-mail: </span>{user.email}
                            </p>
                            <p key={KEY * 5} className='text' style={{ margin: GAP }}>
                                <span className='text bold'>Telefone: </span>{user.phone_number ?? 'Indisponível'}
                            </p>
                            <p key={KEY * 6} className='text' style={{ margin: GAP }}>
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
        const response = await axios.get('/users', { baseURL });
        setUsers(response.data.users);
        setLoading(false);
    }

    const updateButton =
        <button
            className='text center bold size-115 button'
            style={{ padding: '10px 20px', borderRadius: 12, marginTop: 20 }}
            onClick={fetch}>
            Atualizar
        </button >;

    if (loading) {
        return (
            <div className='flex center column' style={{ gap: 10 }}>
                {updateButton}
                <LoadingIcon showText />
            </div>
        )
    }

    return (
        <div className='flex center column'>
            <UserTable users={users} />
            {updateButton}
        </div>
    )
};

export { UserCollection };