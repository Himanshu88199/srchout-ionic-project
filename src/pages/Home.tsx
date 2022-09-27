import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import { Redirect } from "react-router";
import Footer from "../components/Footer";
import "./Home.css";
import Login from "./user/Login";

interface ScanNewProps {
  isFromHome: any;
}

const Home: React.FC<ScanNewProps> = ({ isFromHome }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useIonViewWillEnter(() => {
    var status = sessionStorage.getItem('logged_in');
    if (status === "Y") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  return (
    <IonPage>
      {!isLoggedIn ? (
        <IonContent>
          <IonGrid style={{ padding: "0px", paddingBottom:'60px' }}>
            <IonRow className="login-background">
              <IonCol>
                <div className="logo-outer">
                  <IonImg className="logo" src="../assets/logo.png" />
                </div>
              </IonCol>
              <IonCol size="12" className="ion-text-center fs-25">
                EVENTLY
              </IonCol>
              <IonCol size="12" className="empty"></IonCol>
            </IonRow>
            <IonRow className="login-box">
              <Login />
            </IonRow>
          </IonGrid>
          <Footer />
        </IonContent>
      ) : (
        <Redirect to="/my/home" />
      )}
    </IonPage>
  );
};

export default Home;
