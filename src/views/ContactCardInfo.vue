<template>
  <div class="contact">
    <div class="contact-info">
      <img
          v-if=url :src=url
      />
      <img
          v-else src="../assets/statham.jpg"
      />
      <h3 class="name">{{ name }}</h3>
      <span class="location"><font-awesome-icon icon="map-marker" /> {{location}}</span>
      <span class="phone"><font-awesome-icon icon="phone" /> {{phone}}</span>
      <span class="email"><font-awesome-icon icon="at" /> {{email}}</span>
    </div>
    <router-link to="/">Contact List</router-link>
  </div>
</template>

<script>
export default {
name: "ContactCardInfo",
  props: {
    url: String,
    name: String,
    location: String,
    phone: String,
    email: String,
  }
}
</script>

<style scoped>

img {
  width:  350px;
  height: 350px;
  border-radius: 50%;
}

.contact-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.75rem;
}

</style>