export default {
    actions: {},
    mutations: {
        addInfo(state, info) {
            state.info.find(thing => thing.id === info.id).list.push(info);
        },
        removeInfo(state, id) {
            state.info = state.info.filter(contact => contact.id !== id);
        },
        // updateInfo(state, detail) {
        //
        //  }
    },
    state: {
        info: [{id: '1' ,phone: '7777', list: []}, {id: '2', phone: '888', list: []}],
    },
    getters: {
        getAllInfo(state) {
            return state.info;
        },
        getInfoByPhone: (state) => (id) => {
            return state.info.find(thing => thing.id === id).list;
        }
    },
}