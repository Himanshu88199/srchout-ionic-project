import {
  IonButton,
  IonCol,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Service from "../../services/http";
import { Advertisements } from "../Advertisements";
import Header from "../Header";
import "./CreateEventTask.css";

const initialFormErrors = {
  name: false,
  description: false,
  date: false,
  time: false,
  assigned_to: false,
};
const CreateEventTask: React.FC = () => {
  const history = useHistory();
  const { search } = useLocation();
  const params = search.split("&eventName=");
  const eventName = decodeURIComponent(params[1]);
  const id = params[0].split("?id=")[1];
  //console.log(id, eventName);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [attend, getAttendend] = useState([]);
  const [taskAssignTo, setTaskAssignTo] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const handleCreateTask = () => {
    if (
      taskName === "" ||
      taskDesc === "" ||
      taskDate === "" ||
      taskTime === ""
      // ||
      // taskAssignTo === ""
    ) {
      var obj = initialFormErrors;
      if (taskName === "") {
        obj.name = true;
      } else {
        obj.name = false;
      }
      if (taskDesc === "") {
        obj.description = true;
      } else {
        obj.description = false;
      }
      if (taskDate === "") {
        obj.date = true;
      } else {
        obj.date = false;
      }
      if (taskTime === "") {
        obj.time = true;
      } else {
        obj.time = false;
      }
      if (taskAssignTo === "") {
        obj.assigned_to = false;
      } else {
        obj.assigned_to = false;
      }
      setFormErrors(obj);
    } else {
      var taskData = {
        name: taskName,
        description: taskDesc,
        due_date: `${taskDate}T${taskTime}`,
        task_type: "event",
        event_id: id,
        //assigned_to: taskAssignTo,
      };

      const request = new Service();
      request.post(`tasks`, taskData).then((result: any) => {
        if (result.err) {
          setMessage(result.err.message);
          setError(true);
        } else {
          setTaskName("");
          setTaskDesc("");
          setTaskAssignTo("");
          setTaskDate("");
          setTaskTime("");
          setSuccess(true);
        }
      });
    }
  };

  const fetchAttendies = () => {
    const request = new Service();
    request.get(`guests/${id}`).then((result: any) => {
      if (result.err) {
        setMessage(result.err.message);
        setError(true);
      } else {
        getAttendend(result.data);
      }
    });
  };
  const onChangeError = (e: any) => {
    setFormErrors({
      ...formErrors,
      [e.target.name]: e.detail.value.length <= 0,
    });
  };
  const assignHandler = (e: any) => {
    setTaskAssignTo(e.detail.value);
  };
  useEffect(() => {
    fetchAttendies();
  }, [id]);
  //console.log(formErrors);
  return (
    <>
      <IonPage className="pg-grey">
        <Header />
        <IonContent>
          <IonRow>
            <IonCol className="center text-grey">CREATE EVENT TASK</IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="text-grey2 pb-0 ml-10">
              Event Name:
            </IonCol>
            <IonCol className="pd-0" size="12">
              <IonItem className="input-border pd">{eventName}</IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="text-grey2 pb-0 ml-10">
              Task Name:
            </IonCol>
            <IonCol className="pd-0" size="12">
              <IonInput
                required
                className="input-border pd"
                value={taskName}
                onIonChange={(e) => {
                  onChangeError(e);
                  setTaskName(e.detail.value!);
                }}
                name="name"
              ></IonInput>
              {formErrors.name && (
                <small style={{ color: "red" }} className="ml-10">
                  Task Name is required
                </small>
              )}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="text-grey2 pb-0 ml-10">
              Task Description:
            </IonCol>
            <IonCol className="pd-0" size="12">
              <IonTextarea
                required
                rows={6}
                className="input-border-2"
                value={taskDesc}
                onIonChange={(e) => {
                  onChangeError(e);
                  setTaskDesc(e.detail.value!);
                }}
                name="description"
              ></IonTextarea>
              {formErrors.description && (
                <small style={{ color: "red" }} className="ml-10">
                  Task Description is required
                </small>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="date-time">
            <IonCol>
              <IonLabel className="text-grey2 pb-0 ml-10">
                Task Due Date:
              </IonLabel>
              <IonInput
                required
                className="input-border col-50"
                value={taskDate}
                onIonChange={(e: any) => {
                  onChangeError(e);
                  setTaskDate(e.detail.value);
                }}
                type="date"
                name="date"
              ></IonInput>
              {formErrors.date && (
                <small style={{ color: "red" }} className="ml-10">
                  Task Date is required
                </small>
              )}
            </IonCol>
            <IonCol>
              <IonLabel className="text-grey2 pb-0 ml-10">
                Task Due Time:
              </IonLabel>
              <IonInput
                required
                className="input-border col-50"
                value={taskTime}
                onIonChange={(e: any) => {
                  onChangeError(e);
                  setTaskTime(e.detail.value);
                }}
                type="time"
                name="time"
              ></IonInput>
              {formErrors.time && (
                <small style={{ color: "red" }} className="ml-10">
                  Task Time is required
                </small>
              )}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="text-grey2 pb-0 ml-10">
              Assign Task To:
            </IonCol>
            <IonCol className="pd-0" size="12">
              <IonSelect
                className="input-border pd"
                placeholder="Select Assignees"
                value={taskAssignTo}
                onIonChange={(e: any) => {
                  onChangeError(e);
                  assignHandler(e);
                }}
                name="assigned_to"
              >
                {attend.map((item: any, index: number) => {
                  return (
                    <IonSelectOption key={index} value={item.id}>
                      {item.fname} {item.lname}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
              {/* {formErrors.assigned_to && (
                <small style={{ color: "red" }} className="ml-10">
                  Task Assigned to is required
                </small>
              )} */}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="m-auto mt-34" size="10.7">
              <IonButton
                className="save-btn"
                size="default"
                expand="block"
                type="button"
                onClick={() => handleCreateTask()}
              >
                Save
              </IonButton>
            </IonCol>
          </IonRow>
          <IonToast
            isOpen={success}
            onDidDismiss={() => {
              setSuccess(false);
              history.goBack();
            }}
            message="Task has been created"
            duration={200}
            color="success"
          />
          <IonToast
            isOpen={error}
            onDidDismiss={() => {
              setError(false);
            }}
            message={message}
            duration={200}
            color="danger"
          />

          <Advertisements />
        </IonContent>
      </IonPage>
    </>
  );
};

export default CreateEventTask;
