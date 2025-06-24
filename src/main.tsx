import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { MainLayout } from "@/layouts/main-layout";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import IndexPage from "@/pages/index";

import "@/index.css";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<IndexPage />} />
            <Route path="login" element={<Login />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider >
  </StrictMode >,
);
