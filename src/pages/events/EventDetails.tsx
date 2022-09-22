import {
  IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRow, IonText, IonTitle, IonToast, IonToolbar
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Advertisements } from "../Advertisements";
import Header from "../Header";
import "./EventDetails.css";
import moment from 'moment';
import { addOutline, closeCircleOutline } from "ionicons/icons";

const EventDetails: React.FC = () => {
  const history = useHistory();

  const { search } = useLocation();
  const id = search.split('?id=')[1];
  //console.log(id);

  const initialStateEvent = {
    detail: "",
    event_at: "",
    id: "",
    location: "",
    name: ""
  };
  const newContact = {
    phone: '',
    email: '',
    event_id: '',
    fname: '',
    lname: '',
  };

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [eventData, setEventData] = useState(initialStateEvent);
  const [attendees, setAttendess] = useState<any>([]);
  const [newAttendee, setNewAttendee] = useState(newContact);
  const [open, setOpen] = useState<any>(false);
  const [tasks, setTasks] = useState<any>([]);

  const fetchEventById = (id: any) => {
    const url = "https://taskerr-api.herokuapp.com/api/v1/events/" + id;
    const token = sessionStorage.getItem("token");
    const abortCnt = new AbortController();
    let options = {
      signal: abortCnt.signal,
      method: "GET",
      headers: {
        "api-token": token!,
        "Content-Type": "application/json",
      },
    };

    fetch(url, options)
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
          setEventData(res);
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
  const fetchAttendees = (id: any) => {
    const url = "https://taskerr-api.herokuapp.com/api/v1/guests/" + id;
    const abortCnt = new AbortController();
    const token = sessionStorage.getItem("token");

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-token": token!,
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
          setAttendess(res);
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
  const fetchTasks = (id: any) => {
    const url = "https://taskerr-api.herokuapp.com/api/v1/tasks?event_id=" + 120;
    const abortCnt = new AbortController();
    const token = sessionStorage.getItem("token");

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-token": token!,
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
          setTasks(res);
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
  }
  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  const addInContacts = () => {
    const abortCnt = new AbortController();
    const token = sessionStorage.getItem("token");
    newAttendee.event_id = id;
    fetch(`https://taskerr-api.herokuapp.com/api/v1/guests`, {
      signal: abortCnt.signal,
      method: "POST",
      headers: {
        "api-token": token!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAttendee)
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
          setNewAttendee(newContact);
          fetchAttendees(id);
          closeModal();
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

  const changeContacthandler = (e: any) => {
    setNewAttendee({
      ...newAttendee,
      [e.target.name]: e.detail.value
    });
  };
  useEffect(() => {
    fetchEventById(id);
    fetchAttendees(id);
    fetchTasks(id);
  }, [id]);
  return (
    <>
      <IonPage className="pg-grey">
        <Header />
        <IonContent>
          <IonRow>
            <IonCol className="center text-grey">EVENT DETAILS</IonCol>
          </IonRow>
          <IonRow className="bg-light-grey">
            <IonRow className="text-grey2  mt-11">
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Event :</IonLabel>
                <IonText>{eventData.name}</IonText>
              </IonCol>
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Location :</IonLabel>
                <IonText>{eventData.location}</IonText>
              </IonCol>
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Date :</IonLabel>
                <IonText>{moment(eventData.event_at).format('ll')}</IonText>
              </IonCol>
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Time :</IonLabel>
                <IonText>{moment(eventData.event_at).format("hh:mm a")}</IonText>
              </IonCol>
            </IonRow>
            <IonRow className="text-grey2 mt-9">
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Total Invitees :</IonLabel>
                <IonText>{attendees.length}</IonText>
              </IonCol>
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Accepted :</IonLabel>
                <IonText>{attendees.filter((attend: any) => attend.rvsp === "yes").length}</IonText>
              </IonCol>
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Declined :</IonLabel>
                <IonText>{attendees.filter((attend: any) => attend.rvsp === "no").length}</IonText>
              </IonCol>
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Undecided :</IonLabel>
                <IonText>{attendees.filter((attend: any) => attend.rvsp == null).length}</IonText>
              </IonCol>
            </IonRow>
            <IonRow className="text-grey2 mt-8">
              <IonCol size="12">
                <IonLabel className="dark-text"> Invitees :</IonLabel>
              </IonCol>
              <IonRow>
                {attendees.map((attend: any) => {
                  return (
                    <IonCol key={attend.id} className="pd-0 pb-0" size="12">
                      {attend.fname} {attend.lname} - {attend.rsvp !== null ? (attend.rsvp === "yes" ? "Accepted" : "Declined") : "Undecided"}
                    </IonCol>
                  )
                })}
              </IonRow>
            </IonRow>
            <IonRow className="text-grey2 mt-16">
              <IonCol size="12">
                <IonLabel className="dark-text"> Tasks :</IonLabel>
              </IonCol>
              <IonRow>
                {tasks.map((item: any, index: number) => {
                  const assignee = attendees.filter((attend: any) => attend.id === item.assigned_to)[0];
                  return (
                    <IonCol key={index} className="pd-0 pb-0" size="12">
                      {item.name} {assignee && `- ${assignee.fname} ${assignee.lname}`}
                    </IonCol>
                  )
                })}
              </IonRow>
            </IonRow>
            <IonRow className="btn-right">
              <IonCol className="p-0">
                <IonButton fill="clear" onClick={() => openModal()}>
                  <IonIcon className="icon-size" src="../assets/users.svg" />
                </IonButton>
                <IonButton fill="clear" onClick={() => history.push(`/my/createeventtask?id=${id}&eventName=${eventData.name}`)}>
                  <IonIcon className="icon-size-2" src="../assets/tick.svg" />
                </IonButton>
                <IonButton fill="clear" onClick={() => history.push("/my/createevent?id=" + id)}>
                  <IonIcon className="icon-size-2" src="../assets/edit.svg" />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonRow>
          <IonModal
            isOpen={open}
            onDidDismiss={closeModal}
            breakpoints={[0, 0.2, 0.5, 1]}
            initialBreakpoint={0.5}
            backdropBreakpoint={0.2}
          >
            <IonHeader>
              <IonToolbar color="primary">
                <IonTitle>Add Attendees</IonTitle>
                <IonButton
                  size="small"
                  fill="clear"
                  className="float-right-button"
                  onClick={() => closeModal()}
                >
                  <IonIcon
                    slot="icon-only"
                    icon={closeCircleOutline}
                    color="light"
                  />
                </IonButton>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonItem hidden>
                      <IonLabel position="floating">
                        {" "}
                        event_id:
                      </IonLabel>
                      <IonInput
                        placeholder="event_id"
                        value={id}
                      ></IonInput>
                    </IonItem>

                    <IonItem>
                      <IonLabel position="floating">
                        {" "}
                        First Name:
                      </IonLabel>
                      <IonInput
                        placeholder="First Name"
                        value={newAttendee.fname}
                        onIonChange={changeContacthandler}
                        name="fname"
                      ></IonInput>
                    </IonItem>

                    <IonItem>
                      <IonLabel position="floating">
                        {" "}
                        Last Name:
                      </IonLabel>
                      <IonInput
                        placeholder="Last Name"
                        value={newAttendee.lname}
                        onIonChange={changeContacthandler}
                        name="lname"
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="floating">
                        {" "}
                        Phone:
                      </IonLabel>
                      <IonInput
                        placeholder="Phone"
                        value={newAttendee.phone}
                        onIonChange={changeContacthandler}
                        name="phone"
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="floating">
                        {" "}
                        Email:
                      </IonLabel>
                      <IonInput
                        placeholder="Email"
                        value={newAttendee.email}
                        onIonChange={changeContacthandler}
                        name="email"
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow className="text-center">
                  <IonCol>
                    <IonButton
                      size="small"
                      onClick={addInContacts}
                    >
                      <IonIcon icon={addOutline} />
                      Add
                    </IonButton>
                  </IonCol>
                </IonRow>
                {/* <IonRow>
                  <IonCol>
                    <ul>
                      {list.length > 0 &&
                        list.map((item, index) => (
                          <li key={item.name + index}>
                            {item.name}({item.phone}){" "}
                          </li>
                        ))}
                    </ul>
                  </IonCol>
                </IonRow> */}
              </IonGrid>
            </IonContent>
          </IonModal>
        </IonContent>
        {/* <IonToast
          isOpen={error}
          onDidDismiss={() => {
            setError(false);
          }}
          message={message}
          duration={200}
          color="danger"
        /> */}
        <Advertisements />
      </IonPage>
    </>
  );
};
export default EventDetails;
