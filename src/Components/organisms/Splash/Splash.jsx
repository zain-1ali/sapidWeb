import React, { useEffect } from 'react';
import '../Splash/Splash.css';
// import SapidLogo from "../../../Assets/images/sapidlogosignup1.jpg";
import SapidLogo from '../../../Assets/Images/sapidtransparent.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Splash = () => {
    const { t } = useTranslation();
    const navigate = useNavigate()

    useEffect(() => {
    setTimeout(() => {
            navigate("/signup/with")
        }, 2000);
    }, [])

  return (
    <div className='Splash_screen_main_div'>
        <div className='Splash_screen_sub_main_div'>
            <div className="Splash_image_container">
                <img src={SapidLogo} alt="" className="Splash_sapid_logo_css" />
            </div>
        </div>
    </div>
  )
}

export default Splash