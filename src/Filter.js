import React, { useState, useEffect, useRef } from "react";

const Filter = ({ authors, locations, handleFilterChange }) => {
  const [filterTitle, setFilterTitle] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterFrom, setFilterFrom] = useState("");
  const [filterBefore, setFilterBefore] = useState("");
  const [showDateFilters, setShowDateFilters] = useState(false);
  const outsideFormRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "filterTitle":
        setFilterTitle(value);
        break;
      case "filterAuthor":
        setFilterAuthor(value);
        break;
      case "filterLocation":
        setFilterLocation(value);
        break;
      case "filterFrom":
        setFilterFrom(value);
        break;
      case "filterBefore":
        setFilterBefore(value);
        break;
      default:
        break;
    }
  };

  const handleSelectChange = () => {
    setShowDateFilters((prevState) => !prevState);
  };

  useEffect(() => {
    handleFilterChange({
      title: filterTitle,
      author: filterAuthor,
      location: filterLocation,
      from: filterFrom,
      before: filterBefore,
    });
  }, [filterTitle, filterAuthor, filterLocation, filterFrom, filterBefore]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        outsideFormRef.current &&
        !outsideFormRef.current.contains(event.target)
      ) {
        setShowDateFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [outsideFormRef]);

  return (
    <form className="filter" ref={outsideFormRef}>
      <label>
        <input
          placeholder="Name"
          type="text"
          name="filterTitle"
          value={filterTitle}
          onChange={handleInputChange}
        />
      </label>
      <label>
        <div className="selectWrapper">
          <select
            placeholder="Author"
            name="filterAuthor"
            value={filterAuthor}
            onChange={handleInputChange}
          >
            <option value="">Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
      </label>
      <label>
        <div className="selectWrapper">
          <select
            placeholder="Location"
            name="filterLocation"
            value={filterLocation}
            onChange={handleInputChange}
          >
            <option value="">Location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.location}>
                {location.location}
              </option>
            ))}
          </select>
        </div>
      </label>
      <div className="selectWrapper">
        <input
          type="button"
          value={showDateFilters ? "Created" : "Created"}
          onClick={handleSelectChange}
          style={{ textAlign: "left" }}
        />
        {showDateFilters && (
          <div className="created-form">
            <label>
              <input
                className="created-form-input"
                type="text"
                placeholder="from"
                name="filterFrom"
                value={filterFrom}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <input
                className="created-form-input"
                type="text"
                placeholder="before"
                name="filterBefore"
                value={filterBefore}
                onChange={handleInputChange}
              />
            </label>
          </div>
        )}
      </div>
    </form>
  );
};

export default Filter;
