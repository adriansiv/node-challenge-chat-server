const express = require("express");
const cors = require("cors");
const { response } = require("express");

const app = express();

app.use(express.json());

app.use(cors());



const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/messages", (req, res) => {
  const lastMessage = messages[messages.length - 1];
  let infoMessage = {
    id: lastMessage.id + 1,
    from: req.body.from,
    text: req.body.text
  }
  if (req.body.from && req.body.text) {
    messages.push(infoMessage);
    console.log(messages);
    res.status(201).send(infoMessage);
  }
  else {
    res.status(400).send();
  }
});


app.get("/messages/search", (req, res) => {
  const wordToFind = req.query.text;
  const filteredMessages = messages.filter(word => word.text.includes(wordToFind));
  res.send(filteredMessages);
});

app.get("/messages", (req, res) => {
  res.send(messages);
})

app.delete("/messages/:id", (req, res) => {
  const ID = req.params.id
  // const messageID = messages.map(item => (item.id));
  // const messageToDelete = messageID.find(idToDelete => idToDelete === ID);
   const index = messages.findIndex(message => message.id == ID);
 
  if (index > -1) {
    messages.splice(index, 1);
    res.status(200).send({ success: true });
  }
  else {
    res.status(404).send();
  };
  
})
app.listen(3000, () => {
   console.log("Listening on port 3000")
  });
