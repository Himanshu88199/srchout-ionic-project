import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Advertisements } from '../Advertisements';
import Header from '../Header';
import './InviteAttendees.css';

const InviteAttendees: React.FC = () => {

    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [attend, getAttendend] = useState([]);

    const history = useHistory();
    const { id } = useParams<{ id: string }>();

    const guesturl = "https://taskerr-api.herokuapp.com/api/v1/guests/" + id;
    const [attendid, setAttended_id] = useState<any>(null);

    const fetchData = () => {
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
    useEffect(() => {
        fetchData();
    }, []);

    const openModal = (id: any) => {
        // setOpen(true);
        // eventid(id);
        fetchAttendies(id);
    };

    const fetchAttendies = (attend_id: number) => {
        const abortCnt = new AbortController();
        const token = sessionStorage.getItem("token");
        setAttended_id(attend_id);
        const guesturl =
            "https://taskerr-api.herokuapp.com/api/v1/guests/" + id + "/" + attend_id;

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
                    console.log(res, "res");
                    // setContactFirstName(res.fname);
                    // setContactSecondName(res.lname);
                    // setContactEmail(res.email);
                    // setContactPhone(res.phone);
                    // setPhonecode(res.countrycode);
                    // getAttendend(res);
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
        const url =
            "https://taskerr-api.herokuapp.com/api/v1/guests/" + id + "/" + attendid;
        const token = sessionStorage.getItem("token");
        // console.log(eventDate,"eventDateeventDate");

        const eventData = {
            // fname: contactFirstName,
            // lname: contactSecondName,
            // event_id: id,
            // countrycode: phonecodevalu,
            // phone: contactPhone,
            // rsvp: "yes",
            // email: contactEmail,
        };
        // console.log(formatDateForDB(eventDate));

        // console.log(eventData,"eventData");

        fetch(url, {
            method: "PUT",
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
                    // closeModal();
                    fetchData();
                }
            })
            .catch((err) => {
                setMessage(err.message);
                setError(true);
            });
    };

    return (
        <>
            <IonPage className='pg-grey'>
                <Header />
                <IonContent>
                    <IonRow>
                        <IonCol className='center text-grey'>
                            INVITE ATTENDEES
                        </IonCol>
                    </IonRow>
                    <form onSubmit={handleSaveEvent}>
                        <IonRow>
                            <IonCol size='12' className='text-grey2 pb-0 ml-10'>
                                Event Name:
                            </IonCol>
                            <IonCol className='pd-0' size='12'>
                                <IonInput className='input-border'></IonInput>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size='12' className='text-grey2 pb-0 ml-10'>
                                Invite Attendees:
                            </IonCol>
                            <IonCol className='pd-0' size='12'>
                                <IonTextarea rows={10} className='input-border-2'></IonTextarea>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className='m-auto mt-41' size='11'>
                                <IonButton className='sign-btn' size='default' expand="block" onClick={() => history.push("/my/mytask")}>Save</IonButton>
                            </IonCol>
                        </IonRow>
                    </form>
                    <Advertisements />
                </IonContent>
            </IonPage>
        </>
    );
};

export default InviteAttendees;
