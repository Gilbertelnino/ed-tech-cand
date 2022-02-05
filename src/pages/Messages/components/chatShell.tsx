import React, { useEffect } from 'react';
import _ from "lodash"l
import { useForm } from "react-hook-form";
import { Send as SendIcon } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import ChatForm from "./chatForm";
import ChatTitle from "./chatTitle";
import ChatSearch from "./chatSearch";
import MessageList from "./messageList";
import socketIOClient from "socket.io-client";
import NewConversation from "./newConversation";
import ConversationList from "./conversationList";


import { Input, Button } from "../../../components/common";

import daryl from "../images/profiles/daryl.png";
import { useSelector } from "react-redux";
import { rootReducersState } from '../../../reducers';

type Inputs = {
  message: string;
};

let socket;

const ChatShell = () => {

  const sessionReducer = useSelector(({ session }: rootReducersState) => session);

  const { register, handleSubmit, reset } = useForm<Inputs>();

  useEffect(() => {

    // Socket IO Config Once
    const userData = _.get(sessionReducer, "currentUser", {});
    const roomId = `user_${_.get(userData, "id", 0)}`;
    const chatRoom = "2_1";
    socket = socketIOClient(process.env.REACT_APP_SOCKET_END_POINT);
    socket.on("connect", function () {
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
        socket = null
      }
    }
  }, []);

  const onSubmit = (payload) => {
    const chatRoom = "2_1";
    socket.emit("emit_message", { chatRoom, from: "Chat window" })
  };

  return (
    <div id="chat-container" className="chat-container">
      <div id="search-container" className="search-container">
        <input type="text" placeholder="Search" />
      </div>
      <ConversationList />
      <div id="new-message-container" className="new-message-container">
        <span></span>
      </div>
      <div id="chat-title" className="chat-title">
        <div className="left">
          <img src={daryl} alt="Daryl Duckmanton" />
          <div className="chat-title-info">
            <p>Daryl Duckmanton</p>
            <span>UX Designer | Seattle, WA | U.S. Citizen </span>
          </div>
        </div>
        <Button variant="outlined" className="btn-small btn-transparent btn-small-transparant">Profile</Button>
        {/* <img src={trashLogo} alt="Delete Conversation" /> */}
      </div>
      <MessageList />
      <div id="chat-form" className="chat-form">
        <form
          className={"send-message-form"}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* <AttachmentIcon /> */}
          {/* <Input inputRef={register} type="hidden" name="id" value={11} /> */}
          <Input inputRef={register} name="message" className="message-input" type="text" placeholder="Type a message" />
          <IconButton aria-label="send" className="message-submit-btn" type="submit">
            <SendIcon />
          </IconButton>
        </form>
      </div>
    </div>
  );
}

export default ChatShell;
