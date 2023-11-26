import "./styles.css";
const Card = ({ ticket, users }) => {
  const { id, title, priority, status, tag, userId } = ticket;
  let userName;
  users.forEach((user) => {
    if (user.id === userId) {
      userName = user.name;
    }
  });
  return (
    <div className="card">
      <div className="id-username">
        <div> {id} </div>
        <div>{userName}</div>
      </div>
      <div className="title-content">
        <h1>{title}</h1>
        <div className="priority-status">
          <p>{priority}</p>
          <div>
            <p>{status}</p>
            <p>{tag[0]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
