import axios from "axios";

export default ({ req }) => {
  // Check if it is running on the server or the browser
  if (typeof window === "undefined") {
    return axios.create({
      baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers
    })

  } else {
    return axios.create({
      baseURL: "/"
    })

  }
}