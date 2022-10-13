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
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonViewWillEnter,

} from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import moment from "moment";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useHistory } from "react-router";
import Service from "../../services/http";
import { Advertisements } from "../Advertisements";
import Header from "../Header";
import "./MyEvent.css";

const MyEvent: React.FC = () => {
  const history = useHistory()

  const initialAttendeeData = {
    phone: '+1',
    email: '',
    event_id: '',
    fname: '',
    lname: ''
  };
  const [attendeeData, setAttendeeData] = useState(initialAttendeeData);
  const initialErrors = {
    fname: false,
    lname: false,
  };

  const [errors, setErrors] = useState(initialErrors);

  const [eventType, setEventType] = useState("personal");
  const [data, setData] = useState<any>(null);
  const [open, setOpen] = useState<any>(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [errorAddAttendee, setErrorAddAteendee] = useState(false);
  const [messageAddAttendee, setMessageAttendee] = useState("");

  const fetchData = () => {
    const request = new Service();

    request.get(`events?type=${eventType}`)
      .then((result: any) => {
        if (result.err) {
          setMessage(result.err.message);
          setError(true);
        } else {
          setData(result.data);
        }
      })
  };
  // const service = new Service();

  useEffect(() => {
    fetchData();
  }, [eventType]);
  useIonViewWillEnter(() => {
    fetchData();
  });

  const handleClick = (e: any) => {
    e.preventDefault();
    var id = e.target.getAttribute("data-event-id");
    history.push("/my/createevent?id=" + id);
  };
  const closeModal = () => {
    setOpen(false);
    setAttendeeData(initialAttendeeData);
  };
  const openModal = (id: any) => {
    setOpen(true);
    setAttendeeData({
      ...attendeeData,
      event_id: id
    });
  };

  const submitFormAttendee = (e: any) => {
    e.preventDefault();
    //console.log(attendeeData);
    if (!errors.fname && !errors.lname) {
      const request = new Service();
      request.post(`guests`, attendeeData)
        .then((result: any) => {
          if (result.err) {
            setMessageAttendee(result.err.message);
            setErrorAddAteendee(true);
          } else {
            setAttendeeData(initialAttendeeData);
            closeModal();
          }
        });
    }
  };
  const onChangeHandler = (e: any) => {
    setAttendeeData({
      ...attendeeData,
      [e.target.name]: e.detail.value
    });
    if (e.target.name === "fname" || e.target.name === "lname") {
      setErrors({
        ...errors,
        [e.target.name]: !(/^[A-Za-z ]+$/.test(e.target.value))
      })
    }
  };

  return (
    <>
      <IonPage className="pg-grey">
        <Header />
        <IonContent className="white-head page-content">
          <IonRow >
            <IonCol className="center text-grey event-heading">EVENTS</IonCol>
          </IonRow>
          <IonRow>
            <IonCol class="events-btns">
              <button className={eventType === "personal" ? "event-btn event-btn-clicked" : "event-btn"} onClick={() => setEventType("personal")}>My Events</button>
              <button className={eventType === "invited" ? "event-btn event-btn-clicked" : "event-btn"} onClick={() => setEventType("invited")}>Invited Events</button>
            </IonCol>
          </IonRow>
          {/* <IonContent className="setheight"> */}

          {data && data?.map((i: any, index: number) => (
            <IonRow key={index} >
              <IonCol>
                <IonCard className="card events" style={{ background: index % 2 ? '#fff' : '#eee' }}>
                  <IonCardContent className="event-content">
                    <IonGrid className={index % 2 ? 'even-event events' : 'odd-event events'} onClick={() => history.push('/my/eventdetails?id=' + i.id)}>
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
                        <IonCol>{moment(i.event_at).format("ll")}</IonCol>
                      </IonRow>
                      <IonRow className="start">
                        <p>Time:</p>
                        <IonCol>{moment(i.event_at).format('hh:mm a')}</IonCol>
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
                      <img className="user-img" src="../../../assets/tick.svg" alt="" onClick={() => history.push(`/my/createeventtask?id=${i.id}&eventName=${i.name}`)} />
                      <img className="user-img" src="../../../assets/edit.svg" alt=""
                        onClick={handleClick}
                        data-event-id={i.id}
                      />
                    </IonCol>
                  </IonCardContent>
                </IonCard>
              </IonCol>

            </IonRow>
          ))}
          <IonModal
            isOpen={open}
            onDidDismiss={closeModal}
          //breakpoints={[0, 0.5, 1]}
          //initialBreakpoint={1}
          //backdropBreakpoint={0.2}
          >
            <IonHeader>
              <IonToolbar color="primary" className="modal-header">
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
                <IonCol className='center text-grey'>
                  ADD ATTENDEES
                </IonCol>
              </IonRow>
              <form onSubmit={submitFormAttendee}>
                <IonRow>
                  <IonCol size="12" className="text-grey2 pb-0">
                    First Name
                  </IonCol>
                  <IonCol className="pd-0" size="12">
                    <IonInput required type="text" className="input-border" value={attendeeData.fname} name="fname" onIonChange={onChangeHandler}></IonInput>
                    {errors.fname && (
                      <small style={{ color: 'red' }}>First Name Invalid</small>
                    )}
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12" className="text-grey2 pb-0">
                    Last Name
                  </IonCol>
                  <IonCol className="pd-0" size="12">
                    <IonInput required type="text" className="input-border" value={attendeeData.lname} name="lname" onIonChange={onChangeHandler}></IonInput>
                    {errors.lname && (
                      <small style={{ color: 'red' }}>Last Name Invalid</small>
                    )}
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12" className="text-grey2 pb-0">
                    Phone
                  </IonCol>
                  <IonCol >
                    <PhoneInput
                      country={"us"}
                      onChange={phone => setAttendeeData({ ...attendeeData, phone: phone })}
                      containerStyle={{ border: '1px solid #707070', borderRadius: '9px', width: '87vw', height: '45px' }}
                      inputStyle={{ width: '86vw', height: '42px', border: 'none', borderRadius: '9px' }}
                      dropdownStyle={{ height: '500px', backgroundColor: '#ffffff' }}
                      buttonStyle={{ height: '30px', margin: '7px', borderRadius: '9px' }}
                      value={attendeeData.phone}
                      inputProps={{ name: 'phone', required: true }}
                      placeholder="Phone Number"
                    >
                    </PhoneInput>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12" className="text-grey2 pb-0">
                    Email
                  </IonCol>
                  <IonCol className="pd-0" size="12">
                    <IonInput required type="email" className="input-border" value={attendeeData.email} name="email" onIonChange={onChangeHandler}></IonInput>
                  </IonCol>
                </IonRow>
                <IonRow className="save-btn-row">
                  <IonCol className="m-auto">
                    <IonButton className="sign-btn" size="small" expand="block" type="submit">
                      Add
                    </IonButton>
                  </IonCol>
                </IonRow>
              </form>
            </IonContent>
          </IonModal>
          <IonButton className="add-btn" fill="clear" routerLink='/my/createevent' size="small">
            <IonIcon color="white" src="../../../assets/plus_icon.svg" />
          </IonButton>

          <IonToast
            isOpen={errorAddAttendee}
            onDidDismiss={() => {
              setErrorAddAteendee(false);
            }}
            message={messageAddAttendee}
            duration={400}
            color="dark"
          />
        </IonContent>
        <Advertisements />
      </IonPage >
    </>
  );
};

export default MyEvent;
