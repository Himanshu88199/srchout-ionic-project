import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import Header from "../Header";
import "./CreatePersonalTask.css";
import Footer from "../../components/Footer";
import { Advertisements } from "../Advertisements";
import { useEffect, useState } from "react";
import moment from "moment";
import { useHistory, useLocation } from "react-router";
import Service from "../../services/http";

const CreatePersonalTask: React.FC = () => {
  const history = useHistory();
  const { search } = useLocation();
  const id = search.split("?id=")[1];

  const initialTaskData = {
    name: '',
    description: '',
    due_date: '',
    task_type: "personal",
    category: ''
  };
  const [taskData, setTaskData] = useState(initialTaskData);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");

  const submitCreateTask = () => {
    const request = new Service();
    taskData.due_date = `${taskDate}T${taskTime}`;
    request.post(`tasks`, taskData)
      .then((result: any) => {
        if (result.err) {
          setMessage(result.err.message);
          setError(true);
        } else {
          setSuccess(true);
          setTaskData(initialTaskData);
        }
      })
  };
  const submitEditTask = () => {
    const data = {
      "name": taskData.name,
      "description": taskData.description,
      "due_date": `${taskDate}T${taskTime}`,
      "category": taskData.category
    };

    const request = new Service();
    request.put(`tasks/${id}`, data)
      .then((result: any) => {
        if (result.err) {
          setMessage(result.err.message);
          setError(true);
        } else {
          setSuccess(true);
          setTaskData(initialTaskData);
        }
      });
  }
  const submitForm = (e: any) => {
    e.preventDefault();
    if (id) {
      submitEditTask();
    } else {
      submitCreateTask();
    }
  };
  const onChangeHandler = (e: any) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.detail.value
    });
  };
  const fetchTaskDetail = (id: any) => {
    const request = new Service();
    request.get(`tasks/${id}`)
      .then((result: any) => {
        if (result.err) {
          setMessage(result.err.message);
          setError(true);
        } else {
          setTaskData(result.data);
          const td = result.data.due_date.split('T');
          setTaskDate(td[0]);
          setTaskTime(td[1]);
        }
      })
  };

  useEffect(() => {
    setTaskData(initialTaskData);
    setTaskDate("");
    setTaskTime("");
    if (id) {
      fetchTaskDetail(id);
    }
  }, [id]);
  return (
    <>
      <IonPage className="pg-grey">
        <Header />
        <IonContent>
          <IonRow>
            <IonCol className="center text-grey">{id ? "EDIT" : "CREATE"} PERSONAL TASK</IonCol>
          </IonRow>
          <form onSubmit={submitForm}>
            <IonRow>
              <IonCol size="12" className="text-grey2 pb-0 ml-10">
                Task Name:
              </IonCol>
              <IonCol className="pd-0" size="12">
                <IonInput required className="input-border" value={taskData.name} name="name" onIonChange={onChangeHandler}></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" className="text-grey2 pb-0 ml-10">
                Task Description:
              </IonCol>
              <IonCol className="pd-0" size="12">
                <IonTextarea required rows={3} className="input-border-2" value={taskData.description} name="description" onIonChange={onChangeHandler}></IonTextarea>
              </IonCol>
            </IonRow>
            <IonRow className='date-time'>
              <IonCol>
                <IonLabel className='text-grey2 pb-0 ml-10'>Task Due Date:</IonLabel>
                <IonInput required className='input-border col-50' value={taskDate} onIonChange={(e: any) => setTaskDate(e.detail.value)} type="date"></IonInput>
              </IonCol>
              <IonCol>
                <IonLabel className='text-grey2 pb-0 ml-10'>Task Due Time:</IonLabel>
                <IonInput required className='input-border col-50' value={taskTime} onIonChange={(e: any) => setTaskTime(e.detail.value)} type="time"></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" className="text-grey2 pb-0 ml-10">
                Category:
              </IonCol>
              <IonCol className="pd-0" size="12">
                <IonInput required className="input-border" value={taskData.category} name="category" onIonChange={onChangeHandler}></IonInput>
              </IonCol>
            </IonRow>
            <IonRow className="save-btn-row">
              <IonCol className="m-auto mt-43" size="11">
                <IonButton className="sign-btn" size="default" expand="block" type="submit">
                  Save
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
          <IonToast
            isOpen={success}
            onDidDismiss={() => {
              setSuccess(false);
              history.push("/my/mytask");
            }}
            message="Task has been created"
            duration={200}
            color="success"
          />
          <Advertisements />
        </IonContent>
      </IonPage>
    </>
  );
};

export default CreatePersonalTask;
