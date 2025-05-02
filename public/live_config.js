var token, userId, channelID, theme;
var options = []

// so we don't have to write this out everytime 
const twitch = window.Twitch.ext;
// onAuthorized callback called each time JWT is fired
twitch.onAuthorized((auth) => {
  // save our credentials
  token = auth.token; //JWT passed to backend for authentication 
  userId = auth.userId; //opaque userID 
  channelID = auth.channelId;
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        const submitterId = event.submitter.id
        if (submitterId === 'start-button') {
            console.log('starting vote');
            startVote();
        } else {
            console.log('stopping vote');
            stopVote();
        } 
  });
});

async function startVote() {
    const voteDuration = document.getElementById('voteDuration').value
    const url = "http://localhost:3000/vote/hero/start";
    // const url = "https://dotabackseater.ruvice.com/vote/hero/start";
    try {
        const response = await fetch(url, {
            method: "POST", // HTTP method,
            headers: {
                "channel-id": channelID
            },
            body: JSON.stringify({
                'duration': voteDuration
            })
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.log("Failed to start hero vote")
    }
}

async function stopVote() {
    const url = "http://localhost:3000/vote/hero/stop";
    // const url = "https://dotabackseater.ruvice.com/vote/hero/stop";
    try {
        const response = await fetch(url, {
            method: "POST", // HTTP method,
            headers: {
                "channel-id": channelID
            },
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.log("Failed to start hero vote")
    }
}

async function updateConfig(){
  twitch.configuration.set("broadcaster", "1", JSON.stringify(voteThreshold.value))
  const currentVoteThreshold = document.getElementById('currentVoteThreshold')
  currentVoteThreshold.textContent = voteThreshold.value
  const url = "http://localhost:3000/config/" + channelID;
//   const url = "https://dotabackseater.ruvice.com/config/" + channelID;
  try {
    const response = await fetch(url, {
        method: "POST", // HTTP method,
        headers: {
            "channel-id": channelID
        }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.log("Failed to update streamer config")
  }
}

document.getElementById('voteThreshold').addEventListener('input', function (e) {
  const min = parseInt(this.min, 10);
  const max = parseInt(this.max, 10);
  let value = parseInt(this.value, 10);

  // Check if the value is less than the minimum or greater than the maximum
  if (value < min) {
      this.value = min;
  } else if (value > max) {
      this.value = max;
  }
});
