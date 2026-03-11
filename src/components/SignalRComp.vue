<template>
  <div>
    <h1>Chat</h1>
    <input v-model="message" placeholder="Type a message" />
    <button @click="sendMessage">Send</button>

    <h3 v-show="messages.length > 0">Incoming Messages</h3>
    <div v-for="(msg, index) in messages" :key="index">
      {{ msg }}
    </div>
  </div>
</template>

<script>
import { onReceiveMessage, offReceiveMessage, send, startConnection } from "../signalrService";

export default {
  data() {
    return {
      messages: [],
      message: "",
      receiveHandler: null
    };
  },
  async mounted() {
    await startConnection();

    this.receiveHandler = (message) => {
      this.messages.push(message);
    };

    onReceiveMessage(this.receiveHandler);
  },
  beforeUnmount() {
    if (this.receiveHandler) {
      offReceiveMessage(this.receiveHandler);
    }
  },
  methods: {
    async sendMessage() {
  if (!this.message?.trim()) return;

  try {
    await send(this.message);
    this.message = "";
  } catch (err) {
    console.error("Mesaj gönderilemedi:", err);
  }
}
  }
};
</script>