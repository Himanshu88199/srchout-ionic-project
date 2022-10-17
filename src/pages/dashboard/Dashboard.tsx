import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonPage,
  IonRow,
  useIonViewWillEnter,
} from "@ionic/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Service from "../../services/http";
import { Advertisements } from "../Advertisements";
import Header from "../Header";
import "./Dashboard.css";

const Divider: React.FC = () => {
  return <IonItem style={{ border: "1px solid red" }} />;
};
const Dashboard: React.FC = () => {
  const history = useHistory();
  const [eventsList, setEventsList] = useState<any>([]);
  const [tasksList, setTasksList] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const fetchEvents = () => {
    const request = new Service();

    request.get("events?count=3").then((result: any) => {
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

    request.get("tasks?count=3").then((result: any) => {
      if (result.err) {
        setMessage(result.err.message);
        setError(true);
      } else {
        setTasksList(result.data);
      }
    });
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
          <IonRow className="xyz">
            <IonCol className="col">
              <IonItem className="newcol">
                <IonLabel className="dashboard-heading ">EVENTS</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard className="card">
                <IonCardContent>
                  <IonGrid className="events">
                    {eventsList.length === 0 ? (
                      <IonRow className="start dashboard-item-top">
                        <p style={{ fontWeight: "500" }}>
                          No personal or hosted events.
                        </p>
                        <IonButton
                          className="dashboard-add-btn"
                          fill="clear"
                          routerLink="/my/createevent"
                          size="small"
                        >
                          <IonIcon
                            color="white"
                            src="../../../assets/plus_icon.svg"
                          />
                        </IonButton>
                      </IonRow>
                    ) : (
                      <>
                        {eventsList.map((item: any, index: number) => {
                          return (
                            <span
                              key={index}
                              onClick={() =>
                                history.push(`/my/eventdetails?id=${item.id}`)
                              }
                            >
                              <small
                                style={{
                                  float: "right",
                                  fontWeight: "400",
                                  marginTop: "8px",
                                  backgroundColor: "transparent",
                                  padding: 0,
                                  fontSize: "11px",
                                  color:
                                    item.evnt_type === "personal"
                                      ? "#671070"
                                      : "#228B22",
                                }}
                              >
                                {item.evnt_type === "personal"
                                  ? "Hosted"
                                  : "Invited"}
                              </small>
                              <IonRow className="start dashboard-item-top">
                                <p>Event:</p>
                                <p className="dashboard-item-value">
                                  {item.name}
                                </p>
                              </IonRow>

                              <IonRow className="start dashboard-item-bottom">
                                <p>Date:</p>
                                <p className="dashboard-item-value">
                                  {moment(item.event_at).format("lll")}
                                </p>
                              </IonRow>
                            </span>
                          );
                        })}
                      </>
                    )}
                    {eventsList.length !== 0 && (
                      <IonLabel
                        className="dashboard-more-btn"
                        onClick={() => history.push("/my/events")}
                      >
                        <p>more...</p>
                      </IonLabel>
                    )}
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow className=" xyz1">
            <IonCol className="col1">
              <IonItem className="item">
                <IonLabel className="dashboard-heading">TASKS</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard className="dashboard-light-card">
                <IonCardContent>
                  <IonGrid className="events">
                    {tasksList.length === 0 ? (
                      <IonRow className="start dashboard-item-top">
                        <p style={{ fontWeight: "500" }}>
                          No personal or assigned tasks.
                        </p>
                        <IonButton
                          className="dashboard-add-btn"
                          fill="clear"
                          routerLink="/my/createpersonaltask"
                          size="small"
                        >
                          <IonIcon
                            color="white"
                            src="../../../assets/plus_icon.svg"
                          />
                        </IonButton>
                      </IonRow>
                    ) : (
                      <>
                        {tasksList.map((item: any, index: number) => {
                          return (
                            <span
                              key={index}
                              onClick={() => history.push(`/my/mytask`)}
                            >
                              <small
                                style={{
                                  float: "right",
                                  fontWeight: "400",
                                  fontSize: "11px",
                                  marginTop: "8px",
                                  backgroundColor: "transparent",
                                  padding: 0,
                                  color:
                                    item.task_type === "personal"
                                      ? "#671070"
                                      : "#228B22",
                                }}
                              >
                                {item.task_type === "personal"
                                  ? "Personal"
                                  : "Hosted"}
                              </small>
                              <IonRow className="start dashboard-item-top">
                                <p>Task:</p>
                                <p className="dashboard-item-value">
                                  {item.name}
                                </p>
                              </IonRow>
                              <IonRow className="start dashboard-item-bottom">
                                <p>Due Date:</p>
                                <p className="dashboard-item-value">
                                  {moment(item.due_date).format("lll")}
                                </p>
                              </IonRow>
                            </span>
                          );
                        })}
                      </>
                    )}
                    {tasksList.length != 0 && (
                      <IonLabel
                        className="dashboard-more-btn"
                        onClick={() => history.push("/my/mytask")}
                      >
                        <p>more...</p>
                      </IonLabel>
                    )}
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
