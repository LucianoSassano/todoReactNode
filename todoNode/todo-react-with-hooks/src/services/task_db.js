export const getAll = async () => {
  const url = "http://localhost:3000/api/tasks/";
  const response = await fetch(url);
  const data = await response.json();

  return data;
};



export const addTask = async (title, description) => {
  fetch("http://localhost:3000/api/tasks/", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      description: description,
      isDone: 0
    })
  });
};

export const modifyTask = async task => {
  
  console.log(task.task_id);
  

  fetch(`http://localhost:3000/api/tasks/${task.task_id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(task)
  });
  
  
};
