<template>
<li>
    <div class="contact">
      <img
          v-if=contact.url :src=contact.url
      />
      <img
          v-else src="../assets/statham.jpg"
      />
      <div class="contact-info">
        <h3 class="name">{{ contact.name }}</h3>
<!--        <span class="location"><font-awesome-icon icon="map-marker" /> {{contact.location}}</span>-->
        <span class="phone"><font-awesome-icon icon="phone" /> {{contact.phone}}</span>
<!--        <span class="email"><font-awesome-icon icon="at" /> {{contact.email}}</span>-->
      </div>
    </div>
    <div class="btn-group">
      <button @click="goTodetail()" class="description"
        ><font-awesome-icon icon="info"/></button>
        <button class="remove"
                v-on:click="$emit('remove-contact', contact.phone)"
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
      this.$router.push({ name: 'contact', params: {url: this.contact.url, phone: this.contact.phone,
          location: this.contact.location, name: this.contact.name, email: this.contact.email}})
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
    background-color: white; /* Green background */
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