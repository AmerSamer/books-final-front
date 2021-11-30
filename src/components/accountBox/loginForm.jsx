import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import axios from 'axios';
// import Main from "../pages/Main";
var validator = require("email-validator");
var passwordValidator = require('password-validator');
var schema = new passwordValidator();
schema
  .is().min(8)                                    // Minimum length 8
  .is().max(100)                                  // Maximum length 100
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits(2)                                // Must have at least 2 digits
  .has().not().spaces()                           // Should not have spaces
  .is().not().oneOf(['', '']);                    // Blacklist these values

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  const [account, setAccount] = React.useState({
    email: null,
    password: null
  });
  const [msg, setMsg] = React.useState('')

  const loginHandler = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value
    })
  }
  const accountLoginHandler = () => {
    if (account.email && account.password) {
      if (validator.validate(account.email)) {
        if (schema.validate(account.password)) {
          const find = props.accounts.find((f) => ((f.email === account.email) && (f.password === account.password)))
          if (find) {
            // setMsg('Login Successfully')
            // console.log(find);
            // change ACTIVE to TRUE on db
           
                find.active = true
                axios.put(`http://localhost:4001/books/store/active/${find._id}`)
                  .then((res) => {
                    if (res.status === 200) {
                      setMsg('Login Successfully')
                      // addItem(addAccount)
                      // window.location.reload(false);
                      alert(`${find.email} login successfully`)
                      window.location.reload(false);
                    }
                    else {
                      alert("Something went wrong")
                    }
                  }).catch((err) => {
                    setMsg('ERRORRRRR')
                  })          
          } else {
            setMsg('Invalid Email And Password!')
          }
        } else {
          setMsg(`Min length 8 , Must have uppercase/lowercase letters , Must have at least 2 digit , Should not have spaces`)
        }
      } else {
        setMsg('Invalid Email!')
      }
    } else {
      setMsg('Fill In All Inputs')
    }
  }
  return (
    <>
      <BoxContainer>
        <FormContainer>
          <Input type="email" name="email" placeholder="Email" onChange={loginHandler} />
          <Input type="password" name="password" placeholder="Password" onChange={loginHandler} />
        </FormContainer>
        <Marginer direction="vertical" margin={10} />
        <MutedLink href="./signupForm">Forget your password?</MutedLink>
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="submit" onClick={accountLoginHandler}>Login</SubmitButton>
        <Marginer direction="vertical" margin="1em" />
        <>
          {msg === 'Login Successfully' ? <div style={{ color: 'green', fontSize: '12px' }}>{msg}</div> : <div style={{ color: 'red', fontSize: '12px' }}>{msg}</div>}
        </>
        <MutedLink href="#">
          Don't have an accoun?{" "}
          <BoldLink href="#" onClick={switchToSignup}>
            Sign Up
          </BoldLink>
        </MutedLink>
      </BoxContainer>
      {/* <BoxContainer>
        <FormContainer>
          <Input type="email" name="email" placeholder="Email" onChange={loginHandler} />
          <Input type="password" name="password" placeholder="Password" onChange={loginHandler} />
        </FormContainer>
        <Marginer direction="vertical" margin={10} />
        <MutedLink href="./signupForm">Forget your password?</MutedLink>
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="submit" onClick={accountLoginHandler}>Login</SubmitButton>
        <Marginer direction="vertical" margin="1em" />
        <>
          {msg === 'Login Successfully' ? <div style={{ color: 'green', fontSize: '12px' }}>{msg}</div> : <div style={{ color: 'red', fontSize: '12px' }}>{msg}</div>}
        </>
        <MutedLink href="#">
          Don't have an accoun?{" "}
          <BoldLink href="#" onClick={switchToSignup}>
            Sign Up
          </BoldLink>
        </MutedLink>
      </BoxContainer> */}
    </>
  );
}
