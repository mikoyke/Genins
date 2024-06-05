import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [options, setOptions] = useState([]);
  const [data, setData] = useState(null);

  const appendMessage = (sender, text) => {
    setMessages((prevMessages) => [...prevMessages, { sender, text }]);
  };

  const sendMessage = () => {
    if (userInput.trim()) {
      appendMessage("user", userInput);
      getBotResponse(userInput);
      setUserInput("");
      setOptions([]);
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
        <div className="chat-header">Chatbot</div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
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
