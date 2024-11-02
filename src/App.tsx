import './App.css';
import { useEffect, useState, useMemo } from 'react';
import { Item } from './models/item';

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

  const handleClick = async (item: Item) => {
    try {
      console.log("Sending message")
      const response = await fetch(`http://localhost:3000/debug/messagev2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "message": `Chat thinks you should buy ${item.name}`,
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
  // curl.exe -X POST -d '{"channel_id": "40825039", "twitch_id": "40825040", "item_id": "2"}' localhost:3000/vote/v3

  const handleVote = async (item: Item) => {
    try {
      console.log(`Voting for ${item.id}: ${item.name}`)
      const response = await fetch(`http://localhost:3000/vote/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "channel_id": channelId,
          "twitch_id": userId,
          "item_id": item.id
        })
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch(err) {
      console.log("Failed to send")
    }
  }

  const items = useMemo(() => {
    // Your logic for generating items
    return [new Item(1, "Blink Dagger"), new Item(2, "BKB"), new Item(3, "Mantle of Intelligence")]
  }, []); // Re-runs when `someDependency` changes

  return (
    <div className="App">
      <header className="App-header">
        <p>Suggest an item to buy!</p>
        {items.map((item: Item) => (
          <button key={item.id} onClick={() => handleVote(item)}>{item.name}</button>
        ))}
        <button onClick={() => handleClick(new Item(4, "FAKE ITEM"))}>SEND MESSAGE</button>
      </header>
    </div>
  );
}

export default App;
