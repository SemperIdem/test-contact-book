<template>
  <div class="contact">
    <div class="contact-info">
<!--      <img-->
<!--          v-if=contact.url :src=contact.url-->
<!--      />-->
<!--      <img-->
<!--          v-else src="../assets/statham.jpg"-->
<!--      />-->
      <h3 class="name">{{this.currentContact(phone).name}}</h3>
<!--      <span class="location"><font-awesome-icon icon="map-marker" /> {{this.currentContact(phone).location}}</span>-->
      <span class="phone"><font-awesome-icon icon="phone" /> {{this.currentContact(phone).phone}}</span>
      <div class="details" v-for="detail in this.currentInfo(phone)" v-bind:key=detail>
        <span>{{detail}} : {{detail.value}}</span>
      </div>
<!--      <span class="email"><font-awesome-icon icon="at" /> {{email}}</span>-->
      <div class="form-group" v-if=currentInputs(phone) >
        <input type="text" class="form-control">
        <input type="text" class="form-control">
        <button @click="addInput({})">Add</button>
      </div>
      <button @click="addInput(phone)">Add new field</button>
    </div>
    <router-link to="/">Contact List</router-link>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
export default {
name: "ContactCardInfo",
  computed: mapGetters({
    currentContact: 'getContactByPhone',
    currentInfo: 'getInfoByPhone',
    currentInputs: 'getInputByPhone',
  }),
  props: {
    phone: String,
  },
  methods:  {
    // addNewField() {
    //   this.inputs.push({field: '', value: ''});
    //   console.log()
    // },
    addNewDetail(i) {
       const newDetail = this.inputs.splice(i, 1)[0];
       const update = this.currentContact(this.phone);
       update[newDetail.field] = update[newDetail.value];
       console.log(this.currentContact(this.phone));
     },

    ...mapMutations(['updateContact', 'addInput']),

  },

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