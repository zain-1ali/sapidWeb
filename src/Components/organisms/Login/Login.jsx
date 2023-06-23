import React, { useEffect, useState } from "react";
import "../Login/Login.css";
import SapidLogo from "../../../Assets/Images/sapidtransparent.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import InputFieldOutlined from "../../Atoms/InputField/InputFieldOutlined";
import Button from "../../Atoms/Button/Button";
import { auth, provider } from "../../Services/Firebase/config";
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux'
import { isUserLogin, loginUserObj } from "../../../Redux/Login/actions";
import { updateProfile } from 'firebase/auth';
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import AlertMessage from '../../Atoms/Dialog/AlertMessage';
import { getDatabase, ref, child, get, update } from "firebase/database";
import { loginUserInfoSelector } from "../../../Redux/Login/selectors";


const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showValidationAlert, setShowValidationAlert] = useState(false)
  const [validationAlert, setValidationAlert] = useState({
    title: '',
    text: '',
    errorType: ''
  })
  const [userData, setUserData] = useState(
    {
      email: "",
      password: ""
    }
  )
  const loginUserData = useSelector(loginUserInfoSelector);

  const handleTextFieldOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const signInPressFunc = () => {
    if (userData?.email != "" && userData?.password != "") {
      const emailRegEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
      if (emailRegEx.test(userData?.email)) {
        signInWithEmailAndPassword(auth, userData?.email, userData?.password).then((response) => {
          console.log(response, 'sing in user response')
          localStorage.setItem("provider", 'emailpass')
          if (response?.user?.uid) {
            const user = response?.user;
            updateProfile(user, {
              displayName: userData?.full_name
            })
            dispatch(isUserLogin(response?.user))
            toast.success(t("signinwithEmail"))
            localStorage.setItem("email", userData?.email)
            localStorage.setItem("pass", userData?.password)
            // localStorage.setItem("usid", response?.user?.uid)
            let lange = localStorage.getItem("lang")
            if (!lange) {
              localStorage.setItem("lang", "sp")
            }
            setTimeout(() => {
              navigate("/home")
            }, 1000);
          }
        }).catch((error) => {
          // toast(t("notValidEmail"));
          if (error.message === 'Firebase: Error (auth/wrong-password).') {
            toast.error(t("Wrongpassword"))
          }
          else if (error.message === 'Firebase: Error (auth/user-not-found).') {
            toast.error(t("Usernotfound"))
          }
          console.log(error.message)

        })
      } else {
        validationShowAlertMessage(true, 'alert', t("Alert"), t("validEmailError"))
      }
    } else {
      validationShowAlertMessage(true, 'alert', t("Error!"), t("makeSureFieldsFilled"))
    }

    let lange = localStorage.getItem("lang")
    if (!lange) {
      localStorage.setItem("lang", "sp")
    }

  }
  const validationShowAlertMessage = (showAlert, errorType, title, text) => {
    setValidationAlert({
      ...validationAlert,
      title: title,
      text: text,
      errorType: errorType
    })
    setShowValidationAlert(showAlert)
  }

  useEffect(() => {
    if (loginUserData?.id) {
      // navigate("/home")
    }
  }, [])


  return (
    <div className="Login_screen_main_div">
      <div className="Login_screen_sub_main">
        <div className="back_icon_div">
          <ArrowBackIosNewIcon
            style={{ fontSize: "1.5rem" }}
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="Login_image_container">
          <img src={SapidLogo} alt="" className="Login_sapid_logo_css" />
        </div>
        <div className="welcome_back_signin_div">
          {t("welcomeBaack")} <br />
          {t("signInToYourAccount")}
        </div>
        <div className="both_input_field_main_div">
          <div className="single_input_field_div">
            <InputFieldOutlined
              name="email"
              placeholderText={t("Email")}
              textType={"text"}
              onChangeTextField={(e) => handleTextFieldOnChange(e)}
              value={userData?.email}
            />
          </div>
          <div className="single_input_field_div">
            <InputFieldOutlined
              name={"password"}
              placeholderText={t("Password")}
              textType={"password"}
              onChangeTextField={(e) => handleTextFieldOnChange(e)}
              value={userData?.password}
            />
          </div>
        </div>
        <div className="forgot_password_div">
          <text onClick={() => navigate("/password/forgot")}>
            {t("ForgetPassword")}
          </text>
        </div>
        <div className="continue_btn_div">
          <Button
            text={t("login")}
            didPressButton={signInPressFunc}
          />
          <ToastContainer position="top-center" autoClose={1000} />
          <AlertMessage
            showAlert={showValidationAlert}
            hideAlert={() => setShowValidationAlert(false)}
            confirmPressed={() => setShowValidationAlert(false)}
            title={validationAlert.title}
            text={validationAlert.text}
            errorType={validationAlert.errorType}
            showCancelButton={false}
            showConfirmButton={true}
            confirmButtonText={t("Close")}
          />
        </div>
        <div className="dont_have_account_div">
          <text>
            {t("dontHaveAccount")}
            <text
              className="Sign_up_text_css"
              onClick={() => navigate("/signup")}
            >
              {t("accountSignUp")}
            </text>
          </text>
        </div>
      </div>
    </div>
  );
};

export default Login;
