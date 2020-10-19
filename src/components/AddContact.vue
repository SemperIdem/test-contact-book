<template>
  <div>
    <button
        type="button"
        class="btn"
        @click="showModal"
    >
      New contact
    </button>
  <Modal
      v-show="isModalVisible"

      @close="closeModal"
  >
    <template v-slot:header>Adding the new contact</template>
    <template v-slot:body>
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      </p>
      <div class="inputs">
        <p>Name*:</p>
        <input type="text" v-model="name">
        <p>Phone Number*:</p>
        <input type="number" v-model="phone">
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
      errors:[],
      url: '',
      name: '',
      phone: '',
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
      const file = evt.target.files[0]
      this.url = URL.createObjectURL(file);
    },
    pushContact() {
      this.errors = [];
      if (this.name && this.phone) {
        const newContact = {
          id: Date.now(),
          name: this.name,
          phone: this.phone,
          details: [],
        }
        this.$emit('add-contact', newContact);
        this.clearInputs();
        return;
      }
      if(!this.name) this.pushError("Name required.");
      if(!this.phone) this.pushError("Phone required.");
    },

    pushError(error) {
      this.errors.push(error)
    },

    clearInputs() {
      this.name = '';
      this.phone = '';
      this.email = '';
      this.url = '';
      this.$refs.inputFile.value = null;
    }

  },
}
</script>

<style scoped>
  .inputs {
    display: flex;
    flex-direction: column;
  }

  .btn {
    color: #fff !important;
    text-transform: uppercase;
    text-decoration: none;
    background: #60a3bc;
    padding: 20px;
    border-radius: 50px;
    display: inline-block;
    border: none;
    transition: all 0.4s ease 0s;
    margin-bottom: 20px;
  }


</style>