import React from "react";
import styled from "styled-components";
import { Avatar, IconButton, Button } from "@mui/material";
import IkonChat from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import * as ValidasiEmail from "email-validator";
import { auth, db } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

function Sidebar() {
  console.log("Sidebar", typeof Sidebar);
  const [user] = useAuthState(auth);
  //take all chat with whoever the login user has
  const userChatReference = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  //mengambil semua snapshot chatnya
  const [chatsSnap] = useCollection(userChatReference);

  const startChat = () => {
    const input = prompt(`Enter Email to Chat:`);
    if (!input) {
      return null;
    }
    if (
      ValidasiEmail.validate(input) &&
      !chatUdahAda(input) &&
      input !== user.email
    ) {
      //valid: email valid + chat gk ada + gk chattan dgn diri sndri
      db.collection("chats").add({
        users: [user.email, input],
      });
    } else {
      alert("Valid Email Required");
    }
  };

  const chatUdahAda = (emailPenerima) =>
    //mengembalikan element or null/undefined
    !!chatsSnap?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === emailPenerima)?.length > 0
    );

  const signOut = () => {
    auth.signOut();
  };

  return (
    <Kontener>
      <Head1>
        <UserPP
          src={user?.photoURL}
          onClick={() => {
            auth.signOut();
            localStorage.clear();
          }}
        />
        <p>{user.email}</p>
        <SejumlahIcon>
          <IconButton>
            <IkonChat style={{ color: "#36d7b7" }} />
          </IconButton>
          <DropDownHover>
            <IconButton
              style={{
                position: "relative",
                display: "inline-block",
              }}
            >
              <MoreVertIcon style={{ color: "#36d7b7" }} />
              <DropDown>
                <p onClick={signOut}>LOGOUT</p>
              </DropDown>
            </IconButton>
          </DropDownHover>
        </SejumlahIcon>
      </Head1>
      <Cari>
        <SearchIcon />
        <KolomCari placeholder="Search disini" />
      </Cari>
      <TombolNewChat onClick={startChat}>
        <p>start a Chat</p>
      </TombolNewChat>

      {chatsSnap?.docs.map((everyChat) => (
        <Chat
          key={everyChat.id}
          id={everyChat.id}
          users={everyChat.data().users}
        />
      ))}
    </Kontener>
  );
}

export default Sidebar;

const Kontener = styled.div`
  background-color: #111b21;
  flex: 0.45;
  border-right: 1px solid #202c33;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  height: 97vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Head1 = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  justify-content: space-between;
  background-color: #202c33;
  z-index: 1;
  align-items: center;
  height: 65px;
  border-bottom: 1px solid #202c00;
  > p {
    color: #ccc;
    flex: 1;
    word-break: break-word;
    font-weight: bolder;
  }
`;

const UserPP = styled(Avatar)`
  margin: 10px;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const SejumlahIcon = styled.div`
  display: flex;
`;

const Cari = styled.div`
  display: flex;
  align-items: center;
  margin: 15px;
  background-color: #202c33;
  padding: 5px 10px;
  border-radius: 5px;
  color: #778690;
  z-index: -1;
`;

const KolomCari = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
  background-color: #202c33;
  color: white;
  margin-left: 20px;
`;

const TombolNewChat = styled.div`
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  padding: 12px 0;
  border: 1px solid #202c33;
  color: #107896;
  border-radius: 5px;
  /* border-bottom: 1px solid #222e35;
  border-top: 1px solid #222e35; */
  :hover {
    width: 100%;
    background-color: black;
    color: #36d7b7;
    border: 1px solid #36d7b7;
    cursor: pointer;
  }
`;

const DropDown = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  width: fit-content;
  font-size: 12px;
  border-radius: 3px;
  padding: 8px 3px;
  margin: 5px -70%;
  color: #000;
`;

const DropDownHover = styled.div`
  :hover ${DropDown} {
    background-color: black;
    display: block;
    border: 1px solid #36d7b7;
    color: #36d7b7;
  }
`;
