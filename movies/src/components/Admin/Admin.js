import React from "react";
import AuthForm from "../Auth/AuthForm";
import { sendAdminAuthRequest } from "../../../src/api-helpers/api-helpers.js";
import { useDispatch } from "react-redux";
import { adminActions } from "../../store/index.js";

function Admin() {
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
  };
  const getData = (data) => {
    sendAdminAuthRequest(data.inputs)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  );
}

export default Admin;
