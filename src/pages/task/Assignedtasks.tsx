import {
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
import EventsPage from "../events/EventsPage";
import Header from "../Header";
import Setting from "../settings/Setting";

import "./Assignedtasks.css";

const Assignedtasks: React.FC = () => {
  return (
    <>
      <IonPage>
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
              <button className="event-btn">My Tasks</button>
              <button className="event-btn ">Assigned Tasks</button>
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
            <IonCol className="pd-0 tasks-icons" size="12">
              <div className="tasks-icon">
                <img
                  className="task-img"
                  src="../../../assets/assigned-icon.svg"
                  alt=""
                />
                <p className="task-icon-text">Accept/Accepted</p>
              </div>
              <div className="tasks-icon">
                <img
                  className="task-img"
                  src="../../../assets/discard-icon.svg"
                  alt=""
                />
                <p className="task-icon-text declined-text">Decline/Declined</p>
              </div>
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
            <IonCol className="pd-0 tasks-icons" size="12">
              <div className="tasks-icon">
                <img
                  className="task-img"
                  src="../../../assets/assigned-icon.svg"
                  alt=""
                />
                <p className="task-icon-text">Accept/Accepted</p>
              </div>
              <div className="tasks-icon">
                <img
                  className="task-img"
                  src="../../../assets/discard-icon.svg"
                  alt=""
                />
                <p className="task-icon-text declined-text">Decline/Declined</p>
              </div>
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
            <IonCol className="pd-0 tasks-icons" size="12">
              <div className="tasks-icon">
                <img
                  className="task-img"
                  src="../../../assets/assigned-icon.svg"
                  alt=""
                />
                <p className="task-icon-text">Accept/Accepted</p>
              </div>
              <div className="tasks-icon">
                <img
                  className="task-img"
                  src="../../../assets/discard-icon.svg"
                  alt=""
                />
                <p className="task-icon-text declined-text">Decline/Declined</p>
              </div>
            </IonCol>
          </IonRow>

          <Footer />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Assignedtasks;
