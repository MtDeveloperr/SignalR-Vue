import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7219/notifications-hub")
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();

export async function startConnection() {
  if (connection.state === signalR.HubConnectionState.Connected) return;

  try {
    await connection.start();
    console.log("SignalR Connected.");
  } catch (err) {
    console.error("Error while starting connection: ", err);
    setTimeout(startConnection, 5000);
  }
}

export function onReceiveMessage(callback) {
  connection.on("ReceiveMessage", callback);
}

export function offReceiveMessage(callback) {
  connection.off("ReceiveMessage", callback);
}

export async function send(data) {
  try {
    await connection.invoke("SendMessage", data);
  } catch (err) {
    console.error(err);
  }
}