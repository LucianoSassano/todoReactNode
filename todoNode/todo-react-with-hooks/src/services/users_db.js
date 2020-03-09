export const getUsers = async () => {
  const url = "http://localhost:3000/api/tasks/";
  const response = await fetch(url);
  const data = response.json();

  return data;
};
