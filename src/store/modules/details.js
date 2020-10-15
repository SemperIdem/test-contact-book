export default {
    actions: {},
    mutations: {
        addInfo(state, info) {
            state.info.find(thing => thing.phone === info.phone).list.push(info);
        },
        removeInfo(state, phone) {
            state.info = state.info.filter(contact => contact.phone !== phone);
        },
        // updateInfo(state, info) {
        //
        // }
    },
    state: {
        info: [{phone: '7777', list: []}, {phone: '888', list: []}],
    },
    getters: {
        getAllInfo(state) {
            return state.info;
        },
        getInfoByPhone: (state) => (phone) => {
            return state.info.find(thing => thing.phone === phone).list;
        }
    },
}