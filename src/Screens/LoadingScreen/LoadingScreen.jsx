import React from 'react'
import './loadingscreen.css'
import { BeatLoader } from 'react-spinners';
import sapidlogo from './sapidimg/sapidtransparent.png';

const LoadingScreen = () => {
    return (
        <div className='loading_screen'>
            <div className='loading-sub-screen'>
                <div className='image_container'>
                    <img src={sapidlogo} alt="Sapid" className='sapid-logo' />
                </div>
                <BeatLoader color='#7665cf' />

            </div>
        </div>
    )
}

export default LoadingScreen