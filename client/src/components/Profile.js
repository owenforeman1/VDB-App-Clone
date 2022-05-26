import { useEffect } from 'react';



const Profile = () => {

    useEffect( () => {
        fetch(test)
        .then(res => res.json())
        .then(data => {
          console.log(data);
        });
    
      }, []);


    return (

        <>

            <header>
                YOUR PROFILE
            </header>
            <div className='profile-container' >
                <div className="game-list-container">
                    <div>

                    </div>
                </div>
            </div>
        
        </>

    )

}

export default Profile;