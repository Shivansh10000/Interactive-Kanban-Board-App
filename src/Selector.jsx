import React, { useState } from "react";

const Selector = ({ groupByKey, tickets, groupBy, sortBy }) => {
  const [displayDropdownOpen, setDisplayDropdownOpen] = useState(false);
  const [groupingDropdownOpen, setGroupingDropdownOpen] = useState(false);
  const [orderingDropdownOpen, setOrderingDropdownOpen] = useState(false);
  const [groupCondition, setGroupCondition] = useState(groupBy);
  const [sortCondition, setSortCondition] = useState(sortBy);

  const toggleDisplayDropdown = () => {
    setDisplayDropdownOpen(!displayDropdownOpen);
    setGroupingDropdownOpen(false);
    setOrderingDropdownOpen(false);
  };

  const toggleGroupingDropdown = () => {
    setGroupingDropdownOpen(!groupingDropdownOpen);
    setOrderingDropdownOpen(false);
  };

  const toggleOrderingDropdown = () => {
    setOrderingDropdownOpen(!orderingDropdownOpen);
    setGroupingDropdownOpen(false);
  };

  const handleGroupingClick = (option) => {
    setGroupCondition(option);
    groupByKey(tickets, option, sortCondition);
    toggleGroupingDropdown();
  };

  const handleOrderingClick = (option) => {
    setSortCondition(option);
    groupByKey(tickets, groupCondition, option);
    toggleOrderingDropdown();
  };

  return (
    <div className="dropdown">
      <div className="display-button" onClick={toggleDisplayDropdown}>
        Display
      </div>
      {displayDropdownOpen && (
        <div className="dropdown-options">
          <div className="dropdown-option-wrapper">
            <div>Grouping</div>
            <div className="dropdown-item" onClick={toggleGroupingDropdown}>
              {groupCondition}
              {groupingDropdownOpen && (
                <div className="options">
                  <button onClick={() => handleGroupingClick("status")}>
                    Status
                  </button>
                  <button onClick={() => handleGroupingClick("userId")}>
                    User
                  </button>
                  <button onClick={() => handleGroupingClick("priority")}>
                    Priority
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="dropdown-option-wrapper">
            <div>Ordering</div>
            <div className="dropdown-item" onClick={toggleOrderingDropdown}>
              {sortCondition}
              {orderingDropdownOpen && (
                <div className="options">
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
        </div>
      )}
    </div>
  );
};

export default Selector;
