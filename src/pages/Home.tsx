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
} from "@ionic/react";
import Footer from "../components/Footer";
import "./Home.css";
import Login from "./user/Login";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid style={{ padding: "0px" }}>
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
    </IonPage>
  );
};

export default Home;
