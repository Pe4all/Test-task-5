import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Paintings from "../src/Paintings";
import Filter from "../src/Filter";
import Pagination from "../src/Pagination";

const App = () => {
  const [paintings, setPaintings] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filteredData, setFilteredData] = useState({
    title: "",
    author: "",
    location: "",
    from: "",
    before: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [paintingsPerPage] = useState(12);

  const fetchData = async () => {
    const params = new URLSearchParams();
    if (filteredData.title) {
      params.append("name", filteredData.title);
    }
    if (filteredData.author) {
      const author = authors.find(
        (author) =>
          author.name.toLowerCase() === filteredData.author.toLowerCase()
      );
      if (author) {
        params.append("authorId", author.id);
      }
    }
    if (filteredData.location) {
      const location = locations.find(
        (location) =>
          location.location.toLowerCase() ===
          filteredData.location.toLowerCase()
      );
      if (location) {
        params.append("id", location.id);
      }
    }
    if (
      filteredData.from &&
      filteredData.before &&
      filteredData.from <= filteredData.before
    ) {
      const from = parseInt(filteredData.from);
      const before = parseInt(filteredData.before);
      Array.from(new Array(before - from + 1), (_, i) => from + i).forEach(
        (year) => params.append("created", year)
      );
    }
    const result = await axios.get(
      "https://test-front.framework.team/paintings",
      {
        params: params,
      }
    );
    setPaintings(result.data);
  };

  useEffect(() => {
    fetchData();
  }, [filteredData]);

  useEffect(() => {
    const fetchAuthorsAndLocations = async () => {
      const authorsResult = await axios(
        "https://test-front.framework.team/authors"
      );
      const locationsResult = await axios(
        "https://test-front.framework.team/locations"
      );
      setAuthors(authorsResult.data);
      setLocations(locationsResult.data);
    };
    fetchAuthorsAndLocations();
  }, []);

  const handleFilterChange = (data) => {
    setFilteredData(data);
    setCurrentPage(1);
  };

  const getAuthorById = (id) => {
    return authors.find((author) => author.id === id);
  };

  const getLocationById = (id) => {
    return locations.find((location) => location.id === id);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastPainting = currentPage * paintingsPerPage;
  const indexOfFirstPainting = indexOfLastPainting - paintingsPerPage;
  const currentPaintings = paintings.slice(
    indexOfFirstPainting,
    indexOfLastPainting
  );

  return (
    <div className="container">
      <Header />
      <Filter
        authors={authors}
        locations={locations}
        handleFilterChange={handleFilterChange}
      />
      <Paintings
        currentPaintings={currentPaintings}
        getAuthorById={getAuthorById}
        getLocationById={getLocationById}
      />
      <Pagination
        paintingsPerPage={paintingsPerPage}
        totalPaintings={paintings.length}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default App;
