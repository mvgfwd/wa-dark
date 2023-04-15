import React from "react";
import { PacmanLoader } from "react-spinners";
import styled from "styled-components";

function Loading() {
  // console.log("Loading", typeof Loading);
  return (
    <Kontener
      style={{
        display: "grid",
        placeItems: "center",
        backgroundColor: "black",
        height: "80vh",
      }}
    >
      <img
        src="https://i.pinimg.com/736x/80/e3/02/80e302f3f90f0b7776f9bdb636388ef4.jpg"
        alt="Loading"
        height={200}
        style={{ marginBottom: 15 }}
      />
      <PacmanLoader color="#36d7b7" />
    </Kontener>
  );
}

const Kontener = styled.div``;

export default Loading;
