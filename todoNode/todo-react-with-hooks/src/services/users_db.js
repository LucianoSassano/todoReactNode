export const getUsers = async () => {
  const url = "http://localhost:3000/api/users/";

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data.tasks);

    return data.tasks;
  } catch (err) {
    console.error(err);
  }
};
