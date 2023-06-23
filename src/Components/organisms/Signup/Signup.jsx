import React, { useEffect, useState } from "react";
import "../Signup/Signup.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import SapidLogo from "../../../Assets/Images/sapidtransparent.png";
import InputFieldOutlined from "../../Atoms/InputField/InputFieldOutlined";
import Button from "../../Atoms/Button/Button";
import { auth, db } from "../../Services/Firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { onValue, ref, set, update } from "firebase/database";
import path from "../../Services/Firebase/path";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import AlertMessage from '../../Atoms/Dialog/AlertMessage';


const Signup = () => {
  const { t } = useTranslation();
  // const alert = useAlert();
  const navigate = useNavigate();
  const [firebaseUserData, setFirebaseUserData] = useState();
  const [showValidationAlert, setShowValidationAlert] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationAlert, setValidationAlert] = useState({
    title: '',
    text: '',
    errorType: ''
  })
  const [userData, setUserData] = useState({
    full_name: "",
    user_name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const dbRef = ref(db, "User");
    let users = [];
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        users.push(childSnapshot.val());
      });
      // console.log(users, "all users");
      setFirebaseUserData(users);
    });
    checkingExistingUserNameFromRealTimeDB(users, userData.user_name);
  }, []);

  const checkingExistingUserNameFromRealTimeDB = (users, userName) => {
    if (users.length > 0) {
      const exists = users.some((item) => item.username == userName);
      if (exists) {
        return true;
      } else {
        return false;
      }
    }
  };

  const validationShowAlertMessage = (showAlert, errorType, title, text) => {
    setValidationAlert({
      ...validationAlert,
      title: title,
      text: text,
      errorType: errorType
    })
    setShowValidationAlert(showAlert)
  }

  const handleSignupWithEmail = () => {
    try {
      if (
        userData?.full_name != "" &&
        userData?.user_name != "" &&
        userData?.email != "" &&
        userData?.password != "" &&
        confirmPassword != ''
      ) {
        if (confirmPassword != userData?.password) {
          toast.error(t("cofirmpassword"))
        }
        else {
          const emailRegEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
          if (emailRegEx.test(userData?.email)) {
            const result = checkingExistingUserNameFromRealTimeDB(
              firebaseUserData,
              userData.user_name
            );
            if (!result) {
              createUserWithEmailAndPassword(
                auth,
                userData.email,
                userData.password
              )
                .then((response) => {
                  localStorage.setItem("provider", 'emailpass')
                  console.log(
                    response,
                    "this is the console of sign up with email"
                  );
                  set(ref(db, "User/" + response?.user?.uid), {
                    address: "",
                    bio: "",
                    directMode: false,
                    dob: "",
                    email: response?.user?.email,
                    fcmToken: "",
                    gender: "",
                    id: response?.user?.uid,
                    // links: '',
                    language: 'es',
                    isDeleted: false,
                    logoUrl: "",
                    name: userData?.full_name,
                    phone: "",
                    platform: "web",
                    profileOn: 1,
                    profileUrl: "",
                    tagUid: "",
                    timestamp: "",
                    username: userData?.user_name,
                  });
                  localStorage.setItem("email", userData?.email)
                  localStorage.setItem("pass", userData?.password)
                  let lange = localStorage.getItem("lang")
                  if (!lange) {
                    localStorage.setItem("lang", "sp")
                  }
                  toast.success(t("signupsuccess"))
                  const user = response.user;
                  updateProfile(user, {
                    displayName: userData.full_name,
                  });
                  setTimeout(() => {
                    navigate("/home");
                  }, 3000);
                })
                .catch((error) => {
                  // console.log(error.message)
                  // toast(error.message);
                  if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                    toast.warn(t("emailAlreadyExists"))
                  }
                  else if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                    toast.error(t("passwordInstruc"))
                  }
                });
            } else {
              toast.warn(t("useralreadyexist"));
            }
          } else {
            validationShowAlertMessage(true, 'alert', t("Alert"), t("validEmailError"))
          }
        }
      } else {
        validationShowAlertMessage(true, 'alert', t("Error!"), t("makeSureFieldsFilled"))
      }

    } catch (error) {
      console.log(error.message)
      toast.error(error.message);
    }
  };

  const handleTextFieldOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="Signup_main_div">
      <div className="Signup_sub_main_div">
        <div className="signup_back_icon_div">
          <ArrowBackIosNewIcon
            style={{ fontSize: "1.5rem" }}
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="signup_image_container">
          <img src={SapidLogo} alt="" className="signup_sapid_logo_css" />
        </div>
        <div className="create_your_account_text_div">{t("createAccount")}</div>
        <div className="signup_input_fields_main_div">
          <div className="signup_one_input_field_div">
            <InputFieldOutlined
              onChangeTextField={(e) => handleTextFieldOnChange(e)}
              name="full_name"
              value={userData.full_name}
              textType={"text"}
              placeholderText={t("fullNamePlaceholder")}
              className="signupAllInputFields_css"
            />
          </div>
          <div className="signup_one_input_field_div">
            <InputFieldOutlined
              onChangeTextField={(e) => handleTextFieldOnChange(e)}
              name="user_name"
              value={userData.user_name}
              textType={"text"}
              placeholderText={t("userName")}
              className="signupAllInputFields_css"
            />
          </div>
          <div className="signup_one_input_field_div">
            <InputFieldOutlined
              textType={"text"}
              placeholderText={t("Email")}
              onChangeTextField={(e) => handleTextFieldOnChange(e)}
              name="email"
              value={userData.email}
              className="signupAllInputFields_css"
            />
          </div>
          <div className="signup_one_input_field_div">
            <InputFieldOutlined
              textType={"password"}
              placeholderText={t("Password")}
              onChangeTextField={(e) => handleTextFieldOnChange(e)}
              name="password"
              value={userData.password}
              className="signupAllInputFields_css"
            />

          </div>

          <div className="signup_one_input_field_div">
            <InputFieldOutlined
              textType={"password"}
              placeholderText={t("Confirm Password")}
              onChangeTextField={(e) => setConfirmPassword(e.target.value)}
              name=" Confirm-password"
              value={confirmPassword}
              className="signupAllInputFields_css"
            />

          </div>
          <div className="important_note_div">
            <p className="important_note_css">
              {/* {t("userNameNotChange")}<br />
              {t("passwordInstruc")} */}
              {t("userNameNotChange")} <br />
              {t("emailInstructions")}<br />
              {t("passwordInstructions")}
            </p>
          </div>
        </div>
        <div className="continue_btn_div">
          <Button
            didPressButton={() => handleSignupWithEmail()}
            text={t("createAccount")}
          />
          <ToastContainer position="top-center" autoClose={1000} />
        </div>
        <div className="terms_condition_div_main">
          <text>
            {t("agreeText")} <br />
            <span className="terms_condition_css">{t('privacyPolicy')}</span>
            {/* {t("y")} */}
            {" "}
            <span className="terms_condition_css">{t("termsUse")}</span>
          </text>
        </div>
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
    </div>
  );
};

export default Signup;

// fetch("https://sapid-e3df5-default-rtdb.firebaseio.com/User.json", {
// method: "POST",
// headers: {
//     "Content-Type":"application/json",
//     },
// body: JSON.stringify(
//     {
//         email: userData.email,
//         name: userData.name,
//         username: userData.name
//     }
// )
// }).then((response) => {
//     console.log(response, 'console of response')
// }).catch((error) => {
//     console.log(error, 'console of error')
// })
// alert.show("Successfully Signed up")
// const user = response.user;
// updateProfile(user, {
//     displayName: userData.full_name
// })
