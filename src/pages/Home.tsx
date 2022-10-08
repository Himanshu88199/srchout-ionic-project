import { Preferences } from "@capacitor/preferences";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonRow,
  useIonViewWillEnter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import Footer from "../components/Footer";
import "./Home.css";
import Login from "./user/Login";

interface ScanNewProps {
  isFromHome: any;
}

const Home: React.FC<ScanNewProps> = ({ isFromHome }) => {
  const [token, setToken] = useState<any>(null);
  const history = useHistory();
  const fun = async () => {
    const creds = await Preferences.get({ key: 'token' });
    setToken(creds.value);
  };

  useIonViewWillEnter(() => {
    fun();
    if (token)
    history.replace('/my/home')
  else
    history.replace('/')
  });
  return (
    <IonPage>
      {token === null ? (
        <IonContent>
          <IonGrid style={{ padding: "0px", paddingBottom: '60px' }}>
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
