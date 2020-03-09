import React, { useState, useEffect } from "react";
import "./login.css";
import { getUsers } from "../../services/users_db";
import { Redirect } from "react-router-dom";

const Login = () => {
  //con mi var data manejo la promise
  const [data, setData] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    getUsers()
      .then(results => {
        setData(results);
      })
      .catch(err => console.log(err));
  }, [pass]);

  const handleUser = e => {
    console.log(e.target.value);
    const currentUser = e.target.value;
    console.log(" user " + currentUser);

    setUser(currentUser);
  };
  const handlePass = e => {
    console.log(e.target.value);
    const currentPass = e.target.value;
    console.log("pass " + currentPass);

    setPass(currentPass);
  };

  for (let i = 0; i < data.length; i++) {
    console.log("hola");
    if (
      user === data[i].name &&
      pass === data[i].password &&
      data[i].active === 1
    ) {
      return <Redirect to={"/home"} />;
    }
  }

  return (
    <>
      <div className="father-container">
        <form className="form-class" /*onSubmit={this.handleSubmit}*/>
          <div className="col-auto">
            <div className="form-group">
              <label className="title">Name</label>
              <input
                type="text"
                className="form-control"
                value={user}
                aria-describedby="emailHelp"
                placeholder="name"
                required
                name="name"
                onChange={handleUser}
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your data with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label className="title">Password</label>
              <input
                type="password"
                className="form-control"
                value={pass}
                placeholder="password"
                required
                name="password"
                onChange={handlePass}
              />
            </div>
            <button type="submit" className="btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
