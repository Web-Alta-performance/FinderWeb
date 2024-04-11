import axios, { AxiosError } from "axios";
import { forwardRef, useContext, useRef, useState } from "react";
import { LoadingIcon } from "../loading-icon/LoadingIcon";
import { ApiURLContext } from "../pages/Home";

interface UserCreateFields {
    name: string,
    email: string,
    password: string,
}

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

const UserCreateInput = ({ callback }: { callback: () => Promise<void> }) => {

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

export { UserCreateInput };