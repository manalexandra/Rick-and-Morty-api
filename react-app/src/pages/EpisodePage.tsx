import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

const CharacterPage: React.FC = () => {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode/${id}`)
      .then((response) => response.json())
      .then((data) => setEpisode(data))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div>
      <ul>
        <div className="row">
          <div key={episode?.id}>
            <h3>{episode?.name}</h3>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default CharacterPage;
