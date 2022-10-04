import { IonButton, IonCol, IonContent, IonInput, IonLabel, IonPage, IonRow, IonTextarea, IonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import Header from '../Header';
import './CreateEvent.css';
import { useHistory, useLocation } from 'react-router';
import { Advertisements } from '../Advertisements';
import Service from '../../services/http';

const CreateEvent: React.FC = () => {

    const { search } = useLocation();
    const id = search.split('?id=')[1];
    //console.log(id);

    const [eventName, setEventName] = useState("")
    const [eventDesc, setEventDesc] = useState("")
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventLoc, setEventLoc] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [action, setAction] = useState(false);

    const history = useHistory()

    const createNewEvent = () => {
        const eventData = {
            name: eventName,
            detail: eventDesc,
            location: eventLoc,
            event_at: `${eventDate}T${eventTime}`,
            evnt_type: "personal",
        };
        const request = new Service();

        request.post('events', eventData)
            .then((result: any) => {
                if (result.err) {
                    setMessage(result.err.message);
                    setError(true);
                } else {
                    setSuccess(true);
                }
            });
    };
    const updateEvent = (id: any) => {
        let eventData = {
            name: eventName,
            detail: eventDesc,
            event_at: `${eventDate}T${eventTime}`,
            location: eventLoc,
        };
        const request = new Service();

        request.put(`events/${id}`, eventData)
            .then((result: any) => {
                if (result.err) {
                    setMessage(result.err.message);
                    setError(true);
                } else {
                    setSuccess(true);
                }
            });
    };
    const handleSaveEvent = (e: any) => {
        e.preventDefault();
        if (id) {
            updateEvent(id);
        } else {
            createNewEvent();
        }
    };

    const fetchEventById = (id: any) => {

        const request = new Service();

        request.get(`events/${id}`)
            .then((result: any) => {
                if (result.err) {
                    setMessage(result.err.message);
                    setError(true);
                } else {
                    setEventName(result.data.name);
                    setEventDesc(result.data.detail);
                    if (result.data.event_at !== null) {
                        const evdate = result.data.event_at.split('T');
                        setEventTime(evdate[1]);
                        setEventDate(evdate[0]);
                    }
                    setEventLoc(result.data.location);
                }
            });
    };

    const resetForm = () => {
        setEventName('');
        setEventDesc('');
        setEventDate('');
        setEventTime('');
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
                                <IonInput required className='input-border pd' value={eventName} onIonChange={(e) => setEventName(e.detail.value!)}></IonInput>
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
                        <IonRow className='date-time'>
                            <IonCol>
                                <IonLabel className='text-grey2 pb-0 ml-12'>Event Date:</IonLabel>
                                <IonInput required className='input-border col-50' value={eventDate} onIonChange={(e: any) => setEventDate(e.detail.value)} type="date"></IonInput>
                            </IonCol>
                            <IonCol>
                                <IonLabel className='text-grey2 pb-0 ml-12'>Event Time:</IonLabel>
                                <IonInput required className='input-border col-50' value={eventTime} onIonChange={(e: any) => setEventTime(e.detail.value)} type="time"></IonInput>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='12' className='text-grey2 pb-0 ml-12'>
                                Event Location:
                            </IonCol>
                            <IonCol className='pd-0' size='12'>
                                <IonInput required className='input-border pd' value={eventLoc} onIonChange={(e) => setEventLoc(e.detail.value!)}></IonInput>
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
                            } else {
                                setSuccess(false);
                                history.push("/my/events");
                            }
                        }}
                        message={`Event has been ${id ? "updated" : "created"}`}
                        duration={200}
                        color="success"
                    />
                    <Advertisements />
                </IonContent>
            </IonPage>
        </>
    );
};

export default CreateEvent;
