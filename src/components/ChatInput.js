import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { actionCreators as chatActions } from "../redux/modules/chat";
import { Grid, Text, Button, Input } from "../elements/element";

const sockJs = new SockJS("https://jinnn.shop/ws-stomp"); // 서버주소/ws-stomp
const stomp = Stomp.over(sockJs);

const ChatInput = (props) => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");

  const _userInfo = useSelector((state) => state?.user?.userInfo);
  const { chatRoomId } = props;
  const writer = _userInfo?.nickname;

  const [chat, setChat] = React.useState("");

  const onChange = (e) => {
    setChat(e.target.value);
  };

  const onSend = async () => {
    try {
      const chatData = {
        roomId: chatRoomId,
        message: chat,
        // message: chat.target.value,
        sender: writer,
        type: "TALK",
      };
      console.log(chatData);
      if (chat === "") {
        console.log(chatData);
        return;
      }
      waitForConnection(stomp, function () {
        stomp.send(
          "/pub/chat/message",
          { token: token },
          JSON.stringify(chatData)
        );
        console.log(stomp.ws.readyState);
        console.log(chatData);
        // dispatch(chatActions.sendChat(chatData));
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
        console.log(stomp.ws.readyState);
        waitForConnection(stomp, callback);
      }
    }, 1);
  }

  return (
    <React.Fragment>
      <Grid
        bg="#fff"
        height="48px"
        border="1px solid #C4C4C4"
        radius="12px"
        padding="15px 13px"
        flexRow
      >
        <Input
          width="100%"
          border="none"
          margin="0 5.5px"
          placeholder="메시지를 입력하세요."
          _onChange={onChange}
          value={chat}
          onSubmit={onSend}
          is_submit
        />
        <Button border="none" width="auto" _onClick={onSend}>
          {/* <Button border="none" width="auto"> */}
          <Text size="16px" bold="500" margin="0" color="#959595">
            등록
          </Text>
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default ChatInput;
