import {
  IonAlert,
  IonButton,
  IonCol,
  IonIcon,
  IonInput,
  IonItem,
  IonLoading,
  IonRow,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import Service from "../../services/http";
import "./login.css";
import LoginIcons from "./loginIcons";

const Login: React.FC = () => {
  const [passwordType, setPasswordType] = useState<any>("password");
  const [loginData, setLogindata] = useState<any>({ email: '', password: '' });

  const history = useHistory();

  const [error, setError] = useState(false);
  const [message, setMessage] = useState<string>();
  const [showLoading, setShowLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleLogin = (e: any) => {
    e.preventDefault();
    setShowLoading(true);
    const request = new Service();
    request.post(`users/login`, loginData)
      .then((result: any) => {
        if (result.err) {
          setShowLoading(false);
          setMessage("Invalid user credentials!");
          setError(true);
        } else {
          setShowLoading(false);
          sessionStorage.setItem("token", result.data.jwt_token);
          sessionStorage.setItem("logged_in", "Y");
          history.replace("/my/home");
        }
      });
  };

  return (
    <>
      <IonRow>
        <IonCol>
          <IonAlert
            isOpen={error}
            onDidDismiss={() => setError(false)}
            cssClass="my-custom-class"
            //header={"Wrong Password"}
            message={message}
            buttons={["Dismiss"]}
          />
          <IonLoading
            cssClass="my-custom-class"
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={"Please wait..."}
          />
        </IonCol>
      </IonRow>
      <IonCol size="12" className="sign-in">
        SIGN IN
      </IonCol>
      <form onSubmit={handleLogin} className="formLogin">
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
                value={loginData.email}
                onIonChange={(e) => setLogindata({ ...loginData, email: e.detail.value })}
                type="email"
                required
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
                value={loginData.password}
                onIonChange={(e) => setLogindata({ ...loginData, password: e.detail.value })}
                placeholder="Password"
                type={passwordType}
                required
              ></IonInput>
              <IonIcon slot="end" src="../assets/eye.svg" onClick={() => {
                if (passwordType === "password") {
                  setPasswordType("text");
                } else {
                  setPasswordType("password");
                }
              }}></IonIcon>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow className="remember-forgot">
          <div className="remember">
            <input type="checkbox" name="remember" checked={remember} onChange={(e) => setRemember(!remember)} />
            <label htmlFor="remember">Remember me</label>
          </div>
          <div>
            <a href="">Forgot Password</a>
          </div>
        </IonRow>
        <IonRow>
          <IonCol className="m-auto mt-40" size="11">
            <IonButton type="submit" className="signin-btn" size="default" expand="block">
              Sign In
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow className="text-center">
          <IonCol size="12" className="sign-with">
            Or sign in with
          </IonCol>
        </IonRow>
        <IonRow className="text-center">
          <LoginIcons />
        </IonRow>
      </form>
      <IonRow className="text-center">
        <IonCol size="12" className="center">
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
