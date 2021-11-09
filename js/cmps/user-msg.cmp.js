import {
    eventBus
} from '../services/event-bus-service.js';

export default {
    template: `
    <transition name="fade">
        <div v-if="msg" class="user-msg" :class="msg.type">
            <p>{{msg.txt}}</p>
            <router-link :to="msg.link" @click.native="scrollToTop">Go back to all books list</router-link>

        </div>
    </transition>
    `,
    data() {
        return {
            msg: null
        };
    },
    created() {
        eventBus.$on('showMsg', this.showMsg);
    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            setTimeout(() => {
                this.msg = null;
            }, 3000);
        },
        scrollToTop() {
            console.log('here');
            window.scrollTo(0, 0);
        }
    },
    destroyed() {
        eventBus.$off('showMsg', this.showMsg);
    }

};