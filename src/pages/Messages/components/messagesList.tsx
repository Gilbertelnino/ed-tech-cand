import React, { useRef } from 'react';
import _ from "lodash";

import { chatDate } from '../../../utils/helper';
import { UserAvatar } from "../../../components/common/index";
interface IMessagesList {
  messagesList: Array<any>;
  activeRoomDetails: object;
  loadMoreMessages: () => void;
}

const MessagesList = ({ messagesList, activeRoomDetails, loadMoreMessages }: IMessagesList) => {

  const scrollDiv = useRef<HTMLDivElement>(null);

  const _handleScrollToTop = (e) => {
    const target = e.currentTarget as HTMLElement;

    const scrollOffset = 200;
    // const reachedTop = ((target.scrollHeight) - (Math.abs(target.scrollTop) + target.clientHeight) - scrollOffset);
    const reachedTop = (target.scrollTop - scrollOffset);
    if (reachedTop < 0) {

      if (typeof loadMoreMessages === "function") {
        loadMoreMessages();
      }
    }
  }

  return (
    <div className="chat-message-list">
      <div id="chat-message-list" ref={scrollDiv} className="slim-scrollbar inner-chat-message-list" onScroll={(e) => _handleScrollToTop(e)}>
        {(messagesList || []).map((row, key) => {

          if ((row.messageFrom || "") === "me") {
            return (
              <div className="message-row you-message" key={key}>
                <div className="message-content">
                  <div className="message-text">{row.message}</div>
                  <div className="message-time">{chatDate(row.timeStamp, true)}</div>
                </div>
              </div>
            )
          } else {
            return (
              <div className="message-row other-message" key={key}>
                <div className="message-content">
                  <UserAvatar size="xsm" src={_.get(activeRoomDetails, "receiverProfile", "")} />
                  <div className="msg-content-wrap">
                    <div className="message-text">{row.message}</div>
                    <div className="message-time">{chatDate(row.timeStamp, true)}</div>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  );
};

export default MessagesList;
