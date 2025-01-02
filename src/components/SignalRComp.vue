<template>
    <div>
      <h1>Chat</h1>
      <input v-model="message" placeholder="Type a message" />
      <button @click="sendMessage">Send</button>
    </div>
    <h3 v-show="messages.length > 0 ">Income Messages</h3>
    <div v-for="(msg, index) in messages" :key="index">
        {{ msg }}
      </div>
  </template>
  
  <script>
  import { on, send, startConnection } from "../signalrService";
  
  export default {
    data() {
      return {
        messages: [],
        message: "",
      };
    },
    async created() {
      await startConnection();
  
      on(( message) => {
        this.messages.push(message );
      });
    },
    methods: {
      sendMessage() {
        send(this.message);
        this.message = "";
        console.log(this.messages);
      },
    },
  };
  </script>