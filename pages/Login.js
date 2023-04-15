import { auth, provider } from "@/firebase";
import { Button } from "@mui/material";
import Head from "next/head";
import React, { useState } from "react";
import styled from "styled-components";
import { signInWithPopup } from "firebase/auth";
import Home from "./index";

const Kontener = styled.div`
  /* background-color: black;
  width: 100%;
  display: grid;
  place-items: center;
  height: 100vh; */
`;

const LoginKontener = styled.div`
  /* display: flex;
  flex-direction: column;
  border: 1px solid #222e35;
  margin-top: -10vh;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 0 40px #0ff; */
`;

const Logo = styled.img`
  /* height: 50vh; */
`;

function Login() {
  console.log("Login", typeof Login);
  const [value, setValue] = useState();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setValue(data.user.email);
        // localStorage.setItem("email", data.user.email);
      })
      .catch((err) => alert(err));
    console.log("value inside signIn", value);
  };

  // useEffect(() => {
  //   setValue(localStorage.getItem("email"));
  //   console.log("value", value);
  // });

  // console.log("value outside useeffect", value);

  return (
    <Kontener
      style={{
        backgroundColor: "black",
        width: "100%",
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <Head>
        <title>Login Wangsap</title>
      </Head>
      {value ? (
        <Home value={value} />
      ) : (
        <LoginKontener
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid #222e35",
            marginTop: "-10vh",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 0 40px #0ff",
          }}
        >
          <Logo
            style={{ height: "50vh" }}
            src="https://i.pinimg.com/originals/65/3d/6a/653d6a86980710a6cda7728303cf0cf4.jpg"
          />
          <Button onClick={signIn} variant="outlined">
            Sign in with google
          </Button>
        </LoginKontener>
      )}
    </Kontener>
  );
}

export default Login;
