import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import register_png from './assets/register.png';
import { useState, useEffect } from 'react';

function App() {
  const contextBaseUrl = "https://localhost:7245/api/aluno";
  const [data, setData] = useState([]);
 
  //Requisição GET
  const pedidoGet = async() => {
    await axios.get(contextBaseUrl)
    .then(response => {
      setData(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    pedidoGet();
  }, []);

  return (
    <>
      <div>
        <br />
        <h3>Cadastro de Alunos</h3>
        <header>
          <img src={register_png} className="App-logo" alt="logo" />
          <button className="btn btn-primary">Novo</button>
        </header>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Idade</th>
              <th>Operação</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.email}</td>
                <td>{item.idade}</td>
                <td>
                  <button className="btn btn-warning">Editar</button>{" "}
                  <button className="btn btn-danger">Excluir</button>                
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
