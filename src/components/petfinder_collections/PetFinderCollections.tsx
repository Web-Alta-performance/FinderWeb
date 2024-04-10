import '../../css/main.css';
import style from './petfindercollections.module.css';
import { useState } from 'react';

import { UserCollection } from './userCollection';
import { PetsCollection } from './petsCollection';

const PetFinderCollections = () => {

    const classes = `text center size-125 bold navlink`;
    const [tab, setTab] = useState('users');

    return (
        <div className='flex center column'>
            <div className='flex center' style={{ gap: 50 }}>
                <p className={`${classes} ${(tab === 'users' && style.active)}`}
                    onClick={() => setTab('users')}
                    style={{ cursor: 'pointer' }}>
                    users
                </p>
                <p className={`${classes} ${(tab === 'pets' && style.active)}`}
                    onClick={() => setTab('pets')}
                    style={{ cursor: 'pointer' }}>
                    pets
                </p>
            </div>
            {tab === 'users' && <UserCollection />}
            {tab === 'pets' && <PetsCollection />}
        </div>
    )
}

export { PetFinderCollections };