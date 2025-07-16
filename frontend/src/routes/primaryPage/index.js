import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
export default function Primarypage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/register",
        {...formData}
      );
      console.log("Foi:", response.data);
      
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <main>
      <h1>Cadastre-se agora!</h1>
      <form onSubmit={handleSubmit}>
        <p>Usuario</p>
        <input
          type="text"
          placeholder="Usuario"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <p>Senha</p>
        <input
          type="password"
          placeholder="Senha"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Confirmar</button>
      </form>
    </main>
  );
}
