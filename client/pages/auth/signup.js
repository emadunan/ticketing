import React from 'react';
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/users/signup", {
        email, password
      });

      console.log(response.data);
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors.length > 0 && (
      <div className='alert alert-danger'>
        <h4>Ooops....</h4>
        {errors.map(err => <li key={err.message}>{err.message}</li>)}
      </div>)}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}

export default Signup