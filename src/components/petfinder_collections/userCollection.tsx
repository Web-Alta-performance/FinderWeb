/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useState } from "react";
import { ApiURLContext } from "../pages/Home";
import { LoadingIcon } from "../loading-icon/LoadingIcon";

interface User {
    name: string;
    email: string;
    password_hash: string;
}

const UserCollection = () => {

    const baseURL = useContext(ApiURLContext);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const fetch = async () => {
        setLoading(true);
        const response = await axios.get('/users', { baseURL });
        console.log(response.data.users);
        setUsers(response.data.users)
    }

    const updateButton =
        <button
            className='text center bold size-115 button'
            style={{ padding: '10px 20px', borderRadius: 12, marginBlock: 20 }}
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
        <div>
            {updateButton}
            {users.map((user, i) => (
                <div key={i}>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ))}
        </div>
    )
};

export { UserCollection };