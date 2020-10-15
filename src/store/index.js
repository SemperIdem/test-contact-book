import Vue from 'vue'
import Vuex from 'vuex'
import contacts from "@/store/modules/contacts";
import details from "@/store/modules/details";
import inputs from "@/store/modules/inputs";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        contacts,
        details,
        inputs,
    }
})