const express = require("express");
const socketIo = require("socket.io");
const cors = require("cors");
const Blockchain = require("blockchain.info/Socket");

const PORT = 4000;
const app = express();

const expressServer = app.listen(PORT, () => {
  console.log(`Server is Running on Port : ${PORT}!`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const io = socketIo(expressServer, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

let hash;
let address;

io.on("connection", (socket) => {
  console.log("New client connected");

  var mySocket = new Blockchain();

  mySocket.onOpen(() => {
    console.log("Connected to Blockchain.info");
  });

  socket.on("subscribeTransaction", (hashReceived) => {
    hash = hashReceived;
    console.log("Now subbed to transaction :", hash);
    io.emit("subscribedTransaction", hash);
  });

  socket.on("subscribeAddress", (addressReceived) => {
    address = addressReceived;
    console.log("Now subbed to address :", address);
    io.emit("subscribedAddress", address);
  });

  mySocket.onBlock((block) => {
    console.log("listening on blocks");
    if (block.hash === hash) {
      io.emit("newTransaction", block);
    }
  });

  mySocket.onTransaction(
    (transaction) => {
      console.log("new transaction: " + transaction);
      io.emit("newAddress", transaction);
    },
    { addresses: [address] }
  );
});
