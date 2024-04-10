import '../../css/main.css';
import { createContext, useState } from 'react';
import { InsertApiURL } from '../insertApiURL';
import { PetFinderCollections } from '../petfinder_collections/PetFinderCollections';

export const ApiURLContext = createContext<string>('');

const Home = () => {

    const [apiURL, setApiURL] = useState('');

    const isApiURLSet = () => !!apiURL

    const insertApiPrompt = isApiURLSet()
        ? <ApiURLContext.Provider value={apiURL}>
            <PetFinderCollections />
        </ApiURLContext.Provider>

        : <InsertApiURL setFunc={setApiURL} />

    return (
        <>
            <h1 className="text center title">Página de administração PetFinder</h1>
            {insertApiPrompt}
        </>
    )
};

export { Home };