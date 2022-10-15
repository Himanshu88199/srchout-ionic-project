import {
  IonCheckbox,
  IonCol,
  IonContent,
  // IonGrid,
  // IonHeader,
  // IonIcon,
  // IonInput,
  // IonItem,
  IonLabel,
  IonPage,
  // IonRouterOutlet,
  IonRow,
  // IonTabBar,
  // IonTabButton,
  // IonTabs,
  IonText,
  // IonTitle,
  // IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useEffect, useState } from "react";
// import { IonReactRouter } from "@ionic/react-router";
// import { Route, Redirect } from "react-router";
import Footer from "../../components/Footer";
import EventsPage from "../events/EventsPage";
import Header from "../Header";
// import Setting from "../settings/Setting";

import "./Assignedtasks.css";

const Assignedtasks: React.FC = () => {


  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [data, setData] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);

  const url = "https://taskerr-api.herokuapp.com/api/v1/tasks?type=assigned";

  const fetchData = () => {
    const abortCnt = new AbortController();
    const token = sessionStorage.getItem("token");

    fetch(url, {
      signal: abortCnt.signal,
      method: "GET",
      headers: {
        "api-token": token!,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else if (res.status === 400) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      }).then((res) => {

        if (res) {

          setData(res);
        } else if (res.error) {
          setMessage(res.error);
          setError(true);
        }
      }).catch(err => {
        setMessage(err.message);
        setError(true);
      });

    return () => abortCnt.abort();
  }

  useEffect(() => {
    fetchData();
  }, []);

  useIonViewWillEnter(() => {
    fetchData();
  });

  const updateTask = (id: number, name: string, type: string) => {
    const abortCnt = new AbortController();
    const token = sessionStorage.getItem("token");

    let url = "https://taskerr-api.herokuapp.com/api/v1/tasks/" + id;

    fetch(url, {
      signal: abortCnt.signal,
      method: "PUT",
      headers: {
        "api-token": token!,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "status": type
      })
    })
      .then(res => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else if (res.status === 400) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      }).then((res) => {
        if (res) {
          return true;
        } else if (res.error) {
          setMessage(res.error);
          setError(true);
        }
      }).catch(err => {
        setMessage(err.message);
        setError(true);
      });

    return () => abortCnt.abort();

  }

  const handleAccept = (e: any) => {
    e.preventDefault();
    var id = e.target.getAttribute("data-id");
    let name = e.target.getAttribute("data-name");
    var chk_id = "chk-" + id;
    var btn_accept_id = "btn-accept-" + id;
    var btn_reject_id = "btn-reject-" + id;
    var chkbox = document.getElementById(chk_id);
    chkbox!.style.visibility = "visible";
    var btn_accept = document.getElementById(btn_accept_id);
    btn_accept?.setAttribute("hidden", "true");
    var btn_reject = document.getElementById(btn_reject_id);
    btn_reject?.setAttribute("hidden", "true");
    updateTask(id, name, "A");
  }

  const handleReject = (e: any) => {
    e.preventDefault();
    let id = e.target.getAttribute("data-id");
    let name = e.target.getAttribute("data-name");
    e.target.parentNode.parentNode.parentNode.parentNode.hidden = true;
    updateTask(id, name, "R");
  }

  const onCheckboxChange = (e: any) => {
    let id = e.target.value;
    let name = e.target.getAttribute("data-name");
    updateTask(id, name, "C");
    e.target.disabled = true;
    e.target.parentNode.disabled = true;
    setShowToast(true);
  }

  return (
    <>
      <IonPage className="pg-grey">
        <Header />
        <IonContent>
          <EventsPage />
          <IonRow>
            <IonCol>
              <p className="event-heading">TASKS</p>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol class="events-btns">
              <button className="event-btn">My Tasks</button>
              <button className="event-btn ">Assigned Tasks</button>
            </IonCol>
          </IonRow>
          {
            data?.map((i: any, index: number) => (
              <IonRow className="events">
                <IonCol className="pd-0 event" size="12">
                  <IonLabel className="dark-text"> Event:</IonLabel>
                  <IonText>{i.name}</IonText>
                </IonCol>
                <IonCol>
                  <IonCheckbox id={`chk-${i.id}`}
                    data-name={i.name} value={i.id}
                    onIonChange={(e) => onCheckboxChange(e)}
                    style={{ visibility: (i.status === "A") ? 'visible' : 'hidden' }} ></IonCheckbox>
                  <IonLabel>{i.description}</IonLabel>
                </IonCol>
                {/* <IonCol className="pd-0 event" size="12">
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
                </IonCol> */}
                <IonCol className="pd-0 tasks-icons" size="12">
                  {
                    (i.status === null) &&
                    <div className="tasks-icon">
                      <img
                        className="task-img"
                        src="../../../assets/assigned-icon.svg"
                        alt=""
                        id={`btn-accept-${i.id}`}
                        data-id={i.id}
                        data-name={i.name}
                        onClick={handleAccept}
                      />
                      <p className="task-icon-text">Accept/Accepted</p>
                    </div>
                  }
                  {
                    (i.status === null) &&
                    <div className="tasks-icon">
                      <img
                        className="task-img"
                        src="../../../assets/discard-icon.svg"
                        alt=""
                        id={`btn-reject-${i.id}`}
                        data-id={i.id}
                        data-name={i.name}
                        onClick={handleReject}
                      />
                      <p className="task-icon-text declined-text">Decline/Declined</p>
                    </div>
                  }

                </IonCol>
              </IonRow>
            ))
          }
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
            <IonCol className="pd-0 tasks-icons" size="12">
              <div className="tasks-icon">
                <img
                  className="task-img"
                  src="../../../assets/assigned-icon.svg"
                  alt=""
                />
                <p className="task-icon-text">Accept/Accepted</p>
              </div>
              <div className="tasks-icon">
                <img
                  className="task-img"
                  src="../../../assets/discard-icon.svg"
                  alt=""
                />
                <p className="task-icon-text declined-text">Decline/Declined</p>
              </div>
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
            <IonCol className="pd-0 tasks-icons" size="12">
              <div className="tasks-icon">
                <img
                  className="task-img"
                  src="../../../assets/assigned-icon.svg"
                  alt=""
                />
                <p className="task-icon-text">Accept/Accepted</p>
              </div>
              <div className="tasks-icon">
                <img
                  className="task-img"
                  src="../../../assets/discard-icon.svg"
                  alt=""
                />
                <p className="task-icon-text declined-text">Decline/Declined</p>
              </div>
            </IonCol>
          </IonRow> */}
        </IonContent>
        <Footer />
      </IonPage>
    </>
  );
};

export default Assignedtasks;
