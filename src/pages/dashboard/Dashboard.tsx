import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonItem, IonItemDivider, IonLabel, IonPage, IonRow, useIonViewWillEnter } from "@ionic/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Advertisements } from "../Advertisements";
import Header from "../Header";
import './Dashboard.css';

const Divider: React.FC = () => {
  return (
    <IonItem style={{ border: '1px solid red' }} />
  );
};
const Dashboard: React.FC = () => {
  const history = useHistory();
  const [eventsList, setEventsList] = useState<any>([]);
  const [tasksList, setTasksList] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const fetchEvents = () => {
    const url = "https://taskerr-api.herokuapp.com/api/v1/events?type=personal";

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
          setEventsList(res);
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


  const fetchTasks = () => {
    const url = "https://taskerr-api.herokuapp.com/api/v1/tasks?type=personal";

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
          //console.log(res);
          setTasksList(res);
        } else if (res.error) {
          setMessage(res.error);
          setError(true);
        }
      })
      .catch((err) => {
        setMessage(err.message);
        setError(true);
      });

    return () => abortCnt.abort();
  };

  useEffect(() => {
    fetchEvents();
    fetchTasks();
  }, []);
  useIonViewWillEnter(() => {
    fetchEvents();
    fetchTasks();
  });

  return (
    <>
      <IonPage className="pg-grey">
        <Header />
        <IonContent>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel className="dashboard-heading">EVENTS</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard className="card">
                <IonCardContent>
                  <IonGrid className="events">
                    {eventsList.slice(0, 5).map((item: any, index: number) => {
                      return (
                        <React.Fragment key={index}>
                          <IonRow className="start dashboard-item-top">
                            <p>Event:</p>
                            <p className="dashboard-item-value">{item.name}</p>
                          </IonRow>
                          <IonRow className="start dashboard-item-bottom">
                            <p>Date:</p>
                            <p className="dashboard-item-value">{moment(item.event_at).format('lll')}</p>
                          </IonRow>
                        </React.Fragment>
                      )
                    })}
                    <IonLabel className="dashboard-more-btn" onClick={() => history.push("/my/events")}><p>more...</p></IonLabel>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel className="dashboard-heading">TASKS</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard className="dashboard-light-card">
                <IonCardContent>
                  <IonGrid className="events">
                    {tasksList.slice(0, 5).map((item: any, index: number) => {
                      return (
                        <React.Fragment key={index}>
                          <IonRow className="start dashboard-item-top">
                            <p>Task:</p>
                            <p className="dashboard-item-value">{item.name}</p>
                          </IonRow>
                          <IonRow className="start dashboard-item-bottom">
                            <p>Due Date:</p>
                            <p className="dashboard-item-value">{moment(item.due_date).format('lll')}</p>
                          </IonRow>
                        </React.Fragment>
                      )
                    })}
                    <IonLabel className="dashboard-more-btn" onClick={() => history.push("/my/mytask")}><p>more...</p></IonLabel>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonContent>
        <Advertisements />
      </IonPage>
    </>
  );
};

export default Dashboard;
