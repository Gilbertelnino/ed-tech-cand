import React, { useEffect, useState, useRef } from 'react';
import { Send as SendIcon, Create as CreateIcon } from '@material-ui/icons';
import socketIOClient, { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Grid } from '@material-ui/core';
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import Skeleton from "@material-ui/lab/Skeleton";
import moment from "moment";
import _ from "lodash";

import ConversationList from "./components/conversationList";
import MessagesList from "./components/messagesList";

import { Input, Button, UserAvatar, Modal, FlashMessage } from "../../components/common";
import { fetchAndClearNewMessageInfo, getInitialLetter } from '../../utils/helper';
import { fetchUsersListRequest, resetUsersList } from '../../reducers/messages/usersList.reducer';
import messagesServices from '../../services/messages.services';
import appRoutes from '../../routes/app.routes';
import { rootReducersState } from '../../reducers';
import SendImage from "./images/icons/send-icon.svg";
import AddImage from "./images/icons/add-icon.svg";
import SearchImage from "./images/icons/search-icon.svg";

type Inputs = {
  message: string;
};
let tmpActiveRoomDetails = {};
let tmpSocket = null;

const Messages = () => {

  const chatMesRef = useRef<HTMLDivElement>();
  const dispatch = useDispatch();

  const messagesReducer = useSelector(({ message }: any) => message);
  const usersList = (_.get(messagesReducer, "usersList.list", []) || []);
  const usersListLoading = _.get(messagesReducer, "usersList.loading", null);

  const sessionReducer = useSelector(({ session }: rootReducersState) => session);

  const [socket, setSocket] = useState<Socket>(null);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listLoading, setListLoading] = useState<boolean>(false);
  const [messagesList, setMessagesList] = useState<Array<any>>([]);
  const [activeRoomDetails, setActiveRoomDetails] = useState<any>({});
  const [totalMessagesCount, setTotalMessagesCount] = useState<number>(0);
  const [conversationList, setConversationList] = useState<Array<any>>([]);
  const [showNewMessageModal, setShowNewMessageModal] = useState<boolean>(false);
  const [loadMoreMessagesFlag, setLoadMoreMessagesFlag] = useState<boolean>(false);
  let searchDelay: any = null;

  const { register, handleSubmit, reset } = useForm<Inputs>();

  useEffect(() => {

    // Socket IO Config Once;
    const tmpCurrentUser = _.get(sessionReducer, "currentUser", {});
    const userId = _.get(tmpCurrentUser, "id", 0);
    setCurrentUser(tmpCurrentUser);
    const socketInstance = socketIOClient(process.env.REACT_APP_SOCKET_END_POINT);
    tmpSocket = socketInstance;
    setSocket(socketInstance); // set socket for other components

    socketInstance.on("connect", function () {

      // Fetch all conversation list
      setListLoading(true);
      socketInstance.emit("fetchConversationList", { userId });
    });

    // Ask other member to join the room for 1-1 conversation
    socketInstance.on("inviteRoom", (data) => {
      socketInstance.emit("joinRoom", data);
    });

    // Fetch the list of all conversation once load the page
    socketInstance.on("fetchConversationList", async (data) => {
      setListLoading(false);
      const tmpList = _.get(data, "conversationList.data", []);

      setConversationList(tmpList);

      const chatData = fetchAndClearNewMessageInfo();
      if (_.get(chatData, "uuid", "")) {
        await _handleInitializeNewChat(chatData, tmpList)
      }
    });

    // Receive the message from another user
    socketInstance.on("emitMessage", (data) => {

      const messageData = _.get(data, "payload", {});

      if (typeof messageData === "object") {

        // Set last message in the conversation chat
        setConversationList(prevList => [...prevList].map(row => {
          if (row.chatRoom === messageData.chatRoom) {
            return { ...row, lastMessage: messageData.message, lastMessageOn: messageData.timeStamp };
          }
          return row;
        }));

        // Scroll to bottom if incoming message room and current message room is same
        if (messageData.chatRoom === _.get(tmpActiveRoomDetails, "chatRoom", "")) {
          setMessagesList(prevMsg => [...prevMsg, { ...messageData }]);
          scrollToDown();
        }
      }
    });

    // Fetch + Set current room messages with pagination
    socketInstance.on("fetchChatMessages", (data) => {

      // Set total messages
      setTotalMessagesCount(_.get(data, "messagesList.data.count", 0));

      let tmpMessagesList = (_.get(data, "messagesList.data.rows", []) || []).map(row => {

        return {
          chatRoom: row.room_id,
          fromUser: row.user_id,
          message: row.message,
          timeStamp: moment(row.created_at).format(),
          messageFrom: (row.user_id === _.get(tmpCurrentUser, "id", 0)) ? "me" : ""
        }
      });

      tmpMessagesList = _.reverse(tmpMessagesList);
      setMessagesList((prevMessages) => [...tmpMessagesList, ...prevMessages]);
      setLoadMoreMessagesFlag(false);

      scrollToDown();
    });

    return () => {
      if (socketInstance) {
        socketInstance.close();
      }
      if (typeof tmpSocket.close === "function") {
        console.log("Closed, tmpSocket");
        tmpSocket.close();
      }

    }
  }, []);

  useEffect(() => {

  }, [conversationList])

  const scrollToDown = () => {

    const chatMessageList = chatMesRef.current.querySelector("#chat-message-list");
    if (chatMessageList) {
      chatMessageList.scrollTop = chatMessageList.scrollHeight;
    }
  }

  const onSubmit = (formData: Inputs) => {

    const lastMessageOn = moment().format();
    const payload = {
      chatRoom: activeRoomDetails.chatRoom,
      fromUser: currentUser.id,
      message: formData.message.trim(),
      timeStamp: lastMessageOn
    }

    // Send the message
    socket.emit("emitMessage", payload);

    setMessagesList(prevMsg => [...prevMsg, { ...payload, messageFrom: "me" }]);

    // Clear message
    reset({});

    // Set last message in the chat
    setConversationList(prevList => [...prevList].map(row => {
      if (row.chatRoom === activeRoomDetails.chatRoom) {
        return { ...row, lastMessage: formData.message, lastMessageOn };
      }
      return row;
    }));

    scrollToDown();
  };

  const _handleClickConversion = (payload) => {
    if (activeRoomDetails.chatRoom !== payload.chatRoom) {
      setMessagesList([]); // reset messages list
      const chatRoom = payload.chatRoom;
      setActiveRoomDetails(payload);
      tmpActiveRoomDetails = payload;

      // Start Room
      socket.emit("createRoom", chatRoom);

      // Fetch chat room messages + Reset the previous chat data only when change the room
      setCurrentPage(1);
      socket.emit("fetchChatMessages", { chatRoom, page: 1 });
    } else {
      console.log("Already in current room");
    }
  }

  const loadMoreMessages = () => {

    // Check if we have loaded all messages
    if ((messagesList.length < totalMessagesCount) && (!loadMoreMessagesFlag)) {
      setLoadMoreMessagesFlag(true);

      // Fetch chat room messages + Reset the previous chat data only when change the room
      const chatRoom = activeRoomDetails.chatRoom;
      const page = currentPage + 1;
      setCurrentPage(page);
      socket.emit("fetchChatMessages", { chatRoom, page });
    }

  }

  const _handleCloseNewMessageModal = () => {
    setShowNewMessageModal(false);
    dispatch(resetUsersList());
  }

  const _handleSearchUsers = ({ currentTarget }) => {
    const { value } = currentTarget;

    clearTimeout(searchDelay);

    if ((value || "").trim()) {
      searchDelay = setTimeout(async () => {
        dispatch(fetchUsersListRequest({
          q: (value || "").trim()
        }));
      }, 1000);
    } else {
      dispatch(resetUsersList());
    }

  }

  const _handleInitializeNewChat = async (data, tmpList = []) => {

    const result = await messagesServices.checkChatRoom(data.uuid);

    if (_.get(result, "data.data", {})) {
      const roomData = _.get(result, "data.data", {});

      const chatRoom = roomData.chatRoom;

      const chatRoomData = {
        chatRoom: roomData.chatRoom,
        id: roomData.id,
        lastMessage: roomData.lastMessage,
        lastMessageOn: roomData.lastMessageOn,
        slug: data.slug,
        userType: data.userType,
        receiverId: data.uuid,
        receiverName: `${data.first_name} ${data.last_name}`,
        receiverProfile: data.profile_image,
        roomUUID: roomData.roomUUID
      }

      // Only for new conversion which are coming from other places
      const newConversationList = _.isEmpty(tmpList) ? conversationList : tmpList;

      // Check if conversion already exists
      const exists = _.find([...newConversationList], { chatRoom });

      if (exists) {
        setConversationList(prevList => [...newConversationList].map(row => {
          if (row.chatRoom === chatRoom) {
            return chatRoomData;
          }
          return row;
        }));
      } else {
        setConversationList(prevList => [{ ...chatRoomData }, ...newConversationList]);
      }

      // Initialize the chat room and close the window gently

      setMessagesList([]); // reset messages list
      setActiveRoomDetails(chatRoomData);
      tmpActiveRoomDetails = chatRoomData;

      if (tmpSocket) {
        // Start Room
        tmpSocket.emit("createRoom", chatRoom);

        // Fetch chat room messages + Reset the previous chat data only when change the room
        setCurrentPage(1);
        _handleCloseNewMessageModal()
        tmpSocket.emit("fetchChatMessages", { chatRoom, page: 1 });
      } else {
        FlashMessage("Something went wrong while initialing message 123", "error")
      }


    } else {
      FlashMessage("Something went wrong while initialing message", "error")
    }

  }

  const _handleNavigateToProfile = () => {

    const userType = _.get(activeRoomDetails, "userType", "");
    const slug = _.get(activeRoomDetails, "slug", "");

    if (userType && slug) {
      let path = "";
      if (userType === "company") {
        path = appRoutes.companyPublicPageHome.generatePath(slug);
      } else {
        path = appRoutes.candidatePublicProfile.generateFullPath(slug);
      }

      window.open(path, '_blank');
    }

  }

  return (
    <>

      <div id="chat-container" className="chat-container">
      <div className="chat-container-top">
          <div id="search-container" className="search-container">
            {/* <input type="text" placeholder="Search" /> */}
            <Button
              className="new"
              onClick={() => setShowNewMessageModal(true)}
            >
             <img src={AddImage} alt="Add Icon" />  &nbsp; <span>New</span>
            </Button>
            {/* <Button
              
              className="manage"
            >
              <CreateIcon />  &nbsp; <span>Manage</span>
            </Button> */}
            <div className="search-bar">
              <img src={SearchImage} alt="Search Image" />
              <Input name="search" className="search-input" type="text" placeholder="Search Chats" />
            </div>
          </div>
        </div>  
        <div className="chat-container-left">
        <ConversationList 
            conversationList={conversationList}
            activeRoomDetails={activeRoomDetails}
            loading={listLoading}
            onClickConversion={(payload) => _handleClickConversion(payload)}
          />
          <div id="new-message-container" className="new-message-container"> <span></span> </div>
        </div>
        <div className="chat-container-right" ref={chatMesRef}>
          {!_.isEmpty(activeRoomDetails) ? (
            <>
              {/* Seconde user to whom I am chatting */}
              <div id="chat-title" className="chat-title">
                <div className="left">
                  <UserAvatar size="xsm" src={_.get(activeRoomDetails, "receiverProfile", "")} />
                  <div className="chat-title-info">
                    <p>{_.get(activeRoomDetails, "receiverName", "")}</p>
                    {/* <span>UX Designer | Seattle, WA | U.S. Citizen </span> */}
                  </div>
                </div>
                <Button
                  variant="outlined"
                  className="btn-small btn-transparent btn-small-transparant profile"
                  onClick={() => _handleNavigateToProfile()}
                >
                  Profile
                </Button>
                {/* <img src={trashLogo} alt="Delete Conversation" /> */}
              </div>
              <MessagesList
                messagesList={messagesList}
                activeRoomDetails={activeRoomDetails}
                loadMoreMessages={() => loadMoreMessages()}
              />
              <div id="chat-form" className="chat-form">
                <form
                  className={"send-message-form"}
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {/* <AttachmentIcon /> */}
                  {/* <Input inputRef={register} type="hidden" name="id" value={11} /> */}
                  <Input
                    inputRef={register({
                      required: {
                        value: true,
                        message: "Message is required",
                      },
                      validate: (value) => (value || "").trim() !== "" || "Message is required",
                    })}
                    name="message" className="message-input" type="text" placeholder="Type a message..." />
                  <IconButton aria-label="send" className="message-submit-btn" type="submit">
                    <img src={SendImage} alt="send-icon"/>
                  </IconButton>
                </form>
              </div>
            </>
          ) : (
            <div className="new-convo-msg">
              Select contact to start a conversation
            </div>
          )}
        </div>

      </div>

      <Modal
        className="new-msg-model"
        visible={showNewMessageModal}
        closeButton={true}
        title="New message"
        onClose={() => _handleCloseNewMessageModal()}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Input
              name="search"
              className="message"
              type="text"
              placeholder="Type a name"
              onChange={(e) => _handleSearchUsers(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <ul className="user-msg-list slim-scrollbar">
              {(!usersListLoading) ? (
                ((usersList.length === 0) && (usersListLoading === false)) ? (
                  <div className="text-center">No results found</div>
                ) : (
                  usersList.map((row, key) => (
                    <li key={key} className="d-flex" onClick={() => _handleInitializeNewChat(row)}>
                      <UserAvatar size="xsm" src={_.get(row, "profile_image", "")} >
                        <span className="text-black font-md">{getInitialLetter(`${row.first_name} ${row.last_name}`)}</span>
                      </UserAvatar>
                      <span className="ml-15">
                        {`${row.first_name} ${row.last_name}`}
                      </span>
                    </li>
                  ))
                )
              ) : (
                [1, 2, 3].map((key) => (
                  <li key={key} className="d-flex">
                    <Skeleton variant="circle" width={40} height={40} />
                    <span className="ml-15">
                      <Skeleton variant="text" width={155} />
                    </span>
                  </li>
                ))
              )}
            </ul>
          </Grid>
          <Grid item xs={12} className="pb-10">
            <span className="span-link float-right close-btn" onClick={() => _handleCloseNewMessageModal()}>Close</span>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}

export default Messages;
