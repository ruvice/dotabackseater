var token, userId;
var options = []

// so we don't have to write this out everytime 
const twitch = window.Twitch.ext;

// onContext callback called when context of an extension is fired 
twitch.onContext((context) => {
  //console.log(context);
});


// onAuthorized callback called each time JWT is fired
twitch.onAuthorized((auth) => {
  // save our credentials
  token = auth.token; //JWT passed to backend for authentication 
  userId = auth.userId; //opaque userID 
});


// when the config changes, save the new changes! 
twitch.configuration.onChanged(function(){
  console.log(twitch.configuration.broadcaster)
  console.log("in onChanged")
  if(twitch.configuration.broadcaster){
    console.log("config exists")
    try{
      var voteThreshold = JSON.parse(twitch.configuration.broadcaster.content)
      if(typeof config === "string"){
        const voteThresholdInput = document.getElementById('voteThreshold')
        voteThresholdInput.value = voteThreshold
        //console.log(options)
      }else{
        console.log('invalid config')
      }
    }catch(e){
      console.log('invalid config')
    }
  }
})

function updateConfig(){
  console.log("updating")
  twitch.configuration.set("broadcaster", "1", JSON.stringify(voteThreshold.value))
  console.log("has it been set?")
  console.log(twitch.configuration.broadcaster.content)

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

// Function to save the streamer's WYR options  
$(function(){
  $("#form").submit(function(e){
    const voteThresholdInput = document.getElementById('voteThreshold')
    voteThreshold = voteThresholdInput.value
    e.preventDefault()
  })  
})
