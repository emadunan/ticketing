import React from "react";
import useRequest from "../../hooks/use-request";
import { useRouter } from "next/navigation";

const Signout = () => {
  const router = useRouter();

  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => router.push("/")
  });

  React.useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out ...</div>
}

export default Signout;