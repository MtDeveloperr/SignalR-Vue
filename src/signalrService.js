import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7219/notifications-hub") // Replace with your hub URL
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

export async function startConnection() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.error("Error while starting connection: ", err);
        setTimeout(startConnection, 5000); // Retry connection
    }
}

export function on(callback) {
    connection.on("ReceiveMessage", callback);
}

export function send(data) {
    connection.invoke("SendMessage", data).catch((err) => console.error(err));
}