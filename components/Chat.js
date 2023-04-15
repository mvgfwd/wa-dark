import { auth, db } from "@/firebase";
import getRecipientEmail from "@/utils/getRecipientEmail";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";

function Chat(props) {
  console.log("ChatHead", typeof Chat);
  const router = useRouter();

  const chatFocus = () => {
    router.push(`/chat/${props.id}`);
  };

  const [userLogin] = useAuthState(auth);
  const [recipientSnap] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(props.users, userLogin))
  );

  const recipient = recipientSnap?.docs?.[0]?.data();

  const recipientPerson = getRecipientEmail(props.users, userLogin);

  return (
    <Kontener onClick={chatFocus}>
      {recipient ? (
        <DispPict src={recipient?.displayPict} />
      ) : (
        <DispPict>{recipientPerson[0]}</DispPict>
      )}

      <p>{recipientPerson}</p>
    </Kontener>
  );
}

export default Chat;

const Kontener = styled.div`
  display: flex;
  align-items: center;
  word-break: break-word;
  cursor: pointer;
  color: #ccc;
  :hover {
    background-color: #202c33;
    color: #36d7b7;
  }
  :active {
    background-color: #202c53;
  }
`;

const DispPict = styled(Avatar)`
  margin: 8px;
  margin-right: 15px;
`;
