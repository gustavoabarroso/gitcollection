import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { Title, Form, Repos } from "./styles";
import logo from "../../assets/logo.svg";

export const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logo} alt="GitCollection" />
      <Title>Catálogo de repositórios do Github</Title>
      <Form>
        <input placeholder="username/repository_name" />
        <button type="submit">Buscar</button>
      </Form>
      <Repos>
        <a href="/repositories">
          <img
            src="https://avatars.githubusercontent.com/u/86621546?v=4"
            alt="Imagem do repositório"
          />
          <div>
            <strong>gustavoabarroso/curso</strong>
            <p>Repositorio curso feito</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repos>
    </>
  );
};
