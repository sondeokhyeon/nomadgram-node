import React, { useState } from "react";
import AuthPrecenter from "./AuthPrecenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks"
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueies";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const [requestSecretMutation] = useMutation(LOG_IN, { 
      variables: { email : email.value }
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName : lastName.value
    }
  })

  const onSubmit = async(e) => {
    e.preventDefault();
    if(action === "logIn") {
      console.log('err')
      if(email.value !== "") {
        try {
          const { requestSecret } = await requestSecretMutation();
          if(!requestSecret) {
            toast.error("You don't have an account yet, create one");
            setTimeout(() => setAction('signUp'), 3000)
          }
        } catch {
          toast.error("Can't request secret try again");
        }
      } else {
        toast.error("Email is required");
      }
    } else if(action === "signUp") {
      if(email.value     !== "" && 
         username.value  !== "" && 
         firstName.value !== "" &&
         lastName.value  !== "") {
           try {
              const { createAccount } = await createAccountMutation();
              if(!createAccount) {
                toast.error("can't create account");
              } else {
                toast.success('Account created! Log In now!')
                setTimeout(() => setAction("login"), 3000)
              }
           } catch(e) {  
              toast.error(e.message);
           }
         } else {
           toast.error("All Field are required");
         }
    }
  }

  return <AuthPrecenter 
    setAction={setAction} 
    action={action}
    username={username}
    firstName={firstName}
    lastName={lastName}
    email={email}
    onSubmit={onSubmit}
    />
};