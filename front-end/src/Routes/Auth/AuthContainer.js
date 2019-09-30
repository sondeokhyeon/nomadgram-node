import React, { useState } from "react";
import AuthPrecenter from "./AuthPrecenter";
import useInput from "../../Hooks/useInput";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const password = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");

  return <AuthPrecenter 
    setAction={setAction} 
    action={action}
    username={username}
    password={password}
    firstName={firstName}
    lastName={lastName}
    email={email}
    />
};