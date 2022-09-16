import {
  // IonButton,
  // IonCheckbox,
  // IonCol,
  // IonContent,
  // IonGrid,
  // IonHeader,
  // IonIcon,
  // IonInput,
  // IonItem,
  IonLabel,
  // IonPage,
  IonRouterOutlet,

  IonTabBar,
  IonTabButton,
  IonTabs,

} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router";
// import Header from "../Header";
// import Setting from "../settings/Setting";
import "./EventsPage.css";
import InvitedEvents from "./InvitedEvents";
import MyEvent from "./MyEvent";

const EventsPage: React.FC = () => {
  return (
    <>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/myevents">
              <MyEvent />
            </Route>
            <Route path="/invitedevents">
              <InvitedEvents />
            </Route>
          </IonRouterOutlet>

          <IonTabBar className="custom-tabbar mt-58" slot="top">
            <IonTabButton className="button-1" tab="tab1" href="/myevents">
              <IonLabel className="">My Events</IonLabel>
            </IonTabButton>
            <IonTabButton className="button-1" tab="tab2" href="/invitedevent">
              <IonLabel className="">Invited Events</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </>
  );
};

export default EventsPage;
