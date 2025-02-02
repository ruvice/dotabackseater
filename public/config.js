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

// when the config changes, save the new changes! 
twitch.configuration.onChanged(function(){
  if(twitch.configuration.broadcaster){
    try{
      var voteThreshold = JSON.parse(twitch.configuration.broadcaster.content)
      if(typeof voteThreshold === "string"){
        const voteThresholdInput = document.getElementById('voteThreshold')
        voteThresholdInput.value = Number(voteThreshold)
        const currentVoteThreshold = document.getElementById('currentVoteThreshold')
        currentVoteThreshold.textContent = voteThreshold
      }else{
        console.log('invalid config')
      }
    }catch(e){
      console.log('invalid config err')
    }
  }
})

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission
      updateConfig();
  });
});

async function updateConfig(){
  twitch.configuration.set("broadcaster", "1", JSON.stringify(voteThreshold.value))
  const currentVoteThreshold = document.getElementById('currentVoteThreshold')
  currentVoteThreshold.textContent = voteThreshold.value
//   const url = "http://localhost:3000/config/" + channelID; // Example API endpoint
  const url = "https://dotabackseater.ruvice.com/config/" + channelID; // Example API endpoint
  try {
    const response = await fetch(url, {
      method: "POST", // HTTP method
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
