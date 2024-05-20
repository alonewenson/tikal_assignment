import React, { useEffect, useState } from "react";
import "./LeastPopular.css";

const LeastPopular = () => {
  const [leastPopularCharacter, setLeastPopularCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      let url = "https://rickandmortyapi.com/api/location/1";
      try {
        const response = await fetch(url);
        const data = await response.json();
        const residents = data.residents;
        const charactersData = await Promise.all(
          residents.map((resident) => fetch(resident).then((res) => res.json()))
        );

        const leastPopular = charactersData.reduce((prev, current) => {
          if (prev.episode.length < current.episode.length) return prev;
          if (prev.episode.length > current.episode.length) return current;
          return prev.name.localeCompare(current.name) < 0 ? current : prev;
        });

        setLeastPopularCharacter(leastPopular);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  const getDelay = (index) => `${index * 0.5}s`;

  return (
    <div className="character-container">
      <h1>Least Popular Character from Earth (C-137)</h1>
      {leastPopularCharacter ? (
        <div className="character-card">
          <table className="character-table">
            <tbody>
              <tr>
                <td rowSpan="6">
                  <img
                    src={leastPopularCharacter.image}
                    alt={leastPopularCharacter.name}
                    className="character-image"
                  />
                </td>
                <td>
                  <strong>Character name</strong>
                </td>
                <td
                  className="character-detail"
                  style={{ animationDelay: getDelay(0) }}
                >
                  {leastPopularCharacter.name}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Origin & Dimension</strong>
                </td>
                <td
                  className="character-detail"
                  style={{ animationDelay: getDelay(1) }}
                >
                  {leastPopularCharacter.origin.name}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Status</strong>
                </td>
                <td
                  className="character-detail"
                  style={{ animationDelay: getDelay(2) }}
                >
                  {leastPopularCharacter.status}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Species</strong>
                </td>
                <td
                  className="character-detail"
                  style={{ animationDelay: getDelay(3) }}
                >
                  {leastPopularCharacter.species}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Gender</strong>
                </td>
                <td
                  className="character-detail"
                  style={{ animationDelay: getDelay(4) }}
                >
                  {leastPopularCharacter.gender}{" "}
                  {leastPopularCharacter.gender === "Male" ? "♂️" : "♀️"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Popularity</strong>
                </td>
                <td
                  className="character-detail"
                  style={{ animationDelay: getDelay(5) }}
                >
                  {leastPopularCharacter.episode.length}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LeastPopular;
