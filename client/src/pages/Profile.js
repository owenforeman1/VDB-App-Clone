import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import GameListForm from '../components/GameListForm'

import Auth from '../utils/auth';

const Profile = () => {

    return (
        <main>
            <div>
                <GameListForm />
            </div>
        </main>
    );
};

export default Profile;