import { auth, db } from "@/firebase";
import styled from "@emotion/styled";
import { Avatar, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { useCollection } from "react-firebase-hooks/firestore";
import PesanComponent from "./PesanComponent";
import { InsertEmoticon } from "@mui/icons-material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicNoneIcon from "@mui/icons-material/MicNone";
import firebase from "firebase/compat/app";
import getRecipientEmail from "@/utils/getRecipientEmail";
import TimeAgo from "timeago-react";

function ScreenPercakapan(props) {
  // console.log("ScreenPercakapan", typeof ScreenPercakapan);
  const [userLogin] = useAuthState(auth);
  const pesanAkhirRef = useRef(null);
  const router = useRouter();
  const [isiPesan, setIsiPesan] = useState("");
  const [pesanSnap] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("pesan")
      .orderBy("timestamp", "asc")
  );
  const [penerimaSnap] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(props.chat.users, userLogin))
  );

  const skrollKeBawah = () => {
    pesanAkhirRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const showPesan = () => {
    if (pesanSnap?.docs.length > 0) {
      skrollKeBawah();
      return pesanSnap.docs.map((e) => (
        <PesanComponent
          key={e.id}
          user={e.data().user}
          pesan={{
            ...e.data(),
            timestamp: e.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(props.pesan).map((e) => (
        <PesanComponent key={e.id} user={e.user} pesan={e} />
      ));
    }
  };

  const kirimPesan = (e) => {
    e.preventDefault();
    //update last online
    db.collection("users").doc(userLogin.uid).set(
      {
        lastOnline: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    db.collection("chats").doc(router.query.id).collection("pesan").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      pesan: isiPesan,
      user: userLogin.email,
      displayPict: userLogin.photoURL,
    });
    setIsiPesan("");
    // skrollKeBawah();
  };

  const penerimaPesan = getRecipientEmail(props.chat.users, userLogin);
  const dataProfil = penerimaSnap?.docs[0]?.data();

  return (
    <Kontener>
      <HeaderChat>
        {dataProfil ? (
          <Avatar src={dataProfil.displayPict} />
        ) : (
          <Avatar>{penerimaPesan[0]}</Avatar>
        )}
        <HeaderInfo>
          <h4>{penerimaPesan}</h4>
          <marquee direction="left" width="120px">
            {dataProfil ? (
              <div>
                Last Seen :
                {dataProfil.lastOnline.toDate() ? (
                  <TimeAgo
                    datetime={dataProfil.lastOnline.toDate()}
                    locale={"id_ID"}
                  />
                ) : (
                  "Unavailable"
                )}
              </div>
            ) : (
              <p>Last Seen: Unavailable</p>
            )}
          </marquee>
        </HeaderInfo>
        <Ikon>
          <IconButton style={{ color: "#ccc" }}>
            <SearchIcon />
          </IconButton>
          <IconButton style={{ color: "#ccc" }}>
            <MoreVertIcon />
          </IconButton>
        </Ikon>
      </HeaderChat>
      <KolomChat>
        {showPesan()}
        <PesanAkhir ref={pesanAkhirRef} />
      </KolomChat>
      <InputMsg>
        <InsertEmoticon style={{ color: "#8696a0" }} />
        <AttachFileIcon style={{ color: "#8696a0" }} />
        <Input value={isiPesan} onChange={(e) => setIsiPesan(e.target.value)} />
        <button hidden disabled={!isiPesan} type="submit" onClick={kirimPesan}>
          Send
        </button>
        <MicNoneIcon style={{ color: "#8696a0" }} />
      </InputMsg>
    </Kontener>
  );
}

export default ScreenPercakapan;

const Kontener = styled.div`
  color: white;
`;

const HeaderChat = styled.div`
  position: sticky;
  top: 0;
  background-color: #202c33;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
  padding: 10px;
`;

const HeaderInfo = styled.div`
  flex: 1;
  flex-direction: column;
  margin-left: 15px;
  > h4 {
    margin-bottom: 3px;
    color: #ccc;
    word-break: break-word;
  }
  > marquee {
    color: gray;
    font-size: smaller;
  }
`;

const Ikon = styled.div``;

const PesanAkhir = styled.div`
  margin-bottom: 1px;
`;

const KolomChat = styled.div`
  z-index: -100;
  min-height: 85vh;
  background-color: #1a0014;
  padding-bottom: 0.1vh;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin-left: 15px;
  margin-right: 15px;
  background-color: #2a3942;
  outline: 0;
  color: #8696a0;
  position: sticky;
  bottom: 0;
`;

const InputMsg = styled.form`
  display: flex;
  align-items: center;
  position: sticky;
  bottom: 0;
  background-color: #202c33;
  padding: 10px 5px;
`;
