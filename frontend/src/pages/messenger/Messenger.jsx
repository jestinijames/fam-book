import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { io } from "socket.io-client";

// Components
import TopBar from "../../components/topbar/TopBar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/messages/Message";
import ChatOnline from "../../components/chatonline/ChatOnline";

// Styles
import "./messenger.css";
import { useSelector } from "react-redux";

const Messenger = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const { user } = useSelector((state) => state.authReducer);
    const scrollRef = useRef();


    useEffect(() => {
        const getConversations = async () => {
          try {
            const token = (user.token);
            const config = {
              headers: {
                  authorization: `Bearer ${token}`
              }
          };
            const res = await axios.get("api/conversation/" + user._id,config);
            setConversations(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getConversations();
      }, [user._id]);


    useEffect(() => {
        const getMessages = async () => {
          try {
            const token = (user.token);
            const config = {
              headers: {
                  authorization: `Bearer ${token}`
              }
          };
           if(currentChat) {
            const res = await axios.get("api/message/" + currentChat?._id,config);
            setMessages(res.data);
           }
          } catch (err) {
            console.log(err);
          }
        };
        getMessages();
      }, [currentChat]);
    
    
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
          sender: user._id,
          text: newMessage,
          conversationId: currentChat._id,
        };
    
        const receiverId = currentChat.members.find(
          (member) => member !== user._id
        );
    
        socket.current.emit("sendMessage", {
          senderId: user._id,
          receiverId,
          text: newMessage,
        });
    
        try {
          const token = (user.token);
            const config = {
              headers: {
                  authorization: `Bearer ${token}`
              }
          };
          const res = await axios.post("api/message/", message, config);
          setMessages([...messages, res.data]);
          setNewMessage("");
        } catch (err) {
          console.log(err);
        }
      };
    
      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);  


      return (
        <>
          <TopBar />
          <div className="messenger">
            <div className="chatMenu">
              <div className="chatMenuWrapper">
                <input placeholder="Search for friends" className="chatMenuInput" />
                {conversations && conversations.map((c) => (
                  <div key={c._id} onClick={() => setCurrentChat(c)}>
                    <Conversation conversation={c} currentUser={user} />
                  </div>
                ))}
              </div>
            </div>
             <div className="chatBox">
              <div className="chatBoxWrapper">
                {currentChat ? (
                  <>
                    <div className="chatBoxTop">
                      {messages && messages.map((m) => (
                        <div key={m._id} ref={scrollRef}>
                          <Message message={m} own={m.sender === user._id} />
                        </div>
                      ))}
                    </div>
                    <div className="chatBoxBottom">
                      <textarea
                        className="chatMessageInput"
                        placeholder="write something..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                      ></textarea>
                      <button className="chatSubmitButton" onClick={handleSubmit}>
                        Send
                      </button>
                    </div>
                  </>
                ) : (
                  <span className="noConversationText">
                    Open a conversation to start a chat.
                  </span>
                )}
              </div>
            </div>
           <div className="chatOnline">
              <div className="chatOnlineWrapper">
                <ChatOnline
                  onlineUsers={onlineUsers}
                  currentId={user._id}
                  setCurrentChat={setCurrentChat}
                />
              </div>
            </div>
          </div>
        </>
      );
}

export default Messenger;