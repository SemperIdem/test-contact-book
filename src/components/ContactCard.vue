<template>
<li>
    <div class="contact">
      <img
          v-if=contact.url :src=contact.url
      />
      <img
          v-else src="../assets/default.jpg"
      />
      <div class="contact-info">
        <h3 class="name">{{ contact.name }}</h3>
        <span class="phone"><font-awesome-icon icon="phone" /> {{contact.phone}}</span>
      </div>
    </div>
    <div class="btn-group">
      <button @click="goTodetail()" class="description"
        ><font-awesome-icon icon="info"/></button>
        <button class="remove"
                v-on:click="$emit('remove-contact', contact)"
        ><font-awesome-icon icon="trash"/></button>
    </div>
</li>
</template>

<script>
export default {
name: "ContactCard",
  props: {
    contact: {
      type: Object,
      required: true
    },
  },

  methods: {
    goTodetail() {
      console.log('route push');
      this.$router.push({ name: 'contact', params: {id: this.contact.id}})
    }
   }
}
</script>

<style scoped>
  li {
    border: 1px solid #ccc;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: .5rem 2rem;
    margin-bottom: 1rem;
  }

  span {
    color: gray;
  }

  .contact {
    display: flex;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  img {
    width:  150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 2.75rem;
  }

  .btn-group {
    display: flex;
    justify-content:center;
    align-items:center;
  }

  .btn-group button {
    background-color: white;
    border-radius: 50%;
    color: gray;
    padding: 10px 24px;
    cursor: pointer;
    border: none;
  }

  button:hover {
    opacity: 0.5;
  }

</style>