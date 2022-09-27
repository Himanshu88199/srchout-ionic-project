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
  IonLoading,
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
  const service = new Service();
  const history = useHistory();

  const initialErrors = {
    phone: false,
    fname: false,
    lname: false,
    countrycode: false,
    email: false,
    password: false
  };

  const [errors, setErrors] = useState(initialErrors);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const [phoneCode, codes] = useState<any>([]);
  const [agree, setAgree] = useState(false);
  const [passwordType, setPasswordType] = useState<any>("password");
  const [showLoading, setShowLoading] = useState(false);


  const handleCreate = (userData: any) => {
    delete userData["confirm_password"];

    const request = new Service();
    request.post(`users`, userData)
      .then((result: any) => {
        if (result.err) {
          setMessage(result.err.message);
          setError(true);
        } else {
          // reset();
          setSuccess(true);
        }
      });
    const initialState = {
      phone: '+91',
      fname: '',
      lname: '',
      countrycode: '',
      email: '',
      password: ''
    };
    const [formData, setFormdata] = useState<any>(initialState);
    const onChangeHandler = (e: any) => {
      setFormdata({
        ...formData,
        [e.target.name]: e.target.value
      });
      if (e.target.name === "fname" || e.target.name === "lname") {
        setErrors({
          ...errors,
          [e.target.name]: !(/^[A-Za-z ]+$/.test(e.target.value))
        })
      }
    };
    const handleCreate = (e: any) => {
      e.preventDefault();
      if (!errors.fname && !errors.lname) {
        setShowLoading(true);
        const request = new Service();
        request.post(`users`, formData)
          .then((result: any) => {
            if (result.err) {
              //console.log(result.err.data);
              setMessage("User already exists. Please sign in.");
              setError(true);
            } else {
              setFormdata(initialState);
              setSuccess(true);
            }
          }).finally(() => {
            setShowLoading(false);
          });
      }
    };

    const checkboxHandler = () => {
      setAgree(!agree);
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
                    <span className="validation-errors">
                      First Name Invalid
                    </span>
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
                    <span className="validation-errors">
                      Last Name Invalid
                    </span>
                  )}
                </IonCol>
                {/* <IonCol>
                <IonItem className="input-border">
                  <IonSelect
                    name="countrycode"
                    value={formData.countrycode}
                    onIonChange={onChangeHandler}
                  >
                    {phoneCode &&
                      phoneCode.map((i: any, index: number) => (
                        <IonSelectOption key={index} value={i.dial_code}>
                          {i.name}
                        </IonSelectOption>
                      ))}
                  </IonSelect>

                  <IonIcon slot='start' src='../assets/email.svg'></IonIcon>
                  <IonInput
                    value={""}
                    type="tel"
                    placeholder="Phone Number"
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
              </IonCol> */}
                <IonCol>
                  <PhoneInput
                    country={"us"}
                    onChange={phone => console.log({ phone })}
                    containerStyle={{ margin: '5px', marginLeft: '1.2rem', border: '1px solid #707070', borderRadius: '9px', width: '87vw', height: '45px' }}
                    inputStyle={{ width: '86vw', height: '42px', border: 'none', borderRadius: '9px' }}
                    dropdownStyle={{ height: '200px' }}
                    buttonStyle={{ height: '30px', margin: '7px', borderRadius: '9px' }}
                    placeholder="Phone Number"
                    inputProps={{ name: 'phone', required: true }}
                  // {...register("phonenumber", { required: true })}
                  />
                  {/* {errors.phone?.type === "required" && (
                  <span className="validation-errors">
                    Phone number is required
                  </span>
                )} */}

                </IonCol>
                <IonCol>
                  <IonItem className="input-border">
                    <IonInput
                      value={""}
                      type="email"
                      // {...register("email", {
                      //   required: true,
                      //   pattern: /\S+@\S+\.\S+/,
                      // })}
                      placeholder="Email Address" />
                    {/* <IonIcon slot='start' src='../assets/email.svg'></IonIcon> */}
                    <IonInput
                      value={formData.phone}
                      onIonChange={onChangeHandler}
                      name="phone"
                      required
                      placeholder="Phone"
                      type="number"
                    ></IonInput>
                  </IonItem>
                  {errors.countrycode && (
                    <span className="validation-errors">
                      Invalid Country Code
                    </span>
                  )}
                  {errors.phone && (
                    <span className="validation-errors">
                      Phone Invalid
                    </span>
                  )}
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
                    <IonIcon onClick={() => {
                      if (passwordType === "password") {
                        setPasswordType("text");
                      } else {
                        setPasswordType("password");
                      }
                    }} slot="end" src="../assets/eye.svg"></IonIcon>
                  </IonItem>
                  {errors.password && (
                    <span className="validation-errors">
                      Password Invalid
                    </span>
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
                    <input type="checkbox" checked={agree} name="remember" onChange={(e) => checkboxHandler()} />
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
