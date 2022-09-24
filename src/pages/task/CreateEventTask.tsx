import { IonButton, IonCol, IonContent, IonInput, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea, IonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router';
import Service from '../../services/http';
import { Advertisements } from '../Advertisements';
import Header from '../Header';
import './CreateEventTask.css';

const CreateEventTask: React.FC = () => {
    const history = useHistory();
    const { search } = useLocation();
    const params = search.split('&eventName=');
    const eventName = decodeURIComponent(params[1]);
    const id = params[0].split('?id=')[1];
    //console.log(id, eventName);
    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [attend, getAttendend] = useState([]);
    const [eventDate, setEventDate] = useState("");
    const [taskAssignTo, setTaskAssignTo] = useState("");



    const handleCreateTask = (e: any) => {
        e.preventDefault();
        var taskData = {
            name: taskName,
            description: taskDesc,
            due_date: eventDate,
            task_type: "event",
            event_id: id,
            assigned_to: taskAssignTo,
        };

        const request = new Service();
        request.post(`tasks`, taskData)
            .then((result: any) => {
                if (result.err) {
                    setMessage(result.err.message);
                    setError(true);
                } else {
                    setTaskName("");
                    setTaskDesc("");
                    setEventDate("");
                    setTaskAssignTo("");
                    setSuccess(true);
                }
            })
    };

    const fetchAttendies = () => {

        const request = new Service();
        request.get(`guests/${id}`)
            .then((result: any) => {
                if (result.err) {
                    setMessage(result.err.message);
                    setError(true);
                } else {
                    getAttendend(result.data);
                }
            })
    };

    const assignHandler = (e: any) => {
        setTaskAssignTo(e.detail.value);
    };
    useEffect(() => {
        fetchAttendies();
    }, [id]);
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
                        <IonRow>
                            <IonCol size='12' className='text-grey2 pb-0 ml-10'>
                                Event Name:
                            </IonCol>
                            <IonCol className='pd-0' size='12'>
                                <IonInput className='input-border pd' value={eventName}></IonInput>
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
                                <IonInput type="datetime-local" className='input-border pd' value={eventDate} onIonChange={(e: any) => setEventDate(e.detail.value)}></IonInput>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='12' className='text-grey2 pb-0 ml-10'>
                                Assign Task To:
                            </IonCol>
                            <IonCol className='pd-0' size='12'>
                                <IonSelect className='input-border pd' placeholder="Select Assignees" value={taskAssignTo} onIonChange={(e: any) => assignHandler(e)}>
                                    {attend.map((item: any, index: number) => {
                                        return (
                                            <IonSelectOption key={index} value={item.id}>{item.fname} {item.lname}</IonSelectOption>
                                        )
                                    })}
                                </IonSelect>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className='m-auto mt-34' size='10.7'>
                                <IonButton className='save-btn' size='default' expand="block" type="submit">Save</IonButton>
                            </IonCol>
                        </IonRow>
                    </form>
                    <IonToast
                        isOpen={success}
                        onDidDismiss={() => {
                            setSuccess(false);
                            history.goBack();
                        }}
                        message="Task has been created"
                        duration={200}
                        color="dark"
                    />
                    <IonToast
                        isOpen={error}
                        onDidDismiss={() => {
                            setError(false);
                        }}
                        message={message}
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
