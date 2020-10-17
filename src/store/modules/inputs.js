export default {
    actions: {},
    mutations: {
        addInput(state, id) {
            state.inputs.find(thing => thing.id === id).input = true;
        },
        hideInput(state, id) {
            state.inputs.find(thing => thing.id === id).input = false;
        },
        updateInput(state, id, detail) {
            const input =  state.inputs.find(thing => thing.id === id);
            console.log(detail);
            input[detail.field] = detail.value;
        }
    },
    state: {
        inputs: [{id: '1', phone: '7777', input: false}, {id: '2', phone: '888', input: false}]
    },
    getters: {
        getAllInputs(state) {
            return state.inputs;
        },
        getInputByPhone: (state) => (id) => {
            return state.inputs.find(thing => thing.id === id).input;
        }
    },
}