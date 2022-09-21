import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,

} from "@ionic/react";
import { addOutline, closeCircleOutline, createOutline, personAddOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
// import { IonReactRouter } from "@ionic/react-router";
import { useHistory } from "react-router";
import { Advertisements } from "../Advertisements";
// import Footer from "../../components/Footer";
import Header from "../Header";
// import EventDetails from "./EventDetails";
// import Setting from "../settings/Setting";
import EventsPage from "./EventsPage";
import "./MyEvent.css";

const MyEvent: React.FC = () => {
  const history = useHistory()

  const [eventType, setEventType] = useState("personal");
  const [data, setData] = useState<any>(null);
  const [open, setOpen] = useState<any>(false);
  const [eventId, setEventId] = useState("");
  const [event_id, eventid] = useState<null>();
  const [showModal, setShowModal] = useState(false);
  const [contactFirstName, setContactFirstName] = useState("");
  const [contactSecondName, setContactSecondName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [list, setList] = useState<IContact[]>([]);
  interface IContact {
    name: string;
    phone: string;
    email: string;
  }

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  //console.log(data);
  const url = "https://taskerr-api.herokuapp.com/api/v1/events?type=";
  const fetchData = () => {
    const abortCnt = new AbortController();
    const token = sessionStorage.getItem("token");

    fetch(url + eventType, {
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
  }, [eventType]);
  useIonViewWillEnter(() => {
    fetchData();
  });
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
  const handleClick = (e: any) => {
    e.preventDefault();
    var id = e.target.getAttribute("data-event-id");
    history.push("/my/createevent?id=" + id);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const openModal = (id: any) => {
    setOpen(true);
    eventid(id);
  };
  const addInContacts = () => {
    let newContact = {
      phone: contactPhone,
      email: contactEmail,
      event_id: event_id,
      fname: contactFirstName,
      lname: contactSecondName,
    };
    setContactPhone("");
    setContactEmail("");
    setContactFirstName("");
    setContactSecondName("");

    const abortCnt = new AbortController();
    const token = sessionStorage.getItem("token");

    fetch(`https://taskerr-api.herokuapp.com/api/v1/guests`, {
      signal: abortCnt.signal,
      method: "POST",
      headers: {
        "api-token": token!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact)
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
          setList([...list, res]);
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
              <button className={eventType === "personal" ? "event-btn event-btn-clicked" : "event-btn"} onClick={() => setEventType("personal")}>My Events</button>
              <button className={eventType === "invited" ? "event-btn event-btn-clicked" : "event-btn"} onClick={() => setEventType("invited")}>Invited Events</button>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton routerLink="/my/createevent"
                className="add-btn"
                style={{ float: "right" }}
              >
                +Event
              </IonButton>
            </IonCol>
          </IonRow>
          {/* <IonContent className="setheight"> */}

          {data && data?.map((i: any, index: number) => (
            <IonRow key={index}>
              <IonCol >
                <IonCard className="card">
                  <IonCardContent>
                    <IonGrid className="events" onClick={() => history.push('/my/eventdetails?id=' + i.id)}>
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
                    </IonGrid>

                    <IonCol className="pd-0 events-icons" size="12" style={{ float: "right" }}>
                      <img
                        className="user-img user"
                        src="../../../assets/users.svg"
                        alt=""
                        onClick={() => openModal(i.id)}
                        data-event-id={i.id}

                      />
                      <img className="user-img" src="../../../assets/tick.svg" alt="" />
                      <img className="user-img" src="../../../assets/edit.svg" alt=""
                        onClick={handleClick}
                        data-event-id={i.id}
                      />
                    </IonCol>
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
                                  value={event_id}
                                ></IonInput>
                              </IonItem>

                              <IonItem>
                                <IonLabel position="floating">
                                  {" "}
                                  First Name:
                                </IonLabel>
                                <IonInput
                                  placeholder="First Name"
                                  value={contactFirstName}
                                  onIonChange={(e) =>
                                    setContactFirstName(e.detail.value!)
                                  }
                                ></IonInput>
                              </IonItem>

                              <IonItem>
                                <IonLabel position="floating">
                                  {" "}
                                  Last Name:
                                </IonLabel>
                                <IonInput
                                  placeholder="Last Name"
                                  value={contactSecondName}
                                  onIonChange={(e) =>
                                    setContactSecondName(e.detail.value!)
                                  }
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
                                  placeholder="phone"
                                  value={contactPhone}
                                  onIonChange={(e) =>
                                    setContactPhone(e.detail.value!)
                                  }
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
                                  placeholder="email"
                                  value={contactEmail}
                                  onIonChange={(e) =>
                                    setContactEmail(e.detail.value!)
                                  }
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
                          <IonRow>
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
                          </IonRow>
                        </IonGrid>
                      </IonContent>
                    </IonModal>
                  </IonCardContent>
                </IonCard>
              </IonCol>

            </IonRow>
          ))}
          {/* </IonContent> */}

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
        </IonContent>
        <Advertisements />
      </IonPage>
    </>
  );
};

export default MyEvent;
