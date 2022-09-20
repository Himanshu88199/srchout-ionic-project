import { IonButton, IonCol, IonContent, IonInput, IonPage, IonRow, IonTextarea, IonToast } from '@ionic/react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Advertisements } from '../Advertisements';
import Header from '../Header';
import './CreateEventTask.css';

const CreateEventTask: React.FC = () => {
    const history = useHistory();

    const { event_id, event_name } = useParams<{
        event_id: string;
        event_name: string;
    }>();

    const event_id_modified = event_id ? event_id : null;
    const event_name_modified = event_name ? event_name : null;
    const [eventName, setEventName] = useState("");
    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [dateForDisplay, setDateForDisplay] = useState("");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [attend, getAttendend] = useState([]);
    const [eventDate, setEventDate] = useState("");
    const [taskAssignTo, setTaskAssignTo] = useState("");
    const [open, setOpen] = useState<any>(false);



    const handleCreateTask = (e: any) => {
        e.preventDefault();

        const url = "https://taskerr-api.herokuapp.com/api/v1/tasks";
        const token = sessionStorage.getItem("token");

        var taskData;
        if (typeof event_id != "undefined") {
            taskData = {
                name: taskName,
                description: taskDesc,
                due_date: eventDate,
                task_type: "event",
                event_id: event_id,
                assigned_to: taskAssignTo,
            };
        } else {
            taskData = {
                name: taskName,
                description: taskDesc,
                due_date: new Date("09/22/2022 19:00:00").toISOString(),
                task_type: "personal",
            };
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-token": token!,
            },
            body: JSON.stringify(taskData),
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
                }
            })
            .catch((err) => {
                setMessage(err.message);
                setError(true);
            });
    };

    const fetchAttendies = () => {
        const guesturl =
            "https://taskerr-api.herokuapp.com/api/v1/guests/" + event_id_modified;

        const abortCnt = new AbortController();
        const token = sessionStorage.getItem("token");

        fetch(guesturl, {
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
                    getAttendend(res);
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

    const openModal = () => {
        setOpen(true);
        fetchAttendies();
    };

    const assignAttendees = () => {
        openModal();
    };

    return (
        <>
            <IonPage className='pg-grey'>
                <Header />
                <IonContent>
                    <IonRow>
                        <IonCol className='center text-grey'>
                            CREATE EVENT TASK
                        </IonCol>
                    </IonRow>
                    <form onSubmit={handleCreateTask}>
                        {
                            event_id_modified && (
                                <IonRow>
                                    <IonCol size='12' className='text-grey2 pb-0 ml-10'>
                                        Event Name:
                                    </IonCol>
                                    <IonCol className='pd-0' size='12'>
                                        <IonInput className='input-border pd' value={event_name_modified} onIonChange={(e) => setEventName(e.detail.value!)}></IonInput>
                                    </IonCol>
                                </IonRow>
                            )
                        }
                        <IonRow>
                            <IonCol size='12' className='text-grey2 pb-0 ml-10'>
                                Event Name:
                            </IonCol>
                            <IonCol className='pd-0' size='12'>
                                <IonInput className='input-border pd' value={eventName} onIonChange={(e) => setEventName(e.detail.value!)}></IonInput>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='12' className='text-grey2 pb-0 ml-10'>
                                Task Name:
                            </IonCol>
                            <IonCol className='pd-0' size='12'>
                                <IonInput className='input-border pd' value={taskName} onIonChange={(e) => setTaskName(e.detail.value!)}></IonInput>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='12' className='text-grey2 pb-0 ml-10'>
                                Task Description:
                            </IonCol>
                            <IonCol className='pd-0' size='12'>
                                <IonTextarea rows={6} className='input-border-2' value={taskDesc} onIonChange={(e) => setTaskDesc(e.detail.value!)}></IonTextarea>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='12' className='text-grey2 pb-0 ml-10'>
                                Task Due Date:
                            </IonCol>
                            <IonCol className='pd-0' size='12'>
                                <IonInput className='input-border pd' value={dateForDisplay}></IonInput>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='12' className='text-grey2 pb-0 ml-10'>
                                Assign Task To:
                            </IonCol>
                            <IonCol className='pd-0' size='12'>
                                <IonInput className='input-border pd'>{taskAssignTo}</IonInput>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className='m-auto mt-34' size='10.7'>
                                <IonButton className='save-btn' size='default' expand="block" type="submit">Save</IonButton>
                            </IonCol>
                        </IonRow>
                        <IonButton
                            size="small"
                            fill="clear"
                            onClick={() => assignAttendees()}
                        >
                            Assign Attendees
                        </IonButton>
                    </form>
                    <IonToast
                        isOpen={success}
                        onDidDismiss={() => {
                            setSuccess(false);
                            history.push("/my/mytask");
                        }}
                        message="Task has been created"
                        duration={200}
                        color="dark"
                    />
                    <Advertisements />

                </IonContent>
            </IonPage>
        </>
    );
};

export default CreateEventTask;
