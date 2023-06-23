import React from "react";
import '../Button/Button.css';
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "../../../Assets/Icons/google.svg";
import FacebookIcon from "../../../Assets/Icons/facebook.svg";

const Button = ({ text, bgwhite, applieIcon, googleIcon, facebookIcon, didPressButton }) => {
  return (
    <div
      
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        color: bgwhite ? "#07074E" : "white",
        backgroundColor: bgwhite ? "#fff" : "#7665cf",
        width: "80%",
        height: "40px",
        borderRadius: "10px",
        // fontFamily: "MADE Outer Sans Outline sans-serif",
        fontSize: "15px",
        cursor: "pointer",
        boxShadow: "2px 2px 2px 2px grey",
        alignSelf: 'center'
      }}
      className="globalButtonClassName"
      onClick={() => didPressButton()}
    >
      {applieIcon && (
        <AppleIcon style={{ color: "white", marginRight: "10px" }} />
      )}
      {googleIcon && (
        <div
          style={{
            height: "25px",
            width: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "2px",
          }}
        >
          <img
            src={GoogleIcon}
            alt=""
            style={{ height: "100%", width: "100%" }}
          />{" "}
        </div>
      )}
      {facebookIcon && (
        <div
          style={{
            height: "25px",
            width: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "2px",
          }}
        >
          {" "}
          <img
            src={FacebookIcon}
            alt=""
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      )}
      {text}
    </div>
  );
};

export default Button;
