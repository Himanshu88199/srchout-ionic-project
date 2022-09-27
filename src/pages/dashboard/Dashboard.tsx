import { IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonItem, IonItemDivider, IonLabel, IonPage, IonRow, useIonViewWillEnter } from "@ionic/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Service from "../../services/http";
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
    const request = new Service();

    request.get('events?type=personal')
      .then((result: any) => {
        if (result.err) {
          setMessage(result.err.message);
          setError(true);
        } else {
          setEventsList(result.data);
        }
      });
  };


  const fetchTasks = () => {
    const request = new Service();

    request.get('tasks?type=personal')
      .then((result: any) => {
        if (result.err) {
          setMessage(result.err.message);
          setError(true);
        } else {
          setTasksList(result.data);
        }
      })
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
                    {eventsList.slice(0, 3).map((item: any, index: number) => {
                      return (
                        <span key={index} onClick={() => history.push(`/my/eventdetails?id=${item.id}`)}>
                          <IonRow className="start dashboard-item-top">
                            <p>Event:</p>
                            <p className="dashboard-item-value">{item.name}</p>
                          </IonRow>
                          <IonRow className="start dashboard-item-bottom">
                            <p>Date:</p>
                            <p className="dashboard-item-value">{moment(item.event_at).format('lll')}</p>
                          </IonRow>
                        </span>
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
                    {tasksList.slice(0, 3).map((item: any, index: number) => {
                      return (
                        <span key={index} onClick={() => history.push(`/my/mytask`)}>
                          <IonRow className="start dashboard-item-top">
                            <p>Task:</p>
                            <p className="dashboard-item-value">{item.name}</p>
                          </IonRow>
                          <IonRow className="start dashboard-item-bottom">
                            <p>Due Date:</p>
                            <p className="dashboard-item-value">{moment(item.due_date).format('lll')}</p>
                          </IonRow>
                        </span>
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
