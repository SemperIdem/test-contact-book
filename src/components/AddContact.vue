<template>
  <div>
    <button
        type="button"
        class="btn"
        @click="showModal"
    >
      Add new contact
    </button>
  <Modal
      v-show="isModalVisible"

      @close="closeModal"
  >
    <template v-slot:header>Adding the new contact</template>
    <template v-slot:body>
      <div class="inputs">
        <p>Picture:</p>
        <input type="file" ref="inputFile" @change="fileSelected">
        <p>Name:</p>
        <input type="text" v-model="name">
        <p>Location:</p>
        <input type="text" v-model="location">
        <p>Phone Number:</p>
        <input type="number" v-model="phone">
        <p>Email:</p>
        <input type="text" v-model="email">
      </div>
    </template>
    <template v-slot:footer>
      <button class="push" type="button" @click="pushContact">Add</button>
      <button class="discard" type="button" @click="closeModal">Cancel</button>
    </template>
  </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal";

export default {
  data() {
    return {
      url: '',
      name: '',
      location: '',
      phone: '',
      email: '',
      isModalVisible: false,
    }
  },
name: "AddContact",
  components: {
    Modal,
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    fileSelected(evt) {
      evt.preventDefault()
      console.log(evt);
      const file = evt.target.files[0]
      this.url = URL.createObjectURL(file);
    },
    pushContact() {
      const newContact = {id: Date.now(),
        name: this.name,
        location: this.location,
        phone: this.phone,
        email: this.email,
        url: this.url
      }
      this.$emit('add-contact', newContact);
      this.name = '';
      this.phone = '';
      this.email = '';
      this.url = '';
      this.$refs.inputFile.value = null;
    },
  },
}
</script>

<style scoped>
.inputs {
  display: flex;
  flex-direction: column;
}
</style>