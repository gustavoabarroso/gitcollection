import React from "react";
import { Routes, Route } from "react-router-dom";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Repo = React.lazy(() => import("../pages/Repo"));

export const Navigation: React.FC = () => {
  return (
    <React.Suspense fallback={"Carregando ..."}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/repositories/:repository" element={<Repo />} />
      </Routes>
    </React.Suspense>
  );
};
