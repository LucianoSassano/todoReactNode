import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import ListsContainer from "./components/ListContainer";
import CustomModal from "./components/common/CustomModal";
import useModalWithData from "./hooks/useModalWithData";
import { getAll, addTask, modifyTask} from "./services/DbService";

const App = () => {
  const initialFormState = {
    name: "",
    description: ""
  };
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [
    setIsModalOpened,
    isModalOpened,
    modalData,
    setModalData
  ] = useModalWithData();

  const handleClickAddTask = () => {
    setForm(initialFormState);
    setModalData(initialFormState);
    setIsModalOpened(true);
  };
  const handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;

    setForm({ ...form, [name]: value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    const { name, description } = form;
    if (form.id) {
      const newTasks = tasks.map(task => (task.id === form.id ? form : task));
      setTasks(newTasks);
      setIsModalOpened(false);
    } else if (name && description) {
      const task = {
        name,
        description
      };
      addTask(task.name, task.description);
      task.id = tasks[tasks.length - 1].id + 1;
      setTasks([...tasks, task]);
      setIsModalOpened(false);
    }
  };
  useEffect(() => {
    getAll().then(results => setTasks(results.tasks));
  }, []);

  const changeTaskStatus = task => {
    if (task.isDone === 0) {
      task.isDone = 1;
    } else {
      task.isDone = 0;
    }
    console.log(task);
    
    modifyTask(task)
  };
  const editTask = task => {
    setForm(task);
    setModalData(form);
    setIsModalOpened(true);
    //toma los datos que ya existen
    modifyTask(task.task_id, task.title, task.description);
  };
  return (
    <div className="container">
      <CustomModal
        isActive={isModalOpened}
        title={form.id ?? form.id > 0 ? "Editar tarea" : "Nuevo tarea"}
        handleClose={() => setIsModalOpened(false)}
      >
        <Form onSubmit={handleSubmit} onChange={handleChange} form={form} />
      </CustomModal>

      <div className="row mt-3">
        <div className="col">
          <h2>Tareas</h2>
        </div>
        <div className="col">
          <button
            className="btn btn-primary float-right"
            onClick={handleClickAddTask}
          >
            Nueva
          </button>
        </div>
      </div>

      <div className="row mt-3">
        <ListsContainer
          tasks={tasks}
          editTask={editTask}
          changeTaskStatus={changeTaskStatus}
        />
      </div>
    </div>
  );
};

export default App;
