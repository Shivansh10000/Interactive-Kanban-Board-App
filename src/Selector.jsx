import React, { useState, useEffect } from "react";
import menuSvg from "./svg/menu.svg";

const Selector = ({ groupByKey, tickets, groupBy, sortBy }) => {
  const [displayDropdownOpen, setDisplayDropdownOpen] = useState(false);
  const [groupingDropdownOpen, setGroupingDropdownOpen] = useState(false);
  const [orderingDropdownOpen, setOrderingDropdownOpen] = useState(false);
  const [groupCondition, setGroupCondition] = useState(
    () => localStorage.getItem("groupBy") || groupBy
  );
  const [sortCondition, setSortCondition] = useState(
    () => localStorage.getItem("sortBy") || sortBy
  );

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

  useEffect(() => {
    localStorage.setItem("groupBy", groupCondition);
  }, [groupCondition]);

  useEffect(() => {
    localStorage.setItem("sortBy", sortCondition);
  }, [sortCondition]);

  return (
    <div className="dropdown">
      <div onClick={toggleDisplayDropdown} className="display-button-wrapper">
        <div className="menu-svg" onClick={toggleDisplayDropdown}>
          <img src={menuSvg} alt="Menu Icon" />
        </div>
        <div className="display-button" onClick={toggleDisplayDropdown}>
          Display
        </div>
        <div onClick={toggleDisplayDropdown} className="downward-symbol">
          &gt;
        </div>
      </div>
      {displayDropdownOpen && (
        <div className="dropdown-options">
          <div className="dropdown-option-wrapper">
            <div>Grouping</div>
            <div className="dropdown-item" onClick={toggleGroupingDropdown}>
              <div className="downward-dropdown">
                <div className="option-text">{groupCondition}</div>
                <div className="downward-symbol">&gt;</div>
              </div>
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
              <div className="downward-dropdown">
                <div className="option-text">{sortCondition}</div>
                <div className="downward-symbol">&gt;</div>
              </div>
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
