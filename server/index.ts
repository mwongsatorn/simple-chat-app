import Websocket, { WebSocketServer } from "ws";
import { type MessageInfo } from "./types";
import { v4 as uuidv4 } from "uuid";

const wss = new WebSocketServer({ port: 8080 });

interface WS extends Websocket {
  id: string;
}

wss.on("connection", (ws: WS) => {
  ws.on("error", console.error);
  ws.id = uuidv4();

  ws.on("message", function message(data) {
    const receivedMessage: MessageInfo = JSON.parse(data.toString());
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        if (receivedMessage.type === "Sending") {
          client.send(JSON.stringify(receivedMessage));
        }
        if (receivedMessage.type === "Typing" && ws !== client) {
          client.send(JSON.stringify(receivedMessage));
        }
      }
    });
  });

  ws.on("close", function disconnect() {
    console.log(`${ws.id} disconnected`);
  });

  console.log("Client connected");
});
