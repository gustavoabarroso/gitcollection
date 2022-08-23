import React, { useState, useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";

import { api } from "../../services/api";
import { Title, Form, Repos, Error } from "./styles";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

interface GithubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export const Dashboard: React.FC = () => {
  const [repos, setRepos] = useState<GithubRepository[]>(() => {
    const storageRepos = localStorage.getItem("@GitCollection:repositories");
    if (storageRepos) {
      return JSON.parse(storageRepos);
    }
    return [];
  });
  const [newRepo, setNewRepo] = useState("");
  const [inputError, setInputError] = useState("");
  const formEl = React.useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    localStorage.setItem("@GitCollection:repositories", JSON.stringify(repos));
  }, [repos]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewRepo(event.target.value);
  }

  async function handleAddRepo(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError("Informe o username/repositório");
      return;
    }

    try {
      const response = await api.get<GithubRepository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepos([...repos, repository]);
      formEl.current?.reset();
      setNewRepo("");
      setInputError("");
    } catch {
      setInputError("Repositório não encontrado no Github!");
    }
  }

  return (
    <>
      <img src={logo} alt="GitCollection" />
      <Title>Catálogo de repositórios do Github</Title>

      <Form
        ref={formEl}
        hasError={Boolean(inputError)}
        onSubmit={handleAddRepo}
      >
        <input
          placeholder="username/repository_name"
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repos>
        {repos.map((repo) => {
          return (
            <React.Fragment key={repo.full_name}>
              <Link to={`/repositories/${encodeURIComponent(repo.full_name)}`}>
                <img src={repo.owner.avatar_url} alt={repo.owner.login} />
                <div>
                  <strong>{repo.full_name}</strong>
                  <p>{repo.description}</p>
                </div>
                <FiChevronRight size={20} />
              </Link>
            </React.Fragment>
          );
        })}
      </Repos>
    </>
  );
};
