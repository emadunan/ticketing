import React from 'react'
import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);

  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
      headers: req.headers
    })
      .catch((err) => {
        console.log(err.message);
      });

    return data;

  } else {
    const { data } = await axios.get('/api/users/currentuser').catch((err) => {
      console.log(err.message);
    });

    console.log("FROM CLIENT", data);

    return data;
  }
}

export default LandingPage;
