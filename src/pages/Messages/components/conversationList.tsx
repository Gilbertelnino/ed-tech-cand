import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Send as SendIcon, Create as CreateIcon } from '@material-ui/icons';
import moment from "moment"
import { UserAvatar, Button } from "../../../components/common";
import { chatDate } from '../../../utils/helper';

interface IConversationList {
  conversationList: Array<any>;
  loading: boolean;
  activeRoomDetails: any;
  onClickConversion: (payload) => void;
}

const ConversationList = ({ conversationList, activeRoomDetails, loading, onClickConversion, ...rest }: IConversationList) => {
  return (
    <div id="conversation-list" className="slim-scrollbar conversation-list">

      {(loading) ? (
        [1, 2, 3, 4, 5, 6].map(row => (
          <div
            className={`conversation`}
            key={row}
          >
            <Skeleton variant="circle" width={40} height={40} />
            <div className="right">
              <div className="title-text"><Skeleton variant="text" /></div>
              <div className="bottom-text">
                <div className="conversation-message">
                  <Skeleton variant="text" />
                </div>
                <div className="created-date">
                  <Skeleton variant="text" />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        (conversationList.length > 0) ? (
          conversationList.map(row => (
            <div
              className={`conversation ${(row.chatRoom === activeRoomDetails.chatRoom) && "active"}`}
              key={row.chatRoom}
              onClick={() => onClickConversion(row)}
            >
              <UserAvatar size="xsm" src={row.receiverProfile} />
              <div className="right">
                <div className="title-text">{row.receiverName}</div>
                <div className="bottom-text">
                  <div className="conversation-message">
                    {row.lastMessage}
                  </div>
                  <div className="created-date">{chatDate(row.lastMessageOn)}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="new-chat-msg">Click on New Message to find contact to start a conversation</div>
        )
      )}
    </div>
  );
}

export default ConversationList;
