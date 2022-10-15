import './ExploreContainer.css';
import EventsPage from "../pages/events/EventsPage"
import Mytask from '../pages/task/Mytask';
import Setting from '../pages/settings/Setting';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    // <div className="container">
    //   <strong>Ready to create an app?</strong>
    //   <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    // </div>
    <>
      {(name === "tasks") && <Mytask />}
      {(name === "events") && <EventsPage />}
      {/* {(name === "main") && <MainList />} */}
      {(name === "settings") && <Setting />}
    </>
  );
};

export default ExploreContainer;
