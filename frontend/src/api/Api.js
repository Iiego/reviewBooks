import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Api({ setUserid }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  exports.handleRegister  = async (username, password) => {
    try {
      const res = await axios.post("https://localhost:3001/api/user", {
        username,
        password,
      });
      return {succes: true, data: res.data}
    } catch (err) {
      alert("Erro ao registrar.");
      return { success: false, error: err.response?.data?.message || "Erro ao registrar" };
    }
  };

  exports.handleLogin = async (username, password) => {
    try {
      const res = await axios.post("https://localhost:3001/api/user", {
        username,
        password,
      })
      localStorage.setItem('token', res.data.token)
      //TEM Q POR O NAVIGATE PARA A PAGINA DE FAVORITOS
    } catch (err) {
      console.log('ERRO:',err)
    }
  }



}


