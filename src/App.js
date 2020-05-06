import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);
  // console.log(repositories);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Novo Projeto",
      url: "https://github.com/",
      techs: ['reactjs', 'react native']
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const reloadRepositories = repositories.filter(
      repository => repository.id !== id
    )

    setRepositories(reloadRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository =>
            (
              <li key={repository.id}>

                {repository.title}

                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
