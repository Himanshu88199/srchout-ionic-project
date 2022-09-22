import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  // IonInput,
  // IonLabel,
  IonPage,
  IonRow,
  useIonViewWillEnter,
  // IonText,
  // IonTextarea,
} from "@ionic/react";
import Header from "../Header";
import "./CreatePersonalTask.css";
// import Footer from "../../components/Footer";
import "./Mytask.css";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { Advertisements } from "../Advertisements";
import moment from "moment";

const Mytask: React.FC = () => {
  const history = useHistory()
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [taskType, setTaskType] = useState("personal");

  const url = "https://taskerr-api.herokuapp.com/api/v1/tasks?type=";

  const fetchData = () => {
    const abortCnt = new AbortController();
    const token = sessionStorage.getItem("token");

    fetch(url + taskType, {
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
          //console.log(res);
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

    return () => abortCnt.abort();
  };

  useEffect(() => {
    fetchData();
  }, [taskType]);

  useIonViewWillEnter(() => {
    fetchData();
  });
  const updateTaskCompleted = (id: number, name: string) => {
    const abortCnt = new AbortController();
    const token = sessionStorage.getItem("token");

    let url = "https://taskerr-api.herokuapp.com/api/v1/tasks/" + id;

    fetch(url, {
      signal: abortCnt.signal,
      method: "PUT",
      headers: {
        "api-token": token!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        status: "C",
      }),
    })
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          fetchData();
          return res.json();
        } else if (res.status === 400) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then((res) => {
        if (res) {
          return true;
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

  const onCheckboxChange = (e: any) => {
    let task_id = e.target.value;
    let task_name = e.target.getAttribute("data-task-name");
    updateTaskCompleted(task_id, task_name);
    var item = e.target;
    item.disabled = true;
    item.parentNode.disabled = true;
    setShowToast(true);
  };

  const handleEdit = (e: any) => {
    if (typeof e.target.checked === "undefined") {
      let task_id = e.target.getAttribute("data-task-id");
      history.push("/my/createpersonaltask?id=" + task_id);
    }
  };

  return (
    <>
      <IonPage className="pg-grey">
        <Header />
        <IonContent>
          <IonRow>
            <IonCol className="center text-grey">TASKS</IonCol>
          </IonRow>
          <IonRow>
            <IonCol class="tasks-btns">
              <button className={taskType === "personal" ? "event-btn event-btn-clicked" : "event-btn"} onClick={() => setTaskType("personal")}>My Tasks</button>
              <button className={taskType === "assigned" ? "event-btn event-btn-clicked" : "event-btn"} onClick={() => setTaskType("assigned")}>Assigned tasks</button>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton
                className="add-btn"
                style={{ float: "right" }}
                onClick={() => history.push("/my/createpersonaltask")}
              >
                +Task
              </IonButton>
            </IonCol>
          </IonRow>
          {data && (
            <IonList className="personal-task-list">
              {data.map((i: any, index: number) => (
                i.status == null ?
                  <IonItem
                    lines="none"
                    key={index}
                    button
                    className={
                      index % 2
                        ? `personal-tasks-card-even`
                        : `personal-tasks-card-odd`
                    }
                  >
                    <IonCheckbox
                      data-task-name={i.name}
                      value={i.id}
                      onIonChange={(e) => onCheckboxChange(e)}
                    ></IonCheckbox>
                    <IonLabel
                      className="ion-text-wrap ion-text-capitalize"
                      data-task-id={i.id}
                      onClick={handleEdit}
                    >
                      <p>{i.name}</p>
                      {i.description} <br />
                      <small>Due: {moment(i.due_date).format('lll')}</small>
                    </IonLabel>
                  </IonItem> : null
              ))}
            </IonList>
          )}
          {/* <IonRow className="tasks">
            <IonCol className="pd-0 event" size="12">
              <IonText className="light-text">Car oil change</IonText>
            </IonCol>
            <IonCol className="pd-0 event" size="12">
              <IonText className="light-text">
                <span>Due:</span> Aug 20, 2022
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow className="tasks">
            <IonCol className="pd-0 event" size="12">
              <IonText className="light-text">Car oil change</IonText>
            </IonCol>
            <IonCol className="pd-0 event" size="12">
              <IonText className="light-text">
                <span>Due:</span> Aug 20, 2022
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow className="tasks">
            <IonCol className="pd-0 event" size="12">
              <IonText className="light-text">Car oil change</IonText>
            </IonCol>
            <IonCol className="pd-0 event" size="12">
              <IonText className="light-text">
                <span>Due:</span> Aug 20, 2022
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow className="tasks">
            <IonCol className="pd-0 event" size="12">
              <IonText className="light-text">Car oil change</IonText>
            </IonCol>
            <IonCol className="pd-0 event" size="12">
              <IonText className="light-text">
                <span>Due:</span> Aug 20, 2022
              </IonText>
            </IonCol>
          </IonRow> */}

          {/* <Footer /> */}
          <Advertisements />

        </IonContent>
      </IonPage>
    </>
  );
};

export default Mytask;
