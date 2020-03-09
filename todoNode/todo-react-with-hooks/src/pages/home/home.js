import React, { useState, useEffect } from "react";
import "../home/home.css";
import Form from "../../components/Form";
import ListsContainer from "../../components/ListContainer";
import CustomModal from "../../components/common/CustomModal";
import useModalWithData from "../../hooks/useModal";
import { getAll, addTask, modifyTask } from "../../services/task_db";

const Home = () => {
    const initialFormState = {
      name: "",
      description: ""
    };
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState(initialFormState);
    const [isModalOpened,setIsModalOpened,modalData,setModalData] = useModalWithData();
  
    const handleClickAddTask = () => {
      setForm(initialFormState);
      setModalData(initialFormState);
      setIsModalOpened(true);
    };
    const handleChange = e => {
      const value = e.target.value;
      const name = e.target.name;
  
      setForm({ ...form, [name]: value });
      console.log(form);
      
    };
    const handleSubmit = e => {
      e.preventDefault();
      const { name, description } = form;
      if (form.id) {
        const newTasks = tasks.map(task => (task.task === form.id ? form : task));
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
      console.log(task.isDone);
      
      if (task.isDone === 0) {
        task.isDone = 1;
      } else {
        task.isDone = 0;
      }
      console.log(task);
  
      modifyTask(task);
      window.location.reload();
      //deberia re-renderizar para actualizar los componentes pero como trabaja contra la db actualizo .
    };
    const editTask = task => {
      console.log("llegue edit");
  
      
      // setModalData(form);
      setIsModalOpened(true);
      if(task.task_id){
        
        console.log("se rompe");
        
        modifyTask(task);
        
      }
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
  
  export default Home;