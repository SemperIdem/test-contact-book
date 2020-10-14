<template>
  <div>
    <ul>
      <ContactCard
          v-for="(contact, i) of contacts"
          v-bind:contact="contact"
          v-bind:index="i"
          v-bind:key='contact.phone'
          v-on:remove-contact="removeContact"
      />
    </ul>
  </div>
</template>

<script>
import ContactCard from "@/components/ContactCard";

export default {
  name: "ContactCards",
  props: ['contacts'],
  components: {
    ContactCard,
  },
  methods: {
    removeContact(phone) {
      console.log(phone);
      this.$emit('remove-contact', phone)
    }
  }
}
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>