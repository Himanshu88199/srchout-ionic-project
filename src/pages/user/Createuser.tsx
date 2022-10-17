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
  IonItemOption,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";

import Footer from "../../components/Footer";
import React, { useState } from "react";
import "./Createuser.css";
import LoginIcons from "./loginIcons";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import Service from "../../services/http";
import PhoneInput from "react-phone-input-2";
//import PhoneInput from "react-phone-number-input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Createuser: React.FC = () => {
  const service = new Service();
  const history = useHistory();

  const initialErrors = {
    phone: false,
    fname: false,
    lname: false,
    countrycode: false,
    email: false,
    password: false,
  };

  const [errors, setErrors] = useState(initialErrors);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [phoneCode, setCodes] = useState<any>([]);
  const [agree, setAgree] = useState(false);
  const [passwordType, setPasswordType] = useState<any>("password");
  const [showLoading, setShowLoading] = useState(false);

  const initialState = {
    phone: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    countrycode: "",
  };
  const [formData, setFormdata] = useState<any>(initialState);
  const onChangeHandler = (e: any) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "fname" || e.target.name === "lname") {
      setErrors({
        ...errors,
        [e.target.name]: !/^[A-Za-z ]+$/.test(e.target.value),
      });
    }
  };
  const handleCreate = (e: any) => {
    //console.log(formData);
    e.preventDefault();
    if (!errors.fname && !errors.lname) {
      setShowLoading(true);
      const request = new Service();
      request
        .post(`users`, formData)
        .then((result: any) => {
          if (result.err) {
            //console.log(result.err.data);
            setMessage("User already exists. Please sign in.");
            setError(true);
          } else {
            setFormdata(initialState);
            setSuccess(true);
          }
        })
        .finally(() => {
          setShowLoading(false);
        });
    }
  };

  const checkboxHandler = () => {
    setAgree(!agree);
  };
  React.useEffect(() => {
    service.get("countrycodes").then((res: any) => {
      //console.log(res.data)
      setCodes(res.data);
    });
  }, []);
  useIonViewWillEnter(() => {
    service.get("countrycodes").then((res: any) => {
      //console.log(res.data)
      setCodes(res.data);
    });
  });
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
              <IonLoading
                cssClass="my-custom-class"
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={"Please wait..."}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="center text-grey">CREATE YOUR ACCOUNT</IonCol>
          </IonRow>
          <form onSubmit={handleCreate}>
            <IonRow>
              <IonCol>
                <IonItem className="input-border">
                  <IonInput
                    value={formData.fname}
                    onIonChange={onChangeHandler}
                    name="fname"
                    type="text"
                    placeholder="First Name"
                    required
                  ></IonInput>
                </IonItem>
                {errors.fname && (
                  <span className="validation-errors">First Name Invalid</span>
                )}
              </IonCol>
              <IonCol>
                <IonItem className="input-border">
                  <IonInput
                    value={formData.lname}
                    onIonChange={onChangeHandler}
                    name="lname"
                    type="text"
                    placeholder="Last Name"
                    required
                  ></IonInput>
                </IonItem>
                {errors.lname && (
                  <span className="validation-errors">Last Name Invalid</span>
                )}
              </IonCol>
              <IonCol>
                {/* <IonItem className="input-border">
                  <IonCol size="3">
                  <IonSelect value={formData.countrycode} onChange={onChangeHandler} name="countrycode">
                    {phoneCode.map((item: any, index: number) =>
                      <IonSelectOption key={index} value={item.dial_code}>{item.name}</IonSelectOption>
                    )}
                  </IonSelect>

                  </IonCol>
                  <IonCol>
                  <IonInput
                    value={formData.phone}
                    onIonChange={onChangeHandler}
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    required
                  ></IonInput>

                  </IonCol>
                </IonItem> */}
                {/* <IonItem className="input-border"> */}
                <PhoneInput
                  country={"us"}
                  onChange={(phone) =>
                    setFormdata({ ...formData, phone: phone })
                  }
                  countryCodeEditable={false}
                  containerStyle={{
                    marginLeft: "18px",
                    border: "none",
                    height: "42px",
                    borderRadius: "9px",
                  }}
                  inputStyle={{
                    height: "45px",
                    width: "90%",
                    border: "1px solid #707070",
                    borderRadius: "9px",
                    marginLeft: "1px",
                  }}
                  dropdownStyle={{ height: "500px" }}
                  buttonStyle={{
                    height: "30px",
                    margin: "7px",
                    borderRadius: "9px",
                  }}
                  value={formData.phone}
                  inputProps={{ name: "phone", required: true }}
                  placeholder="phone number"
                />

                {/* </IonItem> */}
              </IonCol>
              <IonCol>
                <IonItem className="input-border">
                  <IonInput
                    value={formData.email}
                    onIonChange={onChangeHandler}
                    name="email"
                    required
                    placeholder="Email Address"
                    type="email"
                  ></IonInput>
                </IonItem>
                {errors.email && (
                  <span className="validation-errors">Email Invalid</span>
                )}
              </IonCol>
              <IonCol>
                <IonItem className="input-border">
                  <IonInput
                    value={formData.password}
                    onIonChange={onChangeHandler}
                    type={passwordType}
                    required
                    name="password"
                    placeholder="Password"
                  ></IonInput>
                  {/* <IonIcon onClick={() => {
                    if (passwordType === "password") {
                      setPasswordType("text");
                    } else {
                      setPasswordType("password");
                    }
                  }} slot="end" src="../assets/eye.svg"></IonIcon> */}

                  {passwordType !== "password" ? (
                    <AiOutlineEye
                      className="eye"
                      onClick={() => setPasswordType("password")}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="eye"
                      onClick={() => setPasswordType("text")}
                    />
                  )}
                </IonItem>
                {errors.password && (
                  <span className="validation-errors">Password Invalid</span>
                )}
              </IonCol>
              <IonCol className="m-auto mt-56" size="11">
                <IonButton
                  type="submit"
                  className="sign-btn"
                  size="default"
                  expand="block"
                  disabled={!agree}
                >
                  Sign Up
                </IonButton>
              </IonCol>
              <IonCol size="11" className="remember-forgot">
                <div className="remember">
                  <input
                    type="checkbox"
                    checked={agree}
                    name="remember"
                    onChange={(e) => checkboxHandler()}
                  />
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
          <IonRow
            className="login-box"
            style={{ padding: "0px", paddingBottom: "90px" }}
          >
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
