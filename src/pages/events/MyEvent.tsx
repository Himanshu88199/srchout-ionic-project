import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,

} from "@ionic/react";
import { useEffect, useState } from "react";
// import { IonReactRouter } from "@ionic/react-router";
import { useHistory } from "react-router";
// import Footer from "../../components/Footer";
import Header from "../Header";
// import EventDetails from "./EventDetails";
// import Setting from "../settings/Setting";
import EventsPage from "./EventsPage";
import "./MyEvent.css";

const MyEvent: React.FC = () => {
  const history = useHistory()

  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const url = "https://taskerr-api.herokuapp.com/api/v1/events?type=personal";
  const fetchData = () => {
    const abortCnt = new AbortController();
    const token = sessionStorage.getItem("token");

    fetch(url, {
      signal: abortCnt.signal,
      method: "GET",
      headers: {
        "api-token": token!,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else if (res.status === 400) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then((res) => {
        if (res) {
          setData(res);
        } else if (res.error) {
          setMessage(res.error);
          setError(true);
        }
      })
      .catch((err) => {
        setMessage(err.message);
        setError(true);
      });
  };
  // const service = new Service();

  useEffect(() => {
    fetchData();
  }, []);

  const getFormattedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  const getFormattedTime = (dateStr: string) => {
    const date = new Date(dateStr);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var min: string;
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    if (minutes < 10) min = "0" + minutes.toString();
    else min = minutes.toString();
    var strTime = hours + ":" + min + " " + ampm;
    return strTime;
  };
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
              <button className="event-btn" onClick={() => history.push("/myevents")}>My Events</button>
              <button className="event-btn " onClick={() => history.push("/invitedevents")}>Invited Events</button>
            </IonCol>
          </IonRow>

          {data?.map((i: any, index: number) => (
            <IonRow key={index}>
              <IonCol>
                <IonCard className="card">
                  <IonCardContent>
                    <IonGrid className="events">
                      <IonRow className="start">
                        <p>Event:</p>
                        <IonCol>{i.name}</IonCol>
                      </IonRow>
                      <IonRow className="start">
                        <p>Where:</p>
                        <IonCol>{i.location}</IonCol>
                      </IonRow>
                      <IonRow className="start">
                        <p>Date:</p>
                        <IonCol>{getFormattedDate(i.event_at)}</IonCol>
                      </IonRow>
                      <IonRow className="start">
                        <p>Time:</p>
                        <IonCol>{getFormattedTime(i.event_at)}</IonCol>
                      </IonRow>
                      <IonCol className="pd-0 events-icons" size="12" style={{ float: "right" }}>
                        <img
                          className="user-img"
                          src="../../../assets/users.svg"
                          alt=""
                        />
                        <img className="user-img" src="../../../assets/tick.svg" alt="" />
                        <img className="user-img" src="../../../assets/edit.svg" alt="" />
                      </IonCol>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonCol>

            </IonRow>
          ))}

          {/* <IonRow className="events">
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
          </IonRow> */}
          {/* <IonRow className="events">
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
          </IonRow> */}
          {/* <Footer /> */}
          <IonButton
            className="add-btn"
            style={{ float: "right" }}
            onClick={() => history.push("/createevent")}
          >
            +Event
          </IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};

export default MyEvent;
