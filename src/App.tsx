import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [helixToken, setHelixToken] = useState("")
  const [clientId, setClientId] = useState("")
  const [userId, setUserId] = useState("")
  const [token, setToken] = useState("")
  const [channelId, setChannelId] = useState("")
  
  // Initial setup
  useEffect(() => {
    window.Twitch.ext.onAuthorized(function(auth) {
      setHelixToken(auth.helixToken)
      setUserId(auth.userId)
      setClientId(auth.clientId)
      setToken(auth.token)
      setChannelId(auth.channelId)
    })
    console.log(window.Twitch.ext.version)
  }, [])

  const handleClick = async (itemName: string) => {
    try {
      console.log("Sending message")
      const response = await fetch(`http://localhost:3000/debug/messagev2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "message": `Chat thinks you should buy ${itemName}`,
          "channel_id": channelId,
          "ebs_token": token,
          "client_id": clientId
        })
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch(err) {
      console.log("Failed to send")
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Suggest an item to buy!</p>
        <button onClick={() => handleClick("Blink Dagger")}>Blink Dagger</button>
        <button onClick={() => handleClick("BKB")}>BKB</button>
        <button onClick={() => handleClick("Mantle of Intelligence")}>Mantle of Intelligence</button>
      </header>
    </div>
  );
}

export default App;
