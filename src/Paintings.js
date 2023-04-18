import React from "react";

const Paintings = ({ currentPaintings, getAuthorById, getLocationById }) => {
  return (
    <div className="container__pictures">
      {currentPaintings.map((painting) => (
        <div
          className="container__pictures-item"
          key={painting.id}
          style={{
            backgroundImage: `url(https://test-front.framework.team/${painting.imageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <ul className="titleBackground">
            <li className="title">
              <p>{painting.name}</p>
            </li>
            <li className="title author">
              <p>
                Author:{" "}
                <span className="lower">
                  {getAuthorById(painting.authorId)?.name}
                </span>
              </p>
            </li>
            <li className="title created">
              <p>
                Created:
                <span className="lower">{painting.created}</span>
              </p>
            </li>
            <li className="title location">
              <p>
                Location:{" "}
                <span className="lower">
                  {getLocationById(painting.locationId)?.location}
                </span>
              </p>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Paintings;
