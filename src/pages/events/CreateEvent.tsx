import { IonButton, IonCol, IonContent, IonDatetime, IonIcon, IonInput, IonLabel, IonModal, IonPage, IonRow, IonTextarea } from '@ionic/react';
import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import Header from '../Header';
import './CreateEvent.css';
import { calendar } from "ionicons/icons"
import { useHistory } from 'react-router';

const CreateEvent: React.FC = () => {

    const [eventId, setEventId] = useState("");
    const [eventName, setEventName] = useState("")
    const [eventDesc, setEventDesc] = useState("")
    const [eventDate, setEventDate] = useState("");
    const [eventLoc, setEventLoc] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [dateForDisplay, setDateForDisplay] = useState("");

    const history = useHistory()

    const handleSaveEvent = (e: any) => {
        e.preventDefault();
        const url = "https://taskerr-api.herokuapp.com/api/v1/events";
        const token = sessionStorage.getItem("token");
        console.log(eventDate, "eventDateeventDate");

        const eventData = {
            name: eventName,
            detail: eventDesc,
            location: eventLoc,
            event_at: eventDate,
            evnt_type: "personal",
        };
        // console.log(formatDateForDB(eventDate));

        // console.log(eventData,"eventData");

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

    const formatDate = (value: string) => {
        return format(parseISO(value), "MM/dd/yy hh:mm aaaa");
    };

    const updateEventDate = (e: any) => {
        console.log(eventDate, "change");
        setEventDate(e.detail.value);
        setDateForDisplay(formatDate(e.detail.value));
        console.log(eventDate, "changedd");
        console.log(dateForDisplay, "dateForDisplay");
    };

    return (
        <>
            <IonPage className='pg-grey'>
                <Header />
                <IonContent >
                    <IonRow>
                        <IonCol className='center text-grey'>
                            CREATE EVENT
                        </IonCol>
                    </IonRow>
                    <form onSubmit={handleSaveEvent}>
                        <IonRow>
                            <IonCol size='12' className='text-grey2 pb-0 ml-12' >
                                Event Name:
                            </IonCol>
                            <IonCol className='pd-0' size='12'>
                                <IonInput className='input-border' value={eventName} onIonChange={(e) => setEventName(e.detail.value!)}></IonInput>
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
                        <IonRow className='content'>
                            <IonCol size="8" className="ion-align-self-start text-grey2 pb-0 ml-10 ">
                                <IonLabel > Event Date:</IonLabel>
                                <IonInput value={dateForDisplay} className="border mt-10 mb-10" />
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
                                    </IonContent>
                                </IonModal>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='12' className='text-grey2 pb-0 ml-12'>
                                Event Location:
                            </IonCol>
                            <IonCol className='pd-0' size='12'>
                                <IonInput className='input-border' value={eventLoc} onIonChange={(e) => setEventLoc(e.detail.value!)}></IonInput>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className='m-auto mt-34' size='10.6'>
                                <IonButton className='save-btn' size='default' expand="block" onClick={() => history.push("/events")}>Save</IonButton>
                            </IonCol>
                        </IonRow>
                    </form>
                </IonContent>
            </IonPage>
        </>
    );
};

export default CreateEvent;
