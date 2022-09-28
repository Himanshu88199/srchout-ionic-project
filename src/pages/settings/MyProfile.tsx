import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToast, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import Header from '../Header';
import './MyProfile.css';
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from 'react';
import Service from '../../services/http';

const MyProfile: React.FC = () => {
  const request = new Service();

  const initialProfile = {
    fname: '',
    lname: '',
    phone: '',
    email: ''
  };
  const initialErrors = {
    fname: false,
    lname: false
  };
  const [errors, setErrors] = useState(initialErrors);
  const [profile, setProfile] = useState<any>(initialProfile);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [edit, setEdit] = useState(false);

  const fetchProfile = () => {
    request.get('users/me')
      .then((result: any) => {
        if (result.data) {
          setProfile({
            fname: result.data.fname,
            lname: result.data.lname,
            phone: `${result.data.countrycode}${result.data.phone}`,
            email: result.data.email,
            countrycode: result.data.countrycode
          });
        } else {
          setError(true);
          setMessage(result.err.message);
        }
      });
  };
  const changeHandler = (e: any) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
    if (e.target.name === "fname" || e.target.name === "lname") {
      setErrors({
        ...errors,
        [e.target.name]: !(/^[A-Za-z ]+$/.test(e.target.value))
      })
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!errors.fname && !errors.lname) {
      const temp = profile.phone;
      const tempPhone = profile.phone.slice(-10);
      const tempCode = profile.phone.slice(0, -10);
      profile.phone = tempPhone;
      profile.countrycode = (tempCode[0] === '+' ? '' : '+') + tempCode;
      //console.log(profile);

      request.put('users/me', profile)
        .then((result: any) => {
          if (result.data) {
            setMessage("Profile updated successfully");
            setSuccess(true);
            setEdit(false);
            fetchProfile();
          } else {
            setError(true);
            setMessage(result.err.message);
            setProfile({
              ...profile,
              phone: temp
            });
            setEdit(false);
          }
        });
    }
  }
  useEffect(() => {
    fetchProfile();
  }, []);
  useIonViewWillEnter(() => {
    fetchProfile();
  });
  return (
    <>
      <IonPage className='pg-grey'>
        <Header />
        <IonContent>
          <IonRow className='con'>
            <IonCol className='center text-grey myprofile'>
              MY PROFILE
            </IonCol>
            <IonCol className='edit'>
              <img src="../assets/edit.svg" alt="" onClick={() => setEdit(true)} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className='center'>
              <img src="../assets/profile.svg" alt="" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className='camera'>
              <img src="../assets/camera.png" alt="" width={25} />
            </IonCol>
          </IonRow>
          <form onSubmit={handleSubmit}>
            <IonRow>
              <IonCol>
                <IonItem className='input-border'>
                  <IonInput disabled={!edit} required value={profile.fname} onIonChange={changeHandler} name="fname" placeholder="First Name"></IonInput>
                </IonItem>
                {errors.fname && (
                  <small className="validation-errors">First Name Invalid</small>
                )}
              </IonCol>
              <IonCol>
                <IonItem className='input-border'>
                  <IonInput disabled={!edit} required value={profile.lname} onIonChange={changeHandler} name="lname" placeholder="Last Name"></IonInput>
                </IonItem>
                {errors.lname && (
                  <small className="validation-errors">Last Name Invalid</small>
                )}
              </IonCol>
              <IonCol>
                <PhoneInput country={"us"}
                  disabled={!edit}
                  onChange={phone => setProfile({ ...profile, phone: phone })}
                  value={profile.phone}
                  containerStyle={{ margin: '5px', marginLeft: '1.2rem', border: '1px solid #707070', borderRadius: '9px', width: '87vw', height: '45px' }}
                  inputStyle={{ width: '86vw', height: '42px', border: 'none', borderRadius: '9px', color: edit ? '#000' : 'dimgrey' }}
                  dropdownStyle={{ height: '200px' }}
                  buttonStyle={{ height: '30px', margin: '7px', borderRadius: '9px' }}
                />
              </IonCol>
              <IonCol>
                <IonItem className='input-border'>
                  <IonInput disabled={!edit} required value={profile.email} onIonChange={changeHandler} name="email" placeholder="Email Address" type="email"></IonInput>
                </IonItem>
              </IonCol>
              <IonCol className='m-auto mt-32' size='11'>
                <IonButton disabled={!edit} type="submit" className='sign-btn' size='default' expand="block">Save</IonButton>
              </IonCol>
            </IonRow>
          </form>
        </IonContent>
        <IonToast
          isOpen={error}
          onDidDismiss={() => {
            setError(false);
          }}
          message={message}
          duration={400}
          color="dark"
        />
        <IonToast
          isOpen={success}
          onDidDismiss={() => {
            setSuccess(false);
          }}
          message={message}
          duration={400}
          color="dark"
        />

      </IonPage>
    </>
  );
};

export default MyProfile;
