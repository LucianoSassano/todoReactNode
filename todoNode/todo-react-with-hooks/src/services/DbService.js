export const getAll = async () => {
  const url = "http://localhost:3000/api/tasks/";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.tasks);
  

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
