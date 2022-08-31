import {
  IonButton,
  IonCol,
  IonContent,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTextarea,
} from "@ionic/react";
import Header from "../Header";
import "./CreatePersonalTask.css";
import Footer from "../../components/Footer";
import "./Mytask.css";

const Mytask: React.FC = () => {
  return (
    <>
      <IonPage className="pg-grey">
        <Header />
        <IonContent>
          <IonRow>
            <IonCol className="center text-grey">TASKS</IonCol>
          </IonRow>
          <IonRow>
            <IonCol class="tasks-btns">
              <button className="event-btn">My tasks</button>
              <button className="event-btn ">Assigned tasks</button>
            </IonCol>
          </IonRow>

          <IonRow className="tasks">
            <IonCol className="pd-0 event" size="12">
              <IonText className="light-text">Car oil change</IonText>
            </IonCol>
            <IonCol className="pd-0 event" size="12">
              <IonText className="light-text">
                <span>Due:</span> Aug 20, 2022
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow className="tasks">
            <IonCol className="pd-0 event" size="12">
              <IonText className="light-text">Car oil change</IonText>
            </IonCol>
            <IonCol className="pd-0 event" size="12">
              <IonText className="light-text">
                <span>Due:</span> Aug 20, 2022
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow className="tasks">
            <IonCol className="pd-0 event" size="12">
              <IonText className="light-text">Car oil change</IonText>
            </IonCol>
            <IonCol className="pd-0 event" size="12">
              <IonText className="light-text">
                <span>Due:</span> Aug 20, 2022
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow className="tasks">
            <IonCol className="pd-0 event" size="12">
              <IonText className="light-text">Car oil change</IonText>
            </IonCol>
            <IonCol className="pd-0 event" size="12">
              <IonText className="light-text">
                <span>Due:</span> Aug 20, 2022
              </IonText>
            </IonCol>
          </IonRow>

          <Footer />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Mytask;
