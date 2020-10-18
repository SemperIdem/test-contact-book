<template>
  <div>
  <h2>Contact List</h2>
  <AddContact
      ref="addComponent"
      @add-contact="addContact"
  />
  <ContactCards
      v-bind:contacts=getAllContacts
      @remove-contact="removeContact"
  />
  </div>
</template>

<script>
import ContactCards from "@/components/ContactCards";
import AddContact from "@/components/AddContact";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import {mapGetters, mapMutations} from 'vuex';

library.add(fas);

export default {
name: "Home",
 computed: mapGetters(['getAllContacts']),
  components: {
    ContactCards, AddContact
  },
  methods: mapMutations(['addContact', 'removeContact'])
}
</script>
