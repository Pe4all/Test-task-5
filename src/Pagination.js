import React from "react";
import { ReactComponent as DoubleArrow } from "./last.svg";
import { ReactComponent as Arrow } from "./next.svg";

const Pagination = ({
  paintingsPerPage,
  totalPaintings,
  paginate,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPaintings / paintingsPerPage); i++) {
    pageNumbers.push(i);
  }

  const firstPage = () => setCurrentPage(1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const lastPage = () =>
    setCurrentPage(Math.ceil(totalPaintings / paintingsPerPage));

  const disableBack = () => {
    if (currentPage === 1) {
      return true;
    } else {
      return false;
    }
  };

  const disableNext = () => {
    if (currentPage === Math.ceil(totalPaintings / paintingsPerPage)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="pagination">
      <button
        disabled={disableBack() === true}
        id="firstButton"
        onClick={firstPage}
        className={currentPage === 1 ? "disabled" : ""}
      >
        <DoubleArrow
          style={{ transform: "scale(-1, 1)" }}
          className={currentPage === 1 ? "arrowDisabled" : "arrow"}
        />
      </button>

      <button
        disabled={disableBack() === true}
        onClick={prevPage}
        className={currentPage === 1 ? "disabled" : ""}
      >
        <Arrow
          style={{ transform: "scale(-1, 1)" }}
          className={currentPage === 1 ? "arrowDisabled" : "arrow"}
        />
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={currentPage === number ? "activeButton" : ""}
        >
          <p className={currentPage === number ? "activeButton" : ""}>
            {number}
          </p>
        </button>
      ))}

      <button
        disabled={disableNext() === true}
        onClick={nextPage}
        className={
          currentPage === Math.ceil(totalPaintings / paintingsPerPage)
            ? "disabled"
            : "active"
        }
      >
        <Arrow
          className={
            currentPage === Math.ceil(totalPaintings / paintingsPerPage)
              ? "arrowDisabled"
              : "arrow"
          }
        />
      </button>

      <button
        disabled={disableNext() === true}
        id="lastButton"
        onClick={lastPage}
        className={
          currentPage === Math.ceil(totalPaintings / paintingsPerPage)
            ? "disabled"
            : "active"
        }
      >
        <DoubleArrow
          className={
            currentPage === Math.ceil(totalPaintings / paintingsPerPage)
              ? "arrowDisabled"
              : "arrow"
          }
        />
      </button>
    </div>
  );
};

export default Pagination;
