<template>
  <div class="contact">
    <div class="contact-info">
    <img
          v-if=this.currentContact(id).url :src=this.currentContact(id).url
      />
     <img
          v-else src="../assets/statham.jpg" />

      <h3 class="name">{{this.currentContact(id).name}}</h3>
<!--      <span class="location"><font-awesome-icon icon="map-marker" /> {{this.currentContact(phone).location}}</span>-->
      <span class="phone"><font-awesome-icon icon="phone" /> {{this.currentContact(id).phone}}</span>
      <div class="details" v-for="detail in this.currentInfo(id)" v-bind:key=detail.field>
        <div v-if="!isEditingField(detail.field)">
        <span>{{detail.field}} : </span>
          <span @click="enableEditing(detail.field)">{{detail.value}}</span>
          <button class="remove" ><font-awesome-icon icon="trash"/></button>
        </div>
        <div v-if="isEditingField(detail.field)">
          <span>{{detail.field}} : </span>
          <input v-model="tempValue" class="input"/>
          <button @click="disableEditing"> Cancel </button>
          <button> Save </button>
        </div>
      </div>
      <div class="form-group" v-if=currentInputs(id) >
        <input type="text" class="form-control" v-model="inputField">
        <input type="text" class="form-control"  v-model="inputValue">
        <button @click="addNewDetail()">Add</button>
      </div>
      <button @click="addInput(id)">Add new field</button>
    </div>
    <router-link to="/">Contact List</router-link>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
export default {
name: "ContactCardInfo",
  data() { return {
    inputField: '',
    inputValue: '',
    tempValue: null,
    editing: false,
    editFields: [],
    }
  },
  computed: mapGetters({
    currentContact: 'getContactByPhone',
    currentInfo: 'getInfoByPhone',
    currentInputs: 'getInputByPhone',
  }),
  props: {
    id: String,
  },
  methods:  {
    // addNewField() {
    //   this.inputs.push({field: '', value: ''});
    //   console.log()
    // },
    addNewDetail() {
       const newDetail = {id: this.id, field: this.inputField, value: this.inputValue};
       if (!this.currentInfo(this.id).find(info => info.field === this.inputField))
       {
         this.addInfo(newDetail);
         this.hideInput(this.id);
         this.inputField = '';
         this.inputValue = '';
       }
     },
    enableEditing(field) {
      console.log('push');
      this.editFields.push(field);
    },

    isEditingField(field) {
      return this.editFields.includes(field);
    },

    disableEditing: function(){
      this.tempValue = null;
      this.editing = false;
    },

    ...mapMutations(['updateContact', 'addInput', 'addInfo', 'hideInput']),

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