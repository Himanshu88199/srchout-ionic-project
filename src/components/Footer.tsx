import { IonCol, IonRow, IonText } from "@ionic/react";
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <IonRow className="footer-bars">
      <IonCol className="footer-icons flex">
        <div className="footer-icon flex flex-col ">
          <img className="footer-img" src="../../../assets/home.svg" alt="" />
          <IonText className="white-text">Home</IonText>
        </div>
      </IonCol>
      <IonCol className="footer-icons flex">
        <div className="footer-icon flex flex-col ">
          <img
            className="footer-img"
            src="../../../assets/Calendar.svg"
            alt=""
          />
          <IonText className="white-text">Events</IonText>
        </div>
      </IonCol>
      <IonCol className="footer-icons flex">
        <div className="footer-icon flex flex-col ">
          <img className="footer-img" src="../../../assets/task.svg" alt="" />
          <IonText className="white-text">Tasks</IonText>
        </div>
      </IonCol>
      <IonCol className="footer-icons flex">
        <div className="footer-icon flex flex-col ">
          <img
            className="footer-img"
            src="../../../assets/setting.svg"
            alt=""
          />
          <IonText className="white-text">Settings</IonText>
        </div>
      </IonCol>
    </IonRow>
  );
};

export default Footer;
