import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [options, setOptions] = useState([]);
  const [data, setData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const appendMessage = (sender, text, file = null) => {
    setMessages((prevMessages) => [...prevMessages, { sender, text, file }]);
  };

  const sendMessage = () => {
    if (userInput.trim() || selectedFile) {
      appendMessage("user", userInput, selectedFile);
      getBotResponse(userInput);
      setUserInput("");
      setOptions([]);
      setSelectedFile(null);
    }
  };

  const getBotResponse = (message) => {
    const responses = {
      hello: {
        text: "Hi there! How can I assist you today?",
        options: ["Tell me a joke", "What's the weather?", "Goodbye"],
      },
      "tell me a joke": {
        text: "Why don't scientists trust atoms? Because they make up everything!",
        options: [],
      },
      "what's the weather?": {
        text: "I can't check the weather, but it's always sunny in the cloud!",
        options: [],
      },
      goodbye: {
        text: "Goodbye! Have a nice day!",
        options: [],
      },
    };

    const defaultResponse = {
      text: "I'm not sure how to respond to that.",
      options: [],
    };

    const botResponse = responses[message.toLowerCase()] || defaultResponse;
    setTimeout(() => {
      appendMessage("bot", botResponse.text);
      setOptions(botResponse.options);
    }, 500);
  };

  const handleOptionClick = (option) => {
    appendMessage("user", option);
    getBotResponse(option);
    setOptions([]);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.message);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div className="chat-parent-container">
        <div className="chat-container">
          <header>
            <div className="logo">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_2033_2773)">
                    <rect
                      y="0.5"
                      width="23"
                      height="23"
                      rx="6"
                      fill="#F0F4FC"
                    />
                    <circle
                      cx="11.5"
                      cy="12"
                      r="6.5"
                      stroke="#2044F2"
                      stroke-width="2"
                    />
                    <circle cx="18" cy="5.5" r="2" fill="#2044F2" />
                  </g>
                  <defs>
                    <clipPath id="clip0_2033_2773">
                      <rect width="23" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              GENINS
            </div>
            <div className="user-info">
              Hi, Alexander
              <div className="user-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M16 7.25C16 9.45914 14.2091 11.25 12 11.25C9.79086 11.25 8 9.45914 8 7.25C8 5.04086 9.79086 3.25 12 3.25C14.2091 3.25 16 5.04086 16 7.25Z"
                    stroke="#F0F4FC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 14.25C8.13401 14.25 5 17.384 5 21.25H19C19 17.384 15.866 14.25 12 14.25Z"
                    stroke="#F0F4FC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </header>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.sender === "bot" && <i className="fas fa-robot"></i>}
                {msg.sender === "user" && <i className="fas fa-user"></i>}
                {msg.text}
                {msg.file && (
                  <div className="file-message">
                    <i className="fas fa-file"></i> {msg.file.name}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <label className="file-upload">
              <input type="file" onChange={handleFileChange} />
              <i className="fas fa-paperclip"></i>
            </label>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />

            <button onClick={sendMessage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3.51 6.03L11.02 9.25L3.5 8.25L3.51 6.03ZM11.01 14.75L3.5 17.97V15.75L11.01 14.75ZM1.51 3L1.5 10L16.5 12L1.5 14L1.51 21L22.5 12L1.51 3Z"
                  fill="#2044F2"
                />
              </svg>
            </button>
          </div>
          {options.length > 0 && (
            <div className="chat-options">
              {options.map((option, index) => (
                <button key={index} onClick={() => handleOptionClick(option)}>
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
