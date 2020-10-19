<template>
  <div class="contact">
    <div class="contact-info">
     <img src="../assets/default.jpg" />

      <h3 v-if="!editingName" @click="enableEditName" class="name">{{contactName}}</h3>
      <div v-if=editingName>
        <input v-model="editingName"/>
        <button @click="changeName"> Save </button>
        <button @click="cancelEditName"> Cancel </button>
      </div>

      <span v-if="!this.editingPhone" @click="enableEditPhone()" class="phone"><font-awesome-icon icon="phone" /> {{contactPhone}}</span>

      <div v-if=editingPhone>
        <input v-model="editingPhone"/>
        <button @click="changePhone"> Save </button>
        <button @click="cancelEditPhone"> Cancel </button>
      </div>

      <div class="details" v-for="detail in details" v-bind:key=detail.field>
        <div v-if="!isEditingField(detail)">
          <span>{{detail.field}} : </span>
          <span @click="enableEditing(detail)">{{detail.value}}</span>
          <button @click="deleteDetail(detail)" class="remove" ><font-awesome-icon icon="times"/></button>
        </div>
        <div v-if="isEditingField(detail)">
          <span>{{detail.field}} : </span>
          <input v-model="isEditingField(detail).value"/>
          <button @click="changeValue(detail)"> Save </button>
          <button @click="cancelEdit(detail)"> Cancel </button>
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
    editingPhone: null,
    editingName: null,
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
      setDetail: 'setDetail',
      removeDetail: 'removeDetail',
      setName: 'setName',
      setPhone: 'setPhone',
    }),

    addInput() {
      this.inputs.push({
        field: '',
        value: '',
      });
    },

    addNewDetail(index) {
      const newDetail = this.inputs.splice(index, 1)[0];
      if (newDetail.field.trim()) {
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
      if (detail.field) {
        this.editFields.push({field: detail.field, value: detail.value});
      }
    },

    enableEditName() {
      this.editingName = this.contactName;
    },
    enableEditPhone() {
      this.editingPhone = this.contactPhone;
    },

    changeValue(detail) {
      const newValue = this.editFields.find(item => item.field === detail.field);
      this.saveAction('edit', {field: detail.field, value: detail.value});
      this.setDetail({id: this.id, newDetail: newValue});
      this.editFields = (this.editFields.filter(item => item.field !== detail.field));
    },

    changeName() {
      this.saveAction('editName', {name : this.contactName});
      this.setName({id: this.id, newName: this.editingName});
      this.editingName = null;
    },

    changePhone() {
      if (!(/[a-zA-Z]/).test(this.editingPhone)) {
        this.saveAction('editPhone', {phone : this.contactPhone});
        this.setPhone({id: this.id, newPhone: this.editingPhone});
        this.editingPhone = null;
      }
      else {
        this.editingPhone = "You can pass only nums";
      }
    },

    cancelEdit(detail) {
      this.editFields = this.editFields.filter(item => item.field !== detail.field);
    },

    cancelEditName() {
      this.editingName = null;
    },

    cancelEditPhone() {
      this.editingPhone = null;
    },

    saveAction(type, prevDetail) {
      this.prevActions.push({type: type, detail: prevDetail});
    },

    deleteDetail(detail) {
      if(confirm('Delete the field ' + detail.field + '?')) {
        this.saveAction('delete', {field: detail.field, value: detail.value});
        this.removeDetail({id: this.id, detail: detail});
      }
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
          case 'editName':
            this.setName({id: this.id, newName: lastAction.detail.name});
            break;
          case 'editPhone':
            this.setName({id: this.id, newPhone: lastAction.detail.phone});
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

  .remove {
    background-color: white;
    margin-left: 6px;
    border: none;
  }

</style>