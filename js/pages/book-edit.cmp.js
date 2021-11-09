import {
    bookService
} from '../services/book-service.js';

export default {
    template: `
        <section class="book-edit">
        <!-- <h3>Add a new book</h3> -->
            <!-- <form @submit.prevent="save" > -->
                <!-- <input v-model="bookToEdit.title" type="text" placeholder="Vendor"> -->
                <!-- <input v-model.number="bookToEdit.book.listPrice.amount" type="number" placeholder="Max speed"> -->
                <!-- <button>Save</button> -->
            <!-- </form> -->
        </section>
    `,
    data() {
        return {
            bookToEdit: bookService.getEmptyBook()
        };
    },
    methods: {
        save() {
            bookService.save(this.bookToEdit);
            this.bookToEdit = bookService.getEmptyBook();
        }
    }
};