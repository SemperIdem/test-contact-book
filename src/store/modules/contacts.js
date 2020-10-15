

export default {
    actions: {},
    mutations: {
        addContact(state, contact) {
            state.contacts.push(contact);
        },
        removeContact(state, phone) {
            state.contacts = state.contacts.filter(contact => contact.phone !== phone);
        },
        updateContact(state, phone, detail) {
           const contact =  state.contacts.find(thing => thing.phone === phone);
           console.log(detail);
           contact[detail.field] = detail.value;
         }
    },
    state: {
        contacts: [{name: 'Vasya', phone: '7777', url: ''}, {name: 'Rock', phone: '888', url: ''}]
    },
    getters: {
        getAllContacts(state) {
            console.log(state.contacts);
            return state.contacts;
        },
        getContactByPhone: (state) => (phone) => {
            return state.contacts.find(thing => thing.phone === phone);
        }
    },
}