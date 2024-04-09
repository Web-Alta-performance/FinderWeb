import '../../css/main.css';
import { useState } from 'react';
import { InsertApiURL } from '../insertApiURL';

const Home = () => {

    const [apiURL, setApiURL] = useState('');

    const isApiURLSet = () => !!apiURL

    const insertApiPrompt = isApiURLSet()
        ? <p>Sim: {apiURL}</p>
        : <InsertApiURL setFunc={setApiURL} />

    return (
        <>
            <h1 className="text center title">Página de administração PetFinder</h1>
            {insertApiPrompt}
        </>
    )
};

export { Home };