import { Navigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_GAMELIST, QUERY_GAMELISTS, } from '../utils/queries';
import AuthService from '../utils/auth';



const Profile = () => {

    let { username: userParam } = useParams();

    const { loading, data } = useQuery(QUERY_USER, {
      variables: { username: userParam },
    });

    const user = data?.me || data?.user || {};

    const { loading : listloading, data : listdata } = useQuery(QUERY_GAMELISTS, {
        variables: { userId: user._id}
    })

    const gamelists = listdata?.GameLists || [];

    // navigate to personal profile page if username is yours
    if (AuthService.loggedIn() && AuthService.getProfile().data.username === userParam) {
      return <Navigate to="/me" />;
    }
  
    if (loading) {
      return <div>Loading...</div>;
    }
    console.log(user)
    if (!user?.username) {
      return (
        <h4>
          You need to be logged in to see this. Use the navigation links above to
          sign up or log in!
        </h4>
      );
    }

    if(listloading) {
        return <div>Loading...</div>;
    }

    console.log(gamelists);
    return (

        <>

            <header>
                YOUR PROFILE
            </header>
            <div className='profile-container' >
                <div className="game-list-container">
                    <div>
                        {!gamelists ? <h2>No gamelists found</h2> : (gamelists.map(list => (<p>{list}</p>)))}
                    </div>
                </div>
            </div>
        
        </>

    )

}

export default Profile;