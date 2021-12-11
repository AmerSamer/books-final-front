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
import axios from "axios";
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

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const [addAccount, setAddAccount] = React.useState({
    name: null,
    email: null,
    password: null,
    confirmPassword: null
  });
  const [msg, setMsg] = React.useState('')

  const addHandler = (e) => {
    setAddAccount({
      ...addAccount,
      [e.target.name]: e.target.value
    })
  }
  const addAccountHandler = () => {
    if (addAccount.name && addAccount.email && addAccount.password && addAccount.confirmPassword) {
      if (!/\s/g.test(addAccount.name)) {
        if (validator.validate(addAccount.email)) {
          if (addAccount.password === addAccount.confirmPassword) {
            if (schema.validate(addAccount.password)) {
              const find = props.accounts.find((f) => f.email === addAccount.email)
              if (!find) {
                const findd = props.accounts.find((ff) => ff.name === addAccount.name)
                if (!findd) {
                  axios.post(`https://books-store-back.herokuapp.com/books/store`, addAccount)
                    .then((res) => {
                      if (res.status === 200) {
                        setMsg('Account Added Successfully')
                        props.addItem(addAccount);
                        // alert(`${find.email} Sign Up successfully`)
                        window.location.reload(false);
                      }
                      else {
                        setMsg('Invalid Email!')
                      }
                    }).catch((err) => {
                      setMsg('err')
                    })
                } else {
                  setMsg('User Name Already Exist')
                }
              } else {
                setMsg('Invalid Email!')
              }
            } else {
              setMsg(`Min length 8 , Must have uppercase/lowercase letters , Must have at least 2 digit , Should not have spaces`)
            }
          } else {
            setMsg('Password not match!')
          }
        } else {
          setMsg('Invalid Email!')
        }
      } else {
        setMsg('User Name Should Not include Space-Key')
      }
    } else {
      setMsg('Fill In All Inputs')
    }
  }
  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" name="name" placeholder="User Name" onChange={addHandler} />
        <Input type="email" name="email" placeholder="Email" onChange={addHandler} />
        <Input type="password" name="password" placeholder="Password" onChange={addHandler} />
        <Input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={addHandler} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={addAccountHandler}>SignUp</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <>
        {msg === 'Account Added Successfully' ? <div style={{ color: 'green', fontSize: '12px' }}>{msg}</div> : <div style={{ color: 'red', fontSize: '12px' }}>{msg}</div>}
      </>
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Login
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
