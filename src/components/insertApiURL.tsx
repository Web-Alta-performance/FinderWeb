import axios from 'axios';
import '../css/main.css';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { LoadingIcon } from './loading-icon/LoadingIcon';

interface insertApiLinkProps {
    setFunc: Dispatch<SetStateAction<string>>
}

const InsertApiURL = ({ setFunc }: insertApiLinkProps) => {

    const checkIfApiExists = async (baseURL: string) => {

        setLoading(true);
        return await axios.get(`/`, { baseURL })
            .then((response) => {
                if (response.status === 200) {
                    setLoading(false);
                    return true
                }
                return false
            })
            .catch(() => {
                setLoading(false);
                return false;
            });
    }

    const [showWarning, setShowWarning] = useState(false);
    const [apiExists, setApiExists] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = async () => {
        if (inputRef.current) {
            const link = inputRef.current.value || inputRef.current.placeholder;
            const exists = await checkIfApiExists(link)
            setApiExists(exists);
            setShowWarning(!exists);
        }
    };

    useEffect(() => {
        if (apiExists && inputRef.current) {
            const link = inputRef.current.value || inputRef.current.placeholder;
            setFunc(link);
        }
    }, [apiExists, setFunc])

    const apiDoesntExistWarning = showWarning
        ? <p className='text center warning bold size-115 error' style={{ margin: 0, }}>
            Link inválido. Verifique se o link está correto e tente novamente.
        </p>
        : <></>

    const button = loading
        ? <LoadingIcon />
        : <button
            className='text center bold size-115 button'
            style={{ paddingInline: 20, paddingBlock: 10, borderRadius: 10, marginTop: 10, }}
            onClick={handleClick}>
            Confirmar
        </button>

    return (
        <div className='flex center column' style={{ gap: 5 }}>
            <p className='text center bold size-125'>Insira a URL da api:</p>
            {apiDoesntExistWarning}
            <input className={`flex center input ${showWarning ? 'invalid' : ''}`} placeholder='http://localhost:3000' style={{ padding: 10, borderRadius: 7, }} ref={inputRef} />
            {button}
        </div >
    );
};

export { InsertApiURL };