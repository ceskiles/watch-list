<template>
<div class='wrapper'>
  <div>
    <h1>Choose an existing user</h1>
    <div id='users' v-for='user in users' :key='user._id'>
      <button class='userButton' v-on:click="selectUser(user)">
        <p>{{user.displayName}}</p>
      </button>
    </div>
  </div>
  <h2 style='align-self:center'>or</h2>
  <div>
    <h1>Register as a new user</h1>
    <form @submit.prevent="addUser">
      <label>Username:</label>
      <input v-model="newUser.username" placeholder="johnDo123" />
      <label>Display Name:</label>
      <input v-model="newUser.displayName" placeholder="John Do" />
      <button type='submit'>Submit</button>
    </form>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SignIn',
  data() {
    return {
      users: [],
      newUser: {
        username: "",
        displayName: "",
      }
    }
  },
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        let response = await axios.get('/api/users');
        this.users = response.data;
      } catch (error) {
        //console.log(error) //FIXME May cause error
      }
    },
    selectUser(user) {
      this.$root.$data.user = user;
      this.$root.$data.loggedIn = true;
      this.$router.push('/');
    },
    async addUser() {
      try {
        await axios.post('/api/users', this.newUser);
        this.selectUser(this.newUser);
      } catch (error) {
        //console.log(error) //FIXME May throw error
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
  padding-top: 3cm;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  color: var(--secondary-color);
}

.wrapper>h2 {
  padding: 130px;
}

form {
  display: flex;
  flex-direction: column;
  width: 75%;
}

label {
  margin-top: 30px;
}

input {
  padding-left: 10px;
  width: 100%;
  height: 2em;
  font-size: 20px;
}

button {
  height: 40px;
  width: 75px;
  background: var(--secondary-color);
  border-radius: 3px;
  color: white;
  border: 1px solid black;
  text-align: center;
  font-weight: bold;
  font-size: 90%;
  margin-top: 30px;
}

.userButton {
  width: 100%;
  height: 50px;
  font-size: 20px;
  margin-top: 20px;
}

button:hover {
  background-color: var(--secondary-hover);
}
</style>
