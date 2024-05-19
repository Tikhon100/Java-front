import { createRouter, createWebHistory } from 'vue-router'
import Counrty from './components/Counrty.vue';
import PhoneNumberCodes from './components/PhoneNumberCodes.vue';
import Language from './components/Language.vue';
import RequestAll from './components/RequestAll.vue';


export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/one', component: Counrty },
        { path: '/two', component: PhoneNumberCodes},
        { path: '/three', component: Language},
        { path: '/four', component: RequestAll}   
    ]
})
