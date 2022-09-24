import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonCol,
  IonContent,
  IonIcon,
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
import Service from "../../services/http";

const Mytask: React.FC = () => {
  const history = useHistory()
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [taskType, setTaskType] = useState("personal");

  const fetchData = () => {
    const request = new Service();
    request.get(`tasks?type=${taskType}`)
      .then((result: any) => {
        if (result.err) {
          setMessage(result.err.message);
          setError(true);
        } else {
          setData(result.data);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, [taskType]);

  useIonViewWillEnter(() => {
    fetchData();
  });
  const updateTaskCompleted = (id: number, name: string) => {

    const data = {
      name: name,
      status: "C",
    };
    const request = new Service();
    request.put(`tasks/${id}`, data)
      .then((result: any) => {
        if (result.err) {
          setMessage(result.err.message);
          setError(true);
        } else {
          return true;
        }
      });
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
        <IonContent className="white-head">
          <IonRow>
            <IonCol className="center text-grey event-heading">TASKS</IonCol>
          </IonRow>
          <IonRow>
            <IonCol class="tasks-btns">
              <button className={taskType === "personal" ? "event-btn event-btn-clicked" : "event-btn"} onClick={() => setTaskType("personal")}>My Tasks</button>
              <button className={taskType === "assigned" ? "event-btn event-btn-clicked" : "event-btn"} onClick={() => setTaskType("assigned")}>Assigned tasks</button>
            </IonCol>
          </IonRow>
          {data && (
            <IonList className="personal-task-list">
              {data.map((i: any, index: number) => (
                i.status == null ?
                  <IonCard className="tasks">
                    <IonCardContent className="card-content">
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
                          className="ion-text-wrap ion-text-capitalize card-label"
                          data-task-id={i.id}
                          onClick={handleEdit}
                        >
                          {/* <p>{i.name}</p> */}
                          {i.description} <br />
                          <small><span>Due:</span> {moment(i.due_date).format('lll')}</small>
                        </IonLabel>
                      </IonItem>
                    </IonCardContent>
                  </IonCard> : null
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
          <IonButton className="add-btn" fill='clear' routerLink='/my/createpersonaltask' size="small">
            <IonIcon color="light" src="../../../assets/plus_icon.svg" />
          </IonButton>

          <Advertisements />

        </IonContent>
      </IonPage>
    </>
  );
};

export default Mytask;
