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
  IonRouterOutlet,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router";
import Footer from "../../components/Footer";
import Header from "../Header";
import Setting from "../settings/Setting";
import EventsPage from "./EventsPage";
import "./MyEvent.css";

const MyEvent: React.FC = () => {
<<<<<<< HEAD
    return (
        <>
            <IonPage className='pg-grey'>
                <Header />
                <EventsPage />
                    {/* <IonTabBar className='custom-tabbar mt-58' slot='top'>
                        <IonTabButton className='button-1' tab="tab1" href="/myevents">
                            <IonLabel className=''>My Events</IonLabel>
                        </IonTabButton>
                        <IonTabButton className='button-1' tab="tab2" href="/invitedevent">
                            <IonLabel className=''>Invited Events</IonLabel>
                        </IonTabButton>
                    </IonTabBar> */}
                <IonContent>

                    {/* <IonCol className='pd-0 ' size='12' >
                        <IonLabel className='dark-text'> Event:</IonLabel>
                        <IonText>World cup soccer finals</IonText>
                    </IonCol>
                    <IonCol className='pd-0 ' size='12' >
                        <IonLabel className='dark-text'>Location:</IonLabel>
                        <IonText>Babu's House</IonText>
                    </IonCol>
                    <IonCol className='pd-0 ' size='12' >
                        <IonLabel className='dark-text'> Date: </IonLabel>
                        <IonText>Aug 20, 2022</IonText>
                    </IonCol>
                    <IonCol className='pd-0 ' size='12' >
                        <IonLabel className='dark-text'> Time:</IonLabel>
                        <IonText>3:00PM</IonText>
                    </IonCol> */}
                </IonContent>
            </IonPage>

        </>
    );
=======
  return (
    <>
      <IonPage className="pg-grey">
        <Header />
        <IonContent>
          <EventsPage />
          <IonRow>
            <IonCol>
              <p className="event-heading">EVENTS</p>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol class="events-btns">
              <button className="event-btn">My Events</button>
              <button className="event-btn ">Invited Events</button>
            </IonCol>
          </IonRow>

          <IonRow className="events">
            <IonCol className="pd-0 event" size="12">
              <IonLabel className="dark-text"> Event:</IonLabel>
              <IonText>World cup soccer finals</IonText>
            </IonCol>
            <IonCol className="pd-0 event" size="12">
              <IonLabel className="dark-text">Location:</IonLabel>
              <IonText>Babu's House</IonText>
            </IonCol>
            <IonCol className="pd-0 event" size="12">
              <IonLabel className="dark-text"> Date: </IonLabel>
              <IonText>Aug 20, 2022</IonText>
            </IonCol>
            <IonCol className="pd-0 event" size="12">
              <IonLabel className="dark-text"> Time:</IonLabel>
              <IonText>3:00PM</IonText>
            </IonCol>
            <IonCol className="pd-0 events-icons" size="12">
              <img
                className="user-img"
                src="../../../assets/users.svg"
                alt=""
              />
              <img className="user-img" src="../../../assets/tick.svg" alt="" />
              <img className="user-img" src="../../../assets/edit.svg" alt="" />
            </IonCol>
          </IonRow>
          <IonRow className="events">
            <IonCol className="pd-0 event" size="12">
              <IonLabel className="dark-text"> Event:</IonLabel>
              <IonText>World cup soccer finals</IonText>
            </IonCol>
            <IonCol className="pd-0 event" size="12">
              <IonLabel className="dark-text">Location:</IonLabel>
              <IonText>Babu's House</IonText>
            </IonCol>
            <IonCol className="pd-0 event" size="12">
              <IonLabel className="dark-text"> Date: </IonLabel>
              <IonText>Aug 20, 2022</IonText>
            </IonCol>
            <IonCol className="pd-0 event" size="12">
              <IonLabel className="dark-text"> Time:</IonLabel>
              <IonText>3:00PM</IonText>
            </IonCol>
            <IonCol className="pd-0 events-icons" size="12">
              <img
                className="user-img"
                src="../../../assets/users.svg"
                alt=""
              />
              <img className="user-img" src="../../../assets/tick.svg" alt="" />
              <img className="user-img" src="../../../assets/edit.svg" alt="" />
            </IonCol>
          </IonRow>
          <IonRow className="events">
            <IonCol className="pd-0 event" size="12">
              <IonLabel className="dark-text"> Event:</IonLabel>
              <IonText>World cup soccer finals</IonText>
            </IonCol>
            <IonCol className="pd-0 event" size="12">
              <IonLabel className="dark-text">Location:</IonLabel>
              <IonText>Babu's House</IonText>
            </IonCol>
            <IonCol className="pd-0 event" size="12">
              <IonLabel className="dark-text"> Date: </IonLabel>
              <IonText>Aug 20, 2022</IonText>
            </IonCol>
            <IonCol className="pd-0 event" size="12">
              <IonLabel className="dark-text"> Time:</IonLabel>
              <IonText>3:00PM</IonText>
            </IonCol>
            <IonCol className="pd-0 events-icons" size="12">
              <img
                className="user-img"
                src="../../../assets/users.svg"
                alt=""
              />
              <img className="user-img" src="../../../assets/tick.svg" alt="" />
              <img className="user-img" src="../../../assets/edit.svg" alt="" />
            </IonCol>
          </IonRow>
          <Footer />
        </IonContent>
      </IonPage>
    </>
  );
>>>>>>> 0721e7287e8e01960e2efd85fb553f92d6f5305a
};

export default MyEvent;
