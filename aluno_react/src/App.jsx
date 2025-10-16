import './App.css'
import './CrudAluno.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import register_png from './assets/register.png';
import { useState, useEffect } from 'react';

function App() {
  const contextBaseUrl = "https://localhost:7245/api/aluno";
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(true);
  const [isInclude, setIsInclude] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  //Requisição GET
  const pedidoGet = async () => {
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

  //Requisição POST
  const pedidoPost = async () => {

    delete alunoSelecionado.id;
    alunoSelecionado.nome = String(alunoSelecionado.nome);
    alunoSelecionado.email = String(alunoSelecionado.email);
    alunoSelecionado.idade = parseInt(alunoSelecionado.idade);

    console.log(alunoSelecionado);
    await axios.post(contextBaseUrl, alunoSelecionado)
      .then(response => {
        setData(data.concat(response.data));
        abrirFecharModalIncluir();
        setUpdateData(true);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    pedidoPost();
  }, []);

  //Requisição PUT
  const pedidoPut = async () => {

    alunoSelecionado.idade = parseInt(alunoSelecionado.idade);
    alunoSelecionado.nome = String(alunoSelecionado.nome);
    alunoSelecionado.email = String(alunoSelecionado.email);
    alunoSelecionado.idade = parseInt(alunoSelecionado.idade);

    console.log(alunoSelecionado.id);

    await axios.put(contextBaseUrl + '/' + alunoSelecionado.id, alunoSelecionado)
      .then(response => {
        var resposta = response.data;
        var dadosAuxiliar = data;
        dadosAuxiliar.map(aluno => {
          if (aluno.id === alunoSelecionado.id) {
            aluno.nome = resposta.nome;
            aluno.email = resposta.email;
            aluno.idade = resposta.idade;
          }
        })
        setData(dadosAuxiliar);
        abrirFecharModalEditar();
        setUpdateData(true);
      }).catch(error => {
        console.log(error);
      })
  };

  useEffect(() => {
    pedidoPut();
  }, []);
  //Aluno Selecionado  
  const [alunoSelecionado, setAlunoSelecionado] = useState({
    id: '',
    nome: '',
    email: '',
    idade: ''
  });

  //Requisição DELETE
  const pedidoDelete = async () => {
    await axios.delete(contextBaseUrl + '/' + alunoSelecionado.id)
      .then(response => {
        setData(data.filter(aluno => aluno.id !== response.data));
        abrirFecharModalExcluir();
        setUpdateData(true);
      }).catch(error => {
        console.log(error);
      })
  };

  useEffect(() => {
  if (updateData) {
      pedidoGet();
      setUpdateData(false);
    }  
  }, [updateData]);

  //**********FIM DAS REQUISIÇÕES***********/

  const selecionarAluno = (aluno, opcao) => {
    setAlunoSelecionado(aluno);

    (opcao === "Editar") ? abrirFecharModalEditar() : abrirFecharModalExcluir()
  }

  const handlerChange = e => {
    const { name, value } = e.target;
    setAlunoSelecionado({
      ...alunoSelecionado,
      [name]: value
    });
    console.log(alunoSelecionado);
  }

  const abrirFecharModalIncluir = () => {
    setIsInclude(!isInclude);
  }

  const abrirFecharModalEditar = () => {
    setIsEdit(!isEdit);
  }

  const abrirFecharModalExcluir = () => {
    setIsDelete(!isDelete);
  }

  return (
    <>
      <div className='aluno-container'>
        <br />
        <h3>Cadastro de Alunos</h3>
        <header className='aluno-container__header'>
          <img src={register_png} className="App-logo" alt="logo" />
          <button className="btn btn-primary aluno-container__button" onClick={() => abrirFecharModalIncluir()}>Novo</button>
        </header>
        <table className="table table-bordered table">
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
                  <button className="btn btn-warning" onClick={() => selecionarAluno(item, "Editar")}>Editar</button>{"|"}
                  <button className="btn btn-danger" onClick={() => selecionarAluno(item, "Excluir")}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* MODAL CADASTRO*/}
        <Modal isOpen={isInclude}>
          <ModalHeader>Cadastro de Alunos</ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input type="text" className="form-control" id="nome" name="nome" onChange={handlerChange} />
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" name="email" onChange={handlerChange} />
                <label htmlFor="idade">Idade</label>
                <input type="number" className="form-control" id="idade" name="idade" onChange={handlerChange} />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => pedidoPost()}>Salvar</button>{" "}
            <button className="btn btn-secondary" onClick={() => abrirFecharModalIncluir()}>Cancelar</button>
          </ModalFooter>
        </Modal>

        {/* MODAL EDIÇÃO*/}
        <Modal isOpen={isEdit}>
          <ModalHeader>Cadastro de Alunos</ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="id">ID</label>
                <input type="text" className="form-control" id="id" name="id" readOnly value={alunoSelecionado && alunoSelecionado.id} />
                <br />
                <label htmlFor="nome">Nome</label>
                <input type="text" className="form-control" id="nome" name="nome" onChange={handlerChange} value={alunoSelecionado && alunoSelecionado.nome} />
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" name="email" onChange={handlerChange} value={alunoSelecionado && alunoSelecionado.email} />
                <label htmlFor="idade">Idade</label>
                <input type="number" className="form-control" id="idade" name="idade" onChange={handlerChange} value={alunoSelecionado && alunoSelecionado.idade} />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={() => pedidoPut()}>Editar</button>{" "}
            <button className="btn btn-secondary" onClick={() => abrirFecharModalEditar()}>Cancelar</button>
          </ModalFooter>
        </Modal>

        {/* MODAL EXCLUSÃO*/}

        <Modal isOpen={isDelete}>
          <ModalHeader>Excluir Aluno</ModalHeader>
          <ModalBody>
            Confirma a exclusão do aluno {alunoSelecionado && alunoSelecionado.nome}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => pedidoDelete()}>Sim</button>
            <button className="btn btn-secondary" onClick={() => abrirFecharModalExcluir()}>Não</button>
          </ModalFooter>
        </Modal>

        {/* FIM MODAL*/}

      </div>
    </>
  )
}

export default App
