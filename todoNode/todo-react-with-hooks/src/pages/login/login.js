import React from "react";
import "./login.css";

const Login = () => {
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
                // value={this.state.email}
                aria-describedby="emailHelp"
                placeholder="name"
                required
                name="name"
                //onChange={this.handleChange}
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
                // value={this.state.password}
                placeholder="password"
                required
                name="password"
                //onChange={this.handleChange}
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
