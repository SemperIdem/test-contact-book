

export default {
    actions: {},
    mutations: {
        addContact(state, contact) {
            state.contacts.push(contact);
        },
        removeContact(state, id) {
            state.contacts = state.contacts.filter(contact => contact.phone !== id);
        },
        updateContact(state, id, detail) {
           const contact =  state.contacts.find(thing => thing.phone === id);
           console.log(detail);
           contact[detail.field] = detail.value;
         }
    },
    state: {
        contacts: [{id: '1', name: 'Vasya', phone: '7777', url: ''}, {id: '2', name: 'Rock', phone: '888', url: ''}]
    },
    getters: {
        getAllContacts(state) {
            console.log(state.contacts);
            return state.contacts;
        },
        getContactByPhone: (state) => (id) => {
            return state.contacts.find(thing => thing.id === id);
        }
    },
}