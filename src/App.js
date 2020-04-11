import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(({data: repositories}) => setRepositories(repositories))
      .catch(() => alert('erro'));
  }, []);

  function handleAddRepository() {
    const newRepository = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };

    return api.post('repositories', newRepository)
      .then(({data: returnedEntity}) =>
        setRepositories([...repositories, returnedEntity]))
      .catch(() => alert('erro'));
  }

  function handleRemoveRepository(idToDelete) {
    return api.delete(`repositories/${idToDelete}`)
      .then(() => {
        const nonDeletedRepositories = repositories.filter(({id}) => id !== idToDelete);
        setRepositories(nonDeletedRepositories);
      })
      .catch(() => alert('error'));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({title, id}) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
