import {
    eventBus
} from '../services/event-bus-service.js';

export default {
    template: `
        <section class="about-page app-main">
        <transition name="bounce">
            <div v-if="show">
                <h3 ref="header">About us...</h3>
                <h4>This is an application of books!</h4>
                <h3>Click on the "books" tab to see the books!</h3>
                <img class="home-books-img" src="../img/books2.jpg">
            </div>
           
            </transition>
            <button @click="show = !show">click me!</button>
        </section>
    `,
    data() {
        return {
            show: true
        }
    },
    methods: {
        callBus() {
            // eventBus.$emit('puk');
            // eventBus.$emit('puk2');

        }
    },
    created() {
        this.myInterval = setTimeout(() => {
            console.log('Created');
        }, 1000)
    },
    destroyed() {
        clearInterval(this.myInterval)
    },
    mounted() {
        console.log('Mounted');
        console.log(this.$refs.header);
    }
};