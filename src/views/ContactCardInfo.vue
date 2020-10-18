<template>
  <div class="contact">
    <div class="contact-info">
    <img
          v-if=contactUrl :src=contactUrl
      />
     <img
          v-else src="../assets/statham.jpg" />

      <h3 class="name">{{contactName}}</h3>
      <span class="phone"><font-awesome-icon icon="phone" /> {{contactPhone}}</span>
      <div class="details" v-for="detail in details" v-bind:key=detail.field>
        <div v-if="!isEditingField(detail)">
          <span>{{detail.field}} : </span>
          <span @click="enableEditing(detail)">{{detail.value}}</span>
          <button @click="deleteDetail(detail)" class="remove" ><font-awesome-icon icon="trash"/></button>
        </div>
        <div v-if="isEditingField(detail)">
          <span>{{detail.field}} : </span>
          <input v-model="isEditingField(detail).value"/>
          <button @click="cancelEdit(detail)"> Cancel </button>
          <button @click="changeValue(detail)"> Save </button>
        </div>
      </div>
      <div class="form-group" v-for="(input, index) in inputs" v-bind:key=index >
        <input type="text" class="form-control" v-model="input.field">
        <input type="text" class="form-control"  v-model="input.value">
        <button @click="addNewDetail(index)">Add</button>
      </div>
      <button @click="addInput(id)">Add new field</button>
      <button @click="stepBack()">Step back</button>
    </div>
    <router-link to="/">Contact List</router-link>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
export default {
name: "ContactCardInfo",
  data() { return {
    inputs: [],
    tempValue: null,
    editing: false,
    editFields: [],
    prevActions: [],
  }
  },
  computed: {
      ...mapGetters({
                 currentContact: 'getContactByPhone',
                  currentDetails: 'getDetailsByPhone',
               }),
    contactName() {
        return this.currentContact(this.id).name;
    },
    contactPhone() {
      return this.currentContact(this.id).phone;
    },
    contactUrl() {
      return this.currentContact(this.id).url;
    },
    details() {
        return this.currentDetails(this.id);
    },
  },
  props: {
    id: String,
  },
  methods: {

    ...mapMutations({
      pushDetail: 'addDetail',
      setDetail: 'editDetail',
      removeDetail: 'removeDetail'
    }),

    addInput() {
      this.inputs.push({
        field: '',
        value: '',
      });
    },

    addNewDetail(index) {
      const newDetail = this.inputs.splice(index, 1)[0];
      if (newDetail.field) {
        if (this.details.find(detail => detail.field === newDetail.field)) {
          return;
        }
        this.pushDetail({id: this.id, detail: newDetail});
        this.saveAction('add', {field: newDetail.field, value: newDetail.value})
      }
    },


    isEditingField(detail) {
      return this.editFields.find(item => item.field === detail.field);
    },

    enableEditing(detail) {
      this.editFields.push({field: detail.field, value: detail.value});
    },

    changeValue(detail) {
      const newValue = this.editFields.find(item => item.field === detail.field);
      this.saveAction('edit', {field: detail.field, value: detail.value});
      this.setDetail({id: this.id, newDetail: newValue});
      this.editFields = (this.editFields.filter(item => item.field !== detail.field));
    },

    cancelEdit(detail) {
      this.editFields = this.editFields.filter(item => item.field !== detail.field);
    },

    saveAction(type, prevDetail) {
      this.prevActions.push({type: type, detail: prevDetail});
    },

    deleteDetail(detail) {
      this.saveAction('delete', {field: detail.field, value: detail.value})
      this.removeDetail({id: this.id, detail: detail});
    },
    stepBack() {
      const lastAction = this.prevActions.pop();
      if (lastAction) {
        switch (lastAction.type) {
          case 'add':
            this.removeDetail({id: this.id, detail: lastAction.detail});
            break;
          case 'edit':
            this.setDetail({id: this.id, newDetail: lastAction.detail});
            break;
          case 'delete':
            this.pushDetail({id: this.id, detail: lastAction.detail});
            break;
        }
      }
    }
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