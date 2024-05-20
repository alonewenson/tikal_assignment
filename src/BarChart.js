import React, { useEffect, useState } from "react";
import "./BarChart.css";

const defaultCharacters = [
  "Abradolf Lincler",
  "Arcade Alien",
  "Morty Smith",
  "Birdperson",
  "Mr. Meeseeks",
];

const BarChart = () => {
  const [characterInput, setCharacterInput] = useState(
    defaultCharacters.join(", ")
  );
  const [episodeCounts, setEpisodeCounts] = useState([]);
  const [maxCount, setMaxCount] = useState(0);

  const fetchCharacterData = async (character) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${character}`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error(`Error fetching data for ${character}:`, error);
      return [];
    }
  };

  const fetchAllData = async () => {
    const characterNames = Array.from(
      new Set(characterInput.split(",").map((name) => name.trim()))
    );
    try {
      const data = await Promise.all(characterNames.map(fetchCharacterData));
      const episodeCounts = [];
      let maxCount = 0;

      data.forEach((characterArray) => {
        if (characterArray.length > 0) {
          const uniqueEpisodes = new Set();
          characterArray.forEach((character) => {
            character.episode.forEach((episode) => uniqueEpisodes.add(episode));
          });
          const character = {
            names: [...new Set(characterArray.map((char) => char.name))],
            count: uniqueEpisodes.size,
          };
          episodeCounts.push(character);
          if (character.count > maxCount) {
            maxCount = character.count;
          }
        }
      });

      setEpisodeCounts(episodeCounts);
      setMaxCount(maxCount);
    } catch (error) {
      console.error("Error fetching character data:", error);
    }
  };

  const handleClick = () => {
    const characters = characterInput.split(",").map((name) => name.trim());
    if (characters.length > 5) {
      alert("Too many characters. Max 5");
      return;
    }
    fetchAllData();
  };

  useEffect(() => {
    fetchAllData();
    // we only want to trigger the use effect on mount and never again
    // so ignore the eslint warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="barchart-container">
      <h1>Character Popularity</h1>
      <input
        type="text"
        value={characterInput}
        onChange={(e) => setCharacterInput(e.target.value)}
        placeholder="Enter character names, comma-separated"
        className="character-input"
      />
      <button onClick={handleClick} className="fetch-button">
        Send
      </button>
      <div className="chart">
        {episodeCounts.map((character, index) => (
          <div key={index} className="bar-container">
            <div
              className="bar"
              style={{ height: `${(character.count / maxCount) * 100}%` }}
            >
              <span className="bar-label">{character.count}</span>
            </div>
            <span className="legend" data-title={character.names.join("\n")}>
              {character.names.length > 1
                ? `${character.names[0]} (+${character.names.length - 1})`
                : character.names[0]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
