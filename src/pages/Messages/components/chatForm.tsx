import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import AttachmentIcon from '@material-ui/icons/Attachment';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import Input from '../../../components/common/Input';
import { useForm } from "react-hook-form";
import socketIOClient from "socket.io-client";
import { sendMessageRequest } from '../../../reducers/messages/message.reducer';
import { get } from 'lodash';
import { rootReducersState } from '../../../reducers';

const _ = { get };
type Inputs = {
  message: string;
};

let socket;

const ChatForm = () => {

  const dispatch = useDispatch();
  const sessionReducer = useSelector(({ session }: rootReducersState) => session);
  const { register, handleSubmit, reset } = useForm<Inputs>();



  useEffect(() => {

    // Socket IO Config Once
    // Socket IO Config Once
    const userData = _.get(sessionReducer, "currentUser", {});
    const roomId = `user_${_.get(userData, "id", 0)}`;
    const chatRoom = "2_1";
    socket = socketIOClient(process.env.REACT_APP_SOCKET_END_POINT);
    socket.on("connect", function () {
      // socket.emit("room", roomId);
      socket.emit("createRoom", chatRoom);
    });

    socket.on("inviteRoom", (data) => {
      socket.emit("joinRoom", data);
    });

    // Receive the message from another user
    socket.on("emit_message", (data) => {
      console.log("Message received - ", data);
    });

    return () => {
      if (socket) {
        socket.close();
      }
    }
  }, []);



  const onSubmit = (payload) => {
    const chatRoom = "2_1";
    socket.emit("emit_message", { chatRoom, from: "Chat window" })
  };

  return (
    <div id="chat-form" className="chat-form">
      <form
        className={"send-message-form"}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <AttachmentIcon />
        {/* <Input inputRef={register} type="hidden" name="id" value={11} /> */}
        <Input inputRef={register} name="message" className="message-input" type="text" placeholder="Type a message" />
        <IconButton aria-label="send" className="message-submit-btn" type="submit">
          <SendIcon />
        </IconButton>
      </form>
    </div>
  );
}

export default ChatForm;
