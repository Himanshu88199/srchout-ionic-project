import {
  IonAlert,
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
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import Footer from "../../components/Footer";
import React, { useState } from "react";
import "./Createuser.css";
import LoginIcons from "./loginIcons";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import Service from "../../services/http";
import PhoneInput from "react-phone-input-2";

const Createuser: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const service = new Service();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [phoneCode, codes] = useState<any>([]);
  const [agree, setAgree] = useState(false);

  const handleCreate = (userData: any) => {
    delete userData["confirm_password"];

    const request = new Service();
    request.post(`users`, userData)
      .then((result: any) => {
        if (result.err) {
          setMessage(result.err.message);
          setError(true);
        } else {
          reset();
          setSuccess(true);
        }
      });
  };

  const checkboxHandler = () => {
    // if agree === true, it will be set to false
    // if agree === false, it will be set to true
    setAgree(!agree);
    // Don't miss the exclamation mark
  };
  React.useEffect(() => {
    service.get("countrycodes").then((res: any) => {
      codes(res.data);
    });
  }, []);

  return (
    <>
      <IonPage>
        <IonContent>
          <IonRow className="bg-fix">
            <IonCol size="12" className="bg-grey"></IonCol>
            <IonCol size="12" className="white-head"></IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonAlert
                isOpen={error}
                onDidDismiss={() => setError(false)}
                cssClass="my-custom-class"
                header={"Error!"}
                message={message}
                buttons={["Dismiss"]}
              />
              <IonToast
                isOpen={success}
                onDidDismiss={() => {
                  setSuccess(false);
                  history.push("/");
                }}
                message="Your Account has been created"
                duration={200}
                color="dark"
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="center text-grey">CREATE YOUR ACCOUNT</IonCol>
          </IonRow>
          <form onSubmit={handleSubmit(handleCreate)}>
            <IonRow>
              <IonCol>
                <IonItem className="input-border">
                  <IonInput
                    value={""}
                    {...register("fname", { required: true })}
                    placeholder="First Name"
                  ></IonInput>
                </IonItem>
                {errors.fname && (
                  <span className="validation-errors">
                    First name is required
                  </span>
                )}
              </IonCol>
              <IonCol>
                <IonItem className="input-border">
                  <IonInput
                    value={""}
                    {...register("lname", { required: true })}
                    placeholder="Last Name"
                  ></IonInput>
                </IonItem>
                {errors.lname && (
                  <span className="validation-errors">
                    Last name is required
                  </span>
                )}
              </IonCol>
              <IonCol>
                <IonItem className="input-border">
                  <IonSelect
                    {...register("countrycode", {
                      required: true,
                    })}
                  >
                    {phoneCode &&
                      phoneCode.map((i: any, index: number) => (
                        <IonSelectOption key={index} value={i.dial_code}>
                          {i.name}
                        </IonSelectOption>
                      ))}
                  </IonSelect>

                  {/* <IonIcon slot='start' src='../assets/email.svg'></IonIcon> */}
                  <IonInput
                    value={""}
                    type="tel"
                    {...register("phone", {
                      required: true,
                      pattern: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
                    })} ></IonInput>
                </IonItem>
                {errors.countrycode?.type === "required" && (
                  <span className="validation-errors">
                    Country Code number is required
                  </span>
                )}
                {errors.phone?.type === "required" && (
                  <span className="validation-errors">
                    Phone number is required
                  </span>
                )}
                {errors.phone?.type === "pattern" && (
                  <span className="validation-errors">
                    Provide valid phone number
                  </span>
                )}
              </IonCol>
              <IonCol>
                <IonItem className="input-border">
                  <IonInput
                    value={""}
                    type="email"
                    {...register("email", {
                      required: true,
                      pattern: /\S+@\S+\.\S+/,
                    })}
                    placeholder="Email Address"
                  ></IonInput>
                </IonItem>
                {errors.email?.type === "required" && (
                  <span className="validation-errors">Email is required</span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="validation-errors">Provide valid email</span>
                )}
              </IonCol>
              <IonCol>
                <IonItem className="input-border">
                  <IonInput
                    value={""}
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Password"
                  ></IonInput>
                  <IonIcon slot="end" src="../assets/eye.svg"></IonIcon>
                </IonItem>
                {errors.password && (
                  <span className="validation-errors">
                    Password is required
                  </span>
                )}
              </IonCol>
              <IonCol className="m-auto mt-56" size="11">
                <IonButton
                  type="submit"
                  className="sign-btn"
                  size="default"
                  expand="block"
                // disabled={!agree}
                >
                  Sign Up
                </IonButton>

              </IonCol>
              <IonCol size="11" className="remember-forgot">
                <div className="remember">
                  <input type="checkbox" name="remember" />
                  <label htmlFor="remember">
                    I agree with Terms and Conditions
                  </label>
                </div>
              </IonCol>
              <IonCol size="12" className="sign-with">
                or Register with
              </IonCol>
            </IonRow>
            <IonRow className="center">
              <LoginIcons />
            </IonRow>
          </form>
          <IonRow className="login-box">
            <IonCol size="12" className="center">
              <span className="light-text">Already have an account?</span>
              <a href="/">
                <span className="dark-text">Sign In</span>
              </a>
            </IonCol>
          </IonRow>
          <Footer />
        </IonContent>
      </IonPage>
    </>
  );
};
export default Createuser;
