import React, { useState } from "react";

const Selector = ({ groupByKey, tickets, groupBy, sortBy }) => {
  const [displayDropdownOpen, setDisplayDropdownOpen] = useState(false);
  const [groupingDropdownOpen, setGroupingDropdownOpen] = useState(false);
  const [orderingDropdownOpen, setOrderingDropdownOpen] = useState(false);

  const toggleDisplayDropdown = () => {
    setDisplayDropdownOpen(!displayDropdownOpen);
    if (groupingDropdownOpen) {
      setGroupingDropdownOpen(false);
    }
    if (orderingDropdownOpen) {
      setOrderingDropdownOpen(false);
    }
  };

  const toggleGroupingDropdown = () => {
    setGroupingDropdownOpen(!groupingDropdownOpen);
    if (orderingDropdownOpen) {
      setOrderingDropdownOpen(false);
    }
  };

  const toggleOrderingDropdown = () => {
    setOrderingDropdownOpen(!orderingDropdownOpen);
  };

  const handleGroupingClick = (option) => {
    groupByKey(tickets, option, sortBy);
    toggleGroupingDropdown();
  };

  const handleOrderingClick = (option) => {
    groupByKey(tickets, groupBy, option);
    toggleOrderingDropdown();
  };

  return (
    <div className="dropdown">
      <div onClick={toggleDisplayDropdown}>### Display ###</div>
      {displayDropdownOpen && (
        <div>
          <div onClick={toggleGroupingDropdown}>### Grouping ###</div>
          {groupingDropdownOpen && (
            <div>
              <button onClick={() => handleGroupingClick("status")}>
                Status
              </button>
              <button onClick={() => handleGroupingClick("user")}>User</button>
              <button onClick={() => handleGroupingClick("priority")}>
                Priority
              </button>
            </div>
          )}
          <div className="dropdown-item" onClick={toggleOrderingDropdown}>
            ### Ordering ###
            {orderingDropdownOpen && (
              <div>
                <button onClick={() => handleOrderingClick("priority")}>
                  Priority
                </button>
                <button onClick={() => handleOrderingClick("title")}>
                  Title
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Selector;
