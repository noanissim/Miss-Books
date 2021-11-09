import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'],
    components: {
        bookPreview
    },
    template: `
        <ul class="book-list">
            <li v-for="book in books" :key="book.id" class="book-preview-container" >
                <book-preview :book="book" @click.native="log(book.id)" />
                <div class="actions">
                    <button @click="remove(book.id)" >X</button>
                    <!-- <button @click="select(book)" >Details</button> -->
                    <router-link @click.native="scrollToTop" :to="'/book/'+book.id" >Details</router-link>
                </div>
            </li>
        </ul>
    `,

    destroyed() {
        console.log('destroyed')
    },
    methods: {
        remove(bookId) {
            this.$emit('remove', bookId);
        },
        select(book) {
            this.$emit('selected', book);
        },
        log(bookId) {
            console.log('Logging.....', bookId);
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    },

};