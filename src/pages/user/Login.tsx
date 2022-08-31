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
import "./login.css";
import LoginIcons from "./loginIcons";

const Login: React.FC = () => {
  return (
    <>
      <IonCol size="12" className="sign-in">
        SIGN IN
      </IonCol>
      <IonRow>
        <IonCol>
          <IonItem className="input-border">
            <IonIcon
              className="mr-5"
              slot="start"
              src="../assets/email.svg"
            ></IonIcon>
            <IonInput
              className="input-text"
              value={""}
              placeholder="Email Address"
            ></IonInput>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem className="input-border">
            <IonIcon
              className="mr-5"
              slot="start"
              src="../assets/lock.svg"
            ></IonIcon>
            <IonInput
              className="input-text"
              value={""}
              placeholder="Password"
              type="password"
            ></IonInput>
            <IonIcon slot="end" src="../assets/eye.svg"></IonIcon>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow className="remember-forgot">
        <div>
          <input type="checkbox" name="remember" />
          <label htmlFor="remember">&nbsp;&nbsp;Remember me</label>
        </div>
        <div>
          <a href="">Forgot Password</a>
        </div>
      </IonRow>
      <IonCol className="m-auto mt-67" size="11">
        <IonButton className="sign-btn" size="default" expand="block">
          Sign In
        </IonButton>
      </IonCol>
      <IonCol size="12" className="sign-with">
        Or sign in with
      </IonCol>
      <IonRow className="text-center">
        <LoginIcons />
      </IonRow>
      <IonRow className="text-center">
        <IonCol className="center">
          <span className="light-text">Don't have an account? </span>
          <a href="/createuser">
            <span className="dark-text">Sign Up</span>
          </a>
        </IonCol>
      </IonRow>
    </>
  );
};

export default Login;
