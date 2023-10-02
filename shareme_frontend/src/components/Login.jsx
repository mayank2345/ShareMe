import React from 'react'
import { GoogleLogin, googleLogout, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import jwt_decode from 'jwt-decode'
import { client } from '../utils/client';

const user = false;
const Login = () => {

    const navigate = useNavigate();
    const createOrGetUser = async (response) => {
        localStorage.setItem('user', JSON.stringify(jwt_decode(response.credential)))
        const {name, picture, sub} = jwt_decode(response.credential);
        
        
        const doc = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture,
        };
        client.createIfNotExists(doc)
        .then(() => {
            navigate('/', { replace: true})
    
        });
        
    };
    

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
        <div className='relative w-full h-full'>
            <video 
            src={shareVideo}
            type= "video/mp4"
            loop
            controls = {false}
            muted
            autoPlay
            className='w-full h-full object-cover'
            />
            <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                <div className='p-5'>
                    <img src={logo} width= "130px" alt="logo"></img>
                </div>
                <div className='shadow-2xl'>
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN} >
                        
                        <div>
                            {user ? (
                                <div>Logged In</div>
                            ) : (
                                <GoogleLogin
                                    onSuccess={ (response) => {
                                        createOrGetUser(response);
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />
                            )}
                        </div>
                    </GoogleOAuthProvider>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
