import { IonButton, IonCol, IonContent, IonDatetime, IonIcon, IonInput, IonLabel, IonModal, IonPage, IonRow, IonTextarea, IonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import Header from '../Header';
import './CreateEvent.css';
import { calendar } from "ionicons/icons"
import { useHistory, useLocation } from 'react-router';
import { Advertisements } from '../Advertisements';

const CreateEvent: React.FC = () => {

    const { search } = useLocation();
    const id = search.split('?id=')[1];
    //console.log(id);

    const [eventId, setEventId] = useState("");
    const [eventName, setEventName] = useState("")
    const [eventDesc, setEventDesc] = useState("")
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [eventLoc, setEventLoc] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [action, setAction] = useState(false);

    const history = useHistory()

    const formatDateForDB = (date: string, time: string) => {
        const dtArr = date.split('/');
        const newDate = `${dtArr[1]}/${dtArr[0]}/${dtArr[2]}`;
        return new Date(`${newDate} ${time}`).toISOString();
    };
    const createNewEvent = () => {
        const url = "https://taskerr-api.herokuapp.com/api/v1/events";
        const token = sessionStorage.getItem("token");

        const eventData = {
            name: eventName,
            detail: eventDesc,
            location: eventLoc,
            event_at: formatDateForDB(date, time),
            evnt_type: "personal",
        };
        // console.log(formatDateForDB(eventDate));

        // console.log(eventData,"eventData");
        //console.log(eventData);
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-token": token!,
            },
            body: JSON.stringify(eventData),
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
                if (res.error) {
                    setMessage(res.error);
                    setError(true);
                } else {
                    setSuccess(true);
                    setEventId(res.id);
                }
            })
            .catch((err) => {
                setMessage(err.message);
                setError(true);
            });
    };
    const updateEvent = (id: any) => {
        const url = "https://taskerr-api.herokuapp.com/api/v1/events/" + id;
        const token = sessionStorage.getItem("token");
        const abortCnt = new AbortController();
        let eventData = {
            name: eventName,
            detail: eventDesc,
            event_at: formatDateForDB(date, time),
            location: eventLoc,
        };
        let options = {
            signal: abortCnt.signal,
            method: "PUT",
            headers: {
                "api-token": token!,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(eventData),
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
                    setSuccess(true);
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
    const handleSaveEvent = (e: any) => {
        e.preventDefault();
        if (id) {
            updateEvent(id);
        } else {
            createNewEvent();
        }
    };

    const formatDate = (value: string) => {
        return format(parseISO(value), "MM/dd/yy hh:mm aaaa");
    };

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
                    setEventName(res.name);
                    setEventDesc(res.detail);
                    if (res.event_at !== null) {
                        const date = new Date(res.event_at).toLocaleDateString();
                        const time = new Date(res.event_at).toLocaleTimeString();
                        setDate(date);
                        setTime(time);
                    }
                    setEventLoc(res.location);
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

    const resetForm = () => {
        setEventName('');
        setEventDesc('');
        setDate("");
        setTime("");
        setEventLoc('');
    };
    useEffect(() => {
        resetForm();
        if (id) {
            fetchEventById(id);
        }
    }, [id]);

    return (
        <>
            <IonPage className='pg-grey'>
                <Header />
                <IonContent >
                    <IonRow>
                        <IonCol className='center text-grey'>
                            {id ? "EDIT" : "CREATE"} EVENT
                        </IonCol>
                    </IonRow>
                    <form onSubmit={handleSaveEvent}>
                        <IonRow>
                            <IonCol size='12' className='text-grey2 pb-0 ml-12' >
                                Event Name:
                            </IonCol>
                            <IonCol className='pd-0' size='12'>
                                <IonInput className='input-border pd' value={eventName} onIonChange={(e) => setEventName(e.detail.value!)}></IonInput>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='12' className='text-grey2 pb-0 ml-12'>
                                Event Description:
                            </IonCol>
                            <IonCol className='pd-0' size='12'>
                                <IonTextarea rows={3} className='input-border-2' value={eventDesc} onIonChange={(e) => setEventDesc(e.detail.value!)}></IonTextarea>
                            </IonCol>
                        </IonRow>
                        {/* <IonRow className='content'>
                            <IonCol size="8" className="ion-align-self-start text-grey2 pb-0 ml-10 ">
                                <IonLabel > Event Date:</IonLabel>
                                <IonInput value={dateForDisplay} className="border mt-10 mb-10 pd" />
                            </IonCol>
                            <IonCol size="2" className="ion-align-self-end ">
                                <IonButton id="open-modal" fill="clear">
                                    <IonIcon icon={calendar} />
                                </IonButton>
                                <IonModal trigger="open-modal" >
                                    <IonContent force-overscroll="false" className='modal'>
                                        <IonDatetime
                                            presentation="date-time"
                                            onIonChange={updateEventDate}
                                        ></IonDatetime>
                                        <IonButton onClick={() => history.push("/my/createevent")}>Done</IonButton>
                                    </IonContent>
                                </IonModal>
                            </IonCol>
                        </IonRow> */}
                        <IonRow className='date-time'>
                            <IonCol>
                                <IonLabel className='ml-12'>Event Date:</IonLabel>
                                <IonInput className='input-border col-50' value={date} onIonChange={(e) => setDate(e.detail.value ? e.detail.value : '')}></IonInput>
                            </IonCol>
                            <IonCol>
                                <IonLabel className='ml-12'>Event Time:</IonLabel>
                                <IonInput className='input-border col-50' value={time} onIonChange={(e) => setTime(e.detail.value ? e.detail.value : '')}></IonInput>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='12' className='text-grey2 pb-0 ml-12'>
                                Event Location:
                            </IonCol>
                            <IonCol className='pd-0' size='12'>
                                <IonInput className='input-border pd' value={eventLoc} onIonChange={(e) => setEventLoc(e.detail.value!)}></IonInput>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className='m-auto mt-34' size='10.6'>
                                <IonButton className='save-btn' size='default' expand="block" type="submit">Save</IonButton>
                            </IonCol>
                        </IonRow>
                    </form>
                    <IonToast
                        isOpen={success}
                        onDidDismiss={() => {
                            if (action) {
                                setSuccess(false);
                                history.push("/my/createeventtask?id=" + eventId);
                            } else {
                                setSuccess(false);
                                history.push("/my/events");
                            }
                        }}
                        message={`Task has been ${id ? "updated" : "created"}`}
                        duration={200}
                        color="dark"
                    />
                    <Advertisements />

                </IonContent>
            </IonPage>
        </>
    );
};

export default CreateEvent;
