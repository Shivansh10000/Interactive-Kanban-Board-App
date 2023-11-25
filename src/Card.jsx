const Card = ({ ticket }) => {
  const { id, title, priority, status, tag, userId } = ticket;
  return (
    <div>
      {/* Display ticket information */}
      <h2>{title}</h2>
      <p>ID: {id}</p>
      <p>Priority: {priority}</p>
      <p>Status: {status}</p>
      <p>User ID: {userId}</p>
      <p>Tag: {tag[0]}</p>
    </div>
  );
};

export default Card;
