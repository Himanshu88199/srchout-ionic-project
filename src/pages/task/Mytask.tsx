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

const Mytask: React.FC = () => {
  const history = useHistory()
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);


  const url = "https://taskerr-api.herokuapp.com/api/v1/tasks?type=personal";

  const fetchData = () => {
    const abortCnt = new AbortController();
    const token = sessionStorage.getItem("token");

    fetch(url, {
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
  }, []);

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
      history.push("/update_personal_task/" + task_id);
    }
  };
  const getFormattedDate = (dateStr: string) => {
    if (dateStr !== null) {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    }
    return;
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
              <button className="event-btn">My tasks</button>
              <button className="event-btn ">Assigned tasks</button>
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
                    onClick={handleEdit}
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
                    >
                      {i.description}
                      <br /> Due: {getFormattedDate(i.due_date)}
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
          <IonButton
            className="add-btn"
            style={{ float: "right" }}
            onClick={() => history.push("/createeventtask")}
          >
            +Task
          </IonButton>
          <Advertisements />

        </IonContent>
      </IonPage>
    </>
  );
};

export default Mytask;
