import React from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { Grid, Text, Button, Input, ElInput } from "../elements/element";

// const sockJs = new SockJS("http://3.34.122.99:8080/ws-stomp"); // 로컬
// const sockJs = new SockJS("http://15.164.102.106:8080/ws-stomp"); // 로컬
const sockJs = new SockJS("https://jinnn.shop/ws-stomp"); // 배포
const stomp = Stomp.over(sockJs);

const ChatInput = (props) => {
  const token = sessionStorage.getItem("token");

  const _userInfo = useSelector((state) => state?.user?.userInfo);
  const { chatRoomId } = props;
  const writer = _userInfo?.nickname;
  stomp.debug = null;
  const [chat, setChat] = React.useState("");

  const onChange = (e) => {
    setChat(e.target.value);
  };

  const onSend = async () => {
    try {
      const chatData = {
        roomId: parseInt(chatRoomId),
        message: chat,
        sender: writer,
        type: "TALK",
      };
      if (chat === "") {
        return;
      }
      waitForConnection(stomp, function () {
        stomp.send(
          "/pub/chat/message",
          { token: token },
          JSON.stringify(chatData)
        );
        setChat("");
      });
    } catch (err) {
      console.log(err);
      console.log(stomp.ws.readyState);
    }
  };

  function waitForConnection(stomp, callback) {
    setTimeout(function () {
      if (stomp.ws.readyState == 1) {
        callback();
      } else {
        waitForConnection(stomp, callback);
      }
    }, 1);
  }

  return (
    <React.Fragment>
      <Grid isFlex>
        <Grid
          bg="#fff"
          height="48px"
          border="1px solid #C4C4C4"
          radius="12px"
          padding="15px 12.5px"
          flexRow
          margin="0"
        >
          <ElInput
            type="text"
            size="16px"
            width="100%"
            border="none"
            margin="0"
            placeholder="메시지를 입력하세요."
            _onChange={onChange}
            value={chat}
            onSubmit={onSend}
          />
          <Button border="none" width="auto" _onClick={onSend}>
            <Text size="16px" bold="500" margin="0" color="#7E7E7E">
              등록
            </Text>
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ChatInput;
