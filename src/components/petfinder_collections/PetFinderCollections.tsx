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
                <button className={`${style.button} ${classes} ${(tab === 'users' && style.active)}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setTab('users')}>
                    users
                </button>
                <button className={`${classes} ${style.button} ${(tab === 'pets' && style.active)}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setTab('pets')}>
                    pets
                </button>
            </div>
            {tab === 'users' && <UserCollection />}
            {tab === 'pets' && <PetsCollection />}
        </div>
    )
}

export { PetFinderCollections };