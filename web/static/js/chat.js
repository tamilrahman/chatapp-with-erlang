import socket from "./socket"
// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("rooms:*", {})
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })


$("#message-message").off("keypress").on("keypress", function(event){
    if (event.keyCode == 13) {
      channel.push("message:new", {
      	user: $("#user-name").val(),
        message: $("#message-message").val()
      })
      $("#message-message").val("")
    }
  })

$("#user-name").off("keypress").on("keypress", function(event){
    if (event.keyCode == 13) {
      channel.push("user:new", {
        user: $("#user-name").val()
      })
      $("#user-name").val("")
    }
  })

channel.on("message:new", payload =>{
	console.log(payload)
	$("#message-all").append(payload.user + " sent " + payload.message + "<br>")
})

channel.on("user:new", payload =>{
	console.log(payload)
	$("#message-all").append(payload.user + " is joined" + "<br>")
})

channel.on("user:me", payload =>{
	console.log(payload)
	$("#message-all").append("you entered to chat" + "<br>")
})