import { useState, useEffect } from 'react';
import Card from './Card.jsx';
import Selector from './Selector.jsx'
import './styles.css'

const App = () => {
  const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([])
  const [groupBy, setGroupBy] = useState('status');
  const [groupedTickets, setGroupedTickets] = useState({});
  const [sortBy, setSortBy] = useState('title')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data);
        setTickets(data.tickets);
        setUsers(data.users)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (tickets.length > 0) {
      setGroupBy(groupBy);
      setSortBy(sortBy);
      groupByKey(tickets, groupBy, sortBy);
    }
  }, [tickets, groupBy, sortBy]);

  const groupByKey = (tickets, key, sortKey) => {
    const grouped = {};
  
    tickets.forEach((ticket) => {
      const keyValue = ticket[key];
      if (!grouped[keyValue]) {
        grouped[keyValue] = [];
      }
      grouped[keyValue].push(ticket);
    });
  
    // Sort each group's array based on sortKey
    for (const groupKey in grouped) {
      const groupTickets = grouped[groupKey];
  
      let sortedGroupTickets;
      if (sortKey === 'title') {
        sortedGroupTickets = groupTickets.sort((a, b) => {
          const valueA = (a[sortKey] || '').toUpperCase();
          const valueB = (b[sortKey] || '').toUpperCase();
          return valueA.localeCompare(valueB);
        });
      } else if (sortKey === 'priority') {
        sortedGroupTickets = groupTickets.sort((a, b) => b[sortKey] - a[sortKey]);
      }
  
      grouped[groupKey] = sortedGroupTickets;
    }
  
    setGroupedTickets(grouped);
  };
  
  return (
    <div className="App">

      <div className='navbar'>
        <div className="navbar-left">
          <Selector tickets={tickets} groupByKey={groupByKey} groupBy={groupBy} sortBy={sortBy} groupedTickets={groupedTickets} />
        </div>
        <div className="navbar-right">
          <div className="brand">Quick Sell Assessment</div>
        </div>
      </div>

      <div className='content-wrapper'>
        <div className='title'>Kanban Board Application</div>

        <div className='temp-top'>
            {Object.keys(groupedTickets).map((groupKey) => (
              <div key={groupKey} className='column'>
                <h2 className='column-name'>
                  <div>{groupKey} </div>
                  <div>{groupedTickets[groupKey].length}</div> 
                </h2>
                {groupedTickets[groupKey].map((ticket) => (
                  <Card key={ticket.id} ticket={ticket} users={users} className="Card" />
                ))}
              </div>
            ))}
          
        </div>
      </div>

    </div>
  );
};

export default App;