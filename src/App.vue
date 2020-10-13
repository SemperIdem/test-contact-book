<template>
  <div id="app">
    <h2>Contact List</h2>
    <AddContact
        @add-contact="addContact"
    />
    <ContactCards
        v-bind:contacts="contacts"
        @remove-contact="removeContact"
    />
  </div>
</template>

<script>
import ContactCards from "@/components/ContactCards";
import AddContact from "@/components/AddContact";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";


library.add(fas);

export default {
  name: 'App',
  data() {
    return {
      contacts: [
        {name: 'Vasya Pupkin', location: 'Russia', phone: '777', email: 'ronn@dgkdgk', url: ''},
        {name: 'Daniel Maduro', location: 'Venezuala', phone: '888', email: 'ronndfdf@dgkdgk', url: ''},
        {name: 'Shafir Arah', location: 'Israel', phone: '999', email: 'ronn@dgkdgk', url: ''},
      ],
    }
  },
  components: {
    ContactCards, AddContact
  },
  methods: {
    removeContact(phone) {
      this.contacts = this.contacts.filter(contact => contact.phone !== phone)
    },
    addContact(contact) {
      if (this.contacts.includes(contact.phone)) {
        this.contacts.push(contact);
      }
      else {

      }
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
