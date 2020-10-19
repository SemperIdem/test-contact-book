import Vue from 'vue'

export default {
    actions: {},
    mutations: {
        addContact(state, contact) {
            state.push(contact);
        },
        removeContact(state, id) {
            const index = state.findIndex(contact => contact.id === id);
            Vue.delete(state, index)
        },
        addDetail(state, object) {
            state.find(contact => contact.id === object.id)
                    .details.push(object.detail);
        },
        removeDetail(state, {id, detail}) {
            const currentContact = state.find(contact => contact.id === id);
            currentContact.details  = currentContact
                .details.filter(itemDetail => itemDetail.field !== detail.field)
        },
        setDetail(state, {id, newDetail}) {
            const currentContact = state.find(contact => contact.id === id);
            const currentDetail = currentContact
                .details.find(itemDetail => itemDetail.field === newDetail.field);
            currentDetail.value = newDetail.value;
        },
        setName(state, {id, newName}) {
            const currentContact = state.find(contact => contact.id === id);
            currentContact.name = newName;
        },
        setPhone(state, {id, newPhone}) {
            const currentContact = state.find(contact => contact.id === id);
            currentContact.phone = newPhone;
        }
    },
    state: [{id: '1', name: 'Vasya', phone: '7777', url: '', details: []},
            {id: '2', name: 'Rock', phone: '888', url: '', details: []}],
    getters: {
        getAllContacts(state) {
            return state;
        },
        getContactByPhone: (state) => (id) => {
            return state.find(thing => thing.id === id);
        },
        getDetailsByPhone: (state) => (id) => {
            return state.find(thing => thing.id === id).details;
        }

    },
}