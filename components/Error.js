import React from "react";
import { useRouteError } from "react-router";

function Error() {
  const error = useRouteError();
  // console.log(error);
  return (
    <>
      <p>
        Error occured <b>{error.status}</b>
      </p>
    </>
  );
}

export default Error;
