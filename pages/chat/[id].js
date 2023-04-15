import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import ScreenPercakapan from "@/components/ScreenPercakapan";
import { db, auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

//component
function Chat({ pesan, chat }) {
  // console.log("[id]", typeof Chat);
  const [userLogin] = useAuthState(auth);

  return (
    <Kontener>
      <Head>
        <title>Chat: {chat.users?.[1]}</title>
      </Head>
      <Sidebar />
      <KolomChat>
        <ScreenPercakapan pesan={pesan} chat={chat} />
      </KolomChat>
    </Kontener>
  );
}

export default Chat;

//serverside rendering
export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  //menyiapkan pesan di server
  const pesanpesan = await ref
    .collection("pesan")
//     .orderBy("timestamp", "asc")
    .get();

  const pesan = pesanpesan.docs
    .map((e) => ({
      id: e.id,
      ...e.data(),
    }))
    .map((mesej) => ({
      ...mesej,
      timestamp: mesej.timestamp.toDate().getTime(),
    }));

  //menyiapkan pesan
  const responsePesan = await ref.get();
  const chat = {
    id: responsePesan.id,
    ...responsePesan.data(),
  };

  //mengirim pesan melalui props
  return {
    props: {
      pesan: JSON.stringify(pesan),
      chat: chat,
    },
  };
}

//styled
const Kontener = styled.div`
  display: flex;
  width: 85%;
  margin: auto;
  margin-top: 2vh;
`;

const KolomChat = styled.div`
  flex: 1;
  overflow: scroll;
  height: 97vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
