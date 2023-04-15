import { auth } from "@/firebase";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import moment from "moment/moment";

function PesanComponent(props) {
  // console.log("PesanComponent", typeof PesanComponent);
  const [userLogin] = useAuthState(auth);

  const [TipePesan, setTipePesan] = useState(Pengirim);

  useEffect(() => {
    const TipePesan = props.user === userLogin.email ? Pengirim : Penerima;
    if (TipePesan === Pengirim) {
      setTipePesan(Pengirim);
    } else {
      setTipePesan(Penerima);
    }
  }, []);

  // const TipePesan = props.user === userLogin.email ? Pengirim : Penerima;

  return (
    <Kontener style={{ margin: "auto" }}>
      <TipePesan>
        {props.pesan.pesan}

        <p>{moment(props.pesan.timestamp).format("LT")}</p>
      </TipePesan>
    </Kontener>
  );
}

export default PesanComponent;

const Kontener = styled.div``;

const elemenPesan = styled.div`
  width: fit-content;
  padding: 13px;
  margin-bottom: 2vh;
  min-width: 60px;
  padding-bottom: 13px;
  position: relative;
  text-align: right;
  border-radius: 7px;
  box-shadow: 2px 2px 2px 1px rgba(255, 255, 255, 0.54);
  color: darkmagenta;
  /* font-size: medium; */
  > p {
    color: #50342c;
    font-size: smaller;
    margin-top: 6px;
  }
`;

const Pengirim = styled(elemenPesan)`
  margin-left: auto;
  margin-right: 9px;
  background-color: #45a30f;
  color: black;
`;

const Penerima = styled(elemenPesan)`
  background-color: #ccc;
  text-align: left;
  margin-left: 9px;
`;
