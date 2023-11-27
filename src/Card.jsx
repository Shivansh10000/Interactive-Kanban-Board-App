import "./styles.css";
import progressSvg from "./svg/progress.svg";
import todoSvg from "./svg/todo.svg";
import backlogSvg from "./svg/backlog.svg";
import highPriority from "./svg/highpriority.svg";
import lowPriority from "./svg/lowpriority.svg";
import mediumPriority from "./svg/mediumpriority.svg";

const Card = ({ ticket, users }) => {
  const { id, title, priority, status, tag, userId } = ticket;
  let userName;
  let userAvailable = false; // Initializing as false

  users.forEach((user) => {
    if (user.id === userId) {
      userName = user.name;
      userAvailable = user.available; // Set userAvailable based on user's availability
    }
  });

  const renderPrioritySVG = (priorityValue) => {
    if (priorityValue === 0 || priorityValue === 1) {
      return <img src={lowPriority} alt="Low Priority" />;
    } else if (priorityValue === 2) {
      return <img src={mediumPriority} alt="Medium Priority" />;
    } else if (priorityValue === 3 || priorityValue === 4) {
      return <img src={highPriority} alt="High Priority" />;
    }
    return null; // Return null for unknown values
  };

  const renderStatusSVG = (statusValue) => {
    switch (statusValue) {
      case "Backlog":
        return <img src={backlogSvg} alt="Backlog" />;
      case "Todo":
        return <img src={todoSvg} alt="Todo" />;
      case "In progress":
        return <img src={progressSvg} alt="In Progress" />;
      default:
        return null; // Return null for unknown status
    }
  };

  return (
    <div className="card">
      <div className="id-username">
        <div>{id}</div>
        <div>
          {userName}
          {userAvailable ? (
            <div className="green-circle"></div>
          ) : (
            <div className="red-circle"></div>
          )}
        </div>
      </div>
      <div className="title-content">
        <h1>{title}</h1>
        <div className="priority-status">
          {renderPrioritySVG(priority)}
          <p>{status}</p>
          {renderStatusSVG(status)}
          {/* Assuming tag[0] refers to the first tag */}
        </div>
      </div>
    </div>
  );
};

export default Card;
