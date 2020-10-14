<template>
  <div>
  <h2>Contact List</h2>
  <AddContact
      ref="addComponent"
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
name: "Home",
  data() {
    return {
      contacts: [
        {name: 'Vasya Ivanov', location: 'Russia', phone: '777', email: 'vasilty@mail.ru', url: ''},
        {name: 'Daniel Maduro', location: 'Venezuala', phone: '888', email: 'ronndfdf@gmail.com', url: ''},
        {name: 'Shafir Arah', location: 'UAE', phone: '999', email: 'ronn@dgkdgk.com', url: ''},
      ],
    }
  },
  components: {
    ContactCards, AddContact
  },
  methods: {
    removeContact(phone) {
      console.log('remove');
      this.contacts = this.contacts.filter(contact => contact.phone !== phone)
    },
    addContact(contact) {
      console.log(contact.phone);
      if (!this.contacts.some(item => item.phone === contact.phone)) {
        this.contacts.push(contact);
      }
      else {
        this.$refs.addComponent.pushError("The number already exist");
      }
    }
  },
}
</script>
