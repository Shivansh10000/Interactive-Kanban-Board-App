const Card = ({ ticket, users }) => {
  const { title, priority, status, tag, userId } = ticket;
  let userName;
  users.forEach((user) => {
    if (user.id === userId) {
      userName = user.name;
    }
  });
  return (
    <div>
      {/* Display ticket information */}
      <h2>{title}</h2>
      <p>User Name : {userName}</p>
      <p>Priority: {priority}</p>
      <p>Status: {status}</p>
      <p>Tag: {tag[0]}</p>
    </div>
  );
};

export default Card;
