export default {
    actions: {},
    mutations: {
        addInput(state, phone) {
            state.inputs.find(thing => thing.phone === phone).input = {field: '', value: ''};
        },
        removeInput(state, phone) {
            state.inputs = state.inputs.filter(input => input.phone !== phone);
        },
        updateInput(state, phone, detail) {
            const input =  state.inputs.find(thing => thing.phone === phone);
            console.log(detail);
            input[detail.field] = detail.value;
        }
    },
    state: {
        inputs: [{phone: '7777', input: false}, {phone: '888', input: false}]
    },
    getters: {
        getAllInputs(state) {
            return state.inputs;
        },
        getInputByPhone: (state) => (phone) => {
            return state.inputs.find(thing => thing.phone === phone).input;
        }
    },
}