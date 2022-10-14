import {
  IonButton,
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
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Advertisements } from "../Advertisements";
import Header from "../Header";
import "./EventDetails.css";
import moment from "moment";
import { addOutline, closeCircleOutline } from "ionicons/icons";
import Service from "../../services/http";
import PhoneInput from "react-phone-input-2";

const EventDetails: React.FC = () => {
  const history = useHistory();

  const { search } = useLocation();
  const id = search.split("?id=")[1];
  //console.log(id);

  const initialStateEvent = {
    detail: "",
    event_at: "",
    id: "",
    location: "",
    name: "",
  };
  const initialAttendeeData = {
    phone: "+91",
    email: "",
    event_id: "",
    fname: "",
    lname: "",
  };
  const [attendeeData, setAttendeeData] = useState(initialAttendeeData);
  const initialErrors = {
    fname: false,
    lname: false,
  };

  const [errors, setErrors] = useState(initialErrors);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [eventData, setEventData] = useState(initialStateEvent);
  const [attendees, setAttendess] = useState<any>([]);
  const [open, setOpen] = useState<any>(false);
  const [tasks, setTasks] = useState<any>([]);
  const [errorAddAttendee, setErrorAddAteendee] = useState(false);
  const [messageAddAttendee, setMessageAttendee] = useState("");

  const fetchEventById = (id: any) => {
    const request = new Service();

    request.get(`events/${id}`).then((result: any) => {
      if (result.err) {
        setMessage(result.err.message);
        setError(true);
      } else {
        setEventData(result.data);
      }
    });
  };
  const fetchAttendees = (id: any) => {
    const request = new Service();

    request.get(`guests/${id}`).then((result: any) => {
      if (result.err) {
        setMessage(result.err.message);
        setError(true);
      } else {
        setAttendess(result.data);
      }
    });
  };
  const fetchTasks = (id: any) => {
    const request = new Service();

    request.get(`tasks?eventid=${id}`).then((result: any) => {
      if (result.err) {
        setMessage(result.err.message);
        setError(true);
      } else {
        setTasks(result.data);
      }
    });
  };
  const closeModal = () => {
    setOpen(false);
    setAttendeeData(initialAttendeeData);
  };
  const openModal = () => {
    setOpen(true);
    setAttendeeData({
      ...attendeeData,
      event_id: id,
    });
  };
  const submitFormAttendee = (e: any) => {
    e.preventDefault();
    //console.log(attendeeData);
    if (!errors.fname && !errors.lname) {
      const request = new Service();
      request.post(`guests`, attendeeData).then((result: any) => {
        if (result.err) {
          setMessageAttendee(result.err.message);
          setErrorAddAteendee(true);
        } else {
          setAttendeeData(initialAttendeeData);
          fetchAttendees(id);
          closeModal();
        }
      });
    }
  };
  const onChangeHandler = (e: any) => {
    setAttendeeData({
      ...attendeeData,
      [e.target.name]: e.detail.value,
    });
    if (e.target.name === "fname" || e.target.name === "lname") {
      setErrors({
        ...errors,
        [e.target.name]: !/^[A-Za-z ]+$/.test(e.target.value),
      });
    }
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
                <IonLabel className="dark-text"> Event: </IonLabel>
                <IonText>{eventData.name}</IonText>
              </IonCol>
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Location: </IonLabel>
                <IonText>{eventData.location}</IonText>
              </IonCol>
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Date: </IonLabel>
                <IonText>{moment(eventData.event_at).format("ll")}</IonText>
              </IonCol>
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Time: </IonLabel>
                <IonText>
                  {moment(eventData.event_at).format("hh:mm a")}
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow className="text-grey2 mt-9">
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Total Invitees: </IonLabel>
                <IonText>{attendees.length}</IonText>
              </IonCol>
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Accepted: </IonLabel>
                <IonText>
                  {
                    attendees.filter((attend: any) => attend.rvsp === "yes")
                      .length
                  }
                </IonText>
              </IonCol>
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Declined: </IonLabel>
                <IonText>
                  {
                    attendees.filter((attend: any) => attend.rvsp === "no")
                      .length
                  }
                </IonText>
              </IonCol>
              <IonCol className="pd-0 " size="12">
                <IonLabel className="dark-text"> Undecided: </IonLabel>
                <IonText>
                  {
                    attendees.filter((attend: any) => attend.rvsp == null)
                      .length
                  }
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow className="text-grey2 mt-8">
              <IonCol size="12">
                <IonLabel className="dark-text"> Invitees: </IonLabel>
              </IonCol>
              <IonCol>
                <IonRow>
                  {attendees.map((attend: any) => {
                    return (
                      <IonCol key={attend.id} className="pd-0 pb-0" size="12">
                        {attend.fname} {attend.lname} -{" "}
                        {attend.rsvp !== null
                          ? attend.rsvp === "yes"
                            ? "Accepted"
                            : "Declined"
                          : "Undecided"}
                      </IonCol>
                    );
                  })}
                </IonRow>
              </IonCol>
            </IonRow>
            <IonRow className="text-grey2 mt-16" style={{ width: "100%" }}>
              <IonCol size="12">
                <IonLabel className="dark-text"> Tasks :</IonLabel>
              </IonCol>
              <IonCol>
                <IonRow>
                  {tasks.map((item: any, index: number) => {
                    const assignee = attendees.filter(
                      (attend: any) => attend.id === item.assigned_to
                    )[0];
                    return (
                      <IonCol key={index} className="pd-0 pb-0" size="12">
                        {item.name}{" "}
                        {assignee && `- ${assignee.fname} ${assignee.lname}`}
                      </IonCol>
                    );
                  })}
                </IonRow>
              </IonCol>
            </IonRow>
            <IonCol
              className="pd-0 events-icons"
              size="12"
              style={{ float: "right", marginTop: "20px" }}
            >
              <img
                className="user-img user"
                src="../../../assets/users.svg"
                alt=""
                onClick={() => openModal()}
              />
              <img
                className="user-img"
                src="../../../assets/tick.svg"
                alt=""
                onClick={() =>
                  history.push(
                    `/my/createeventtask?id=${id}&eventName=${eventData.name}`
                  )
                }
              />
              <img
                className="user-img"
                src="../../../assets/edit.svg"
                alt=""
                onClick={() => history.push("/my/createevent?id=" + id)}
              />
            </IonCol>
          </IonRow>
          <IonModal
            isOpen={open}
            onDidDismiss={closeModal}
            // breakpoints={[0, 0.5, 1]}
            // initialBreakpoint={1}
            // backdropBreakpoint={0.2}
          >
            <IonHeader className="modal-header">
              <IonToolbar color="primary">
                {/* <IonTitle className="modal-title">Add Attendees</IonTitle> */}
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
              <IonRow>
                <IonCol className="center text-grey">ADD ATTENDEES</IonCol>
              </IonRow>
              <form onSubmit={submitFormAttendee}>
                <IonRow>
                  <IonCol size="12" className="text-grey2 pb-0 ml-5">
                    First Name
                  </IonCol>
                  <IonCol className="pd-0" size="12">
                    <IonInput
                      required
                      type="text"
                      className="input-border"
                      value={attendeeData.fname}
                      name="fname"
                      onIonChange={onChangeHandler}
                    ></IonInput>
                    {errors.fname && (
                      <small style={{ color: "red" }}>First Name Invalid</small>
                    )}
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12" className="text-grey2 pb-0 ml-5">
                    Last Name
                  </IonCol>
                  <IonCol className="pd-0" size="12">
                    <IonInput
                      required
                      type="text"
                      className="input-border"
                      value={attendeeData.lname}
                      name="lname"
                      onIonChange={onChangeHandler}
                    ></IonInput>
                    {errors.lname && (
                      <small style={{ color: "red" }}>Last Name Invalid</small>
                    )}
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12" className="text-grey2 pb-0 ml-5">
                    Phone
                  </IonCol>
                  <IonCol className="pd-0 pd-p" size="12">
                    <PhoneInput
                      countryCodeEditable={false}
                      country={"us"}
                      onChange={(phone) =>
                        setAttendeeData({ ...attendeeData, phone: phone })
                      }
                      containerStyle={{
                        border: "1px solid #707070",
                        borderRadius: "9px",
                        width: "87vw",
                        height: "45px",
                      }}
                      inputStyle={{
                        width: "86vw",
                        height: "42px",
                        border: "none",
                        borderRadius: "9px",
                      }}
                      dropdownStyle={{ height: "200px" }}
                      buttonStyle={{
                        height: "30px",
                        margin: "7px",
                        borderRadius: "9px",
                      }}
                      value={attendeeData.phone}
                      inputProps={{ name: "phone", required: true }}
                      placeholder="Phone Number"
                    ></PhoneInput>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12" className="text-grey2 pb-0 ml-5">
                    Email
                  </IonCol>
                  <IonCol className="pd-0" size="12">
                    <IonInput
                      required
                      type="email"
                      className="input-border"
                      value={attendeeData.email}
                      name="email"
                      onIonChange={onChangeHandler}
                    ></IonInput>
                  </IonCol>
                </IonRow>
                <IonRow className="save-btn-row">
                  <IonCol className="m-auto">
                    <IonButton
                      className="sign-btn"
                      size="small"
                      expand="block"
                      type="submit"
                    >
                      Add
                    </IonButton>
                  </IonCol>
                </IonRow>
              </form>
            </IonContent>
          </IonModal>
        </IonContent>
        <IonToast
          isOpen={errorAddAttendee}
          onDidDismiss={() => {
            setErrorAddAteendee(false);
          }}
          message={messageAddAttendee}
          duration={400}
          color="dark"
        />
        <Advertisements />
      </IonPage>
    </>
  );
};
export default EventDetails;
