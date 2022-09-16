import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./loginIcons.css";

const LoginIcons: React.FC = () => {
  return (
    <>
      <IonRow className="center">
        <IonCol>
          <IonButton
            className="round-logo-buttons"
            size="small"
            shape="round"
            fill="outline"
          >
            <IonIcon className="logo-size" src="../assets/google.svg" />
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton
            className="round-logo-buttons"
            size="small"
            shape="round"
            fill="outline"
          >
            <IonIcon className="logo-size" src="../assets/apple.svg" />
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton
            className="round-logo-buttons"
            size="small"
            shape="round"
            fill="outline"
          >
            <IonIcon className="logo-size" src="../assets/facebook.svg" />
          </IonButton>
        </IonCol>
      </IonRow>
    </>
  );
};

export default LoginIcons;
