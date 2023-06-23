import React from 'react';
import "../Slide/Slide.css";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import { Dialog, TextField } from "@mui/material";
import SapidLogo from '../../../Assets/Images/sapidtransparent.png';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; import { useTranslation } from "react-i18next";


const ChangeEmailSlider = ({ showSlide, hideSlide, submit, changeEmailTextOnChange, newEmail }) => {
  const { t } = useTranslation();
  return (
    // <Dialog open={showSlide} onClose={hideSlide}>
    <Slide
      in={showSlide}
      direction="up"
      timeout={{ appear: 500, enter: 500, exit: 500 }}
    // style={{   backgroundColor: "rgba(255, 255, 255, 0.4)", WebkitBackdropFilter: "blur(5px)", backdropFilter: "blur(5px)" }}
    >
      <div className="change_emailll_slide_main_div">
        <div className="change_password_title_and_icon_main">
          <div onClick={hideSlide}>
            <KeyboardArrowDownIcon
              style={{ position: "absolute", right: "20px", fontSize: "2rem" }}
            />
          </div>
        </div>
        <div className="change_password_Sapid_logo_main">
          <img src={SapidLogo} className="change_password_sapid_logo_css" />
        </div>
        <div className='reset_password_div'>
          {t("enterNewEmail")}
        </div>
        <div className="change_password_text_field">
          <TextField
            label={t("Email")}
            variant="outlined"
            value={newEmail}
            sx={{ boxShadow: 3, backgroundColor: '#fff' }}
            style={{ height: "100%", width: "83%" }}
            size="small"
            className="change_emaill_input_field_css"
            onChange={(e) => changeEmailTextOnChange(e)}
          />
        </div>
        <div className="change_password_save_button">
          <Button
            variant="contained"
            onClick={() => submit(newEmail)}
            style={{
              backgroundColor: "#7665cf",
              borderRadius: "10px",
              width: "85%",
              marginTop: "1rem",
              height: '2.5rem',
              fontFamily: 'MadeOuterSansLight, sans-serif'
            }}
          >
            {t("Confirm")}
          </Button>
        </div>
      </div>
    </Slide>
    // </Dialog>
  )
}

export default ChangeEmailSlider