import React from 'react';
import daryl from "../images/profiles/daryl.png";
import { Button } from "../../../components/common";

const ChatTitle = () => {
    return (
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
    );
}

export default ChatTitle;