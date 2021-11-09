import longText from "../cmps/long-text.cmp.js"
import reviewAdd from "../cmps/review-add.cmp.js"
import {
    bookService
} from '../services/book-service.js';
import {
    eventBus
} from "../services/event-bus-service.js";


export default {
    props: [''],
    components: {
        longText,
        reviewAdd
    },
    template: `
        <section v-if="book" class="book-details app-main">
            <button @click="closeDetails">X</button>
            <h3>Book Details:</h3>
            <img class="img-thumnail" :src="book.thumbnail"/>
            <p>Id: {{book.id}}</p>
            <p>Title : {{book.title}}</p>
            <p :class="checkPrice">Price : {{book.listPrice.amount}}<span>{{changeCurr}}</span></p>
            <p>Authors: {{...book.authors}}</p>
            <p>Categories: {{...book.categories}}</p>
            <!-- <p>Desctiption: {{book.description}}</p> -->
            <long-text :txt="book.description"/>
            <p>Language: {{book.language}}</p>
            <p>Pages count:<span> {{showPageCount}}</span></p>
            <p>Published date: <span> {{showPublishedDate}}</span></p>
            <p>Is book on sale?: {{book.listPrice.isOnSale}}</p>
            <img class="img-sale" v-if="book.listPrice.isOnSale" src="../../img/sale.png">
            <section >
                reviews:
                <ul >
                    <li v-for="(review,idx) in reviews">
                            {{review}}
                            <button class="delete-review-btn" @click="deleteReview(idx)">X</button>
                        
                    </li>
                </ul>
            </section>
            <review-add @addReview="addReview"/>
        </section>
        <section v-else class="loader app-main">
            <h2>Loading...</h2>
        </section>
    `,
    data() {
        return {
            book: null,
            reviews: null
        }
    },
    created() {
        const {
            bookId
        } = this.$route.params; //get info on the curr location
        bookService.getById(bookId)
            .then(book => {
                let reviews = book.reviews || []
                this.book = book
                this.reviews = reviews
            })
        // .catch(err => {
        //     console.log(err);
        // })
    },
    methods: {
        closeDetails() {
            this.$router.push('/book') //move to another pagebu
        },

        addReview(review) {
            // let book = {
            //     ...this.book
            // }

            // book.reviews = this.reviews
            // bookService.save(book)
            bookService.addReviewToBook(this.book.id, review)
                .then(res => {
                    console.log(res)
                    this.reviews.push(review)
                    const msg = {
                        txt: 'Added successfully',
                        type: 'success',
                        link: '/book'
                    }
                    console.log(msg);
                    eventBus.$emit('showMsg', msg);
                })
                .catch(err => {
                    const msg = {
                        txt: err,
                        type: 'error'
                    }
                    eventBus.$emit('showMsg', msg);
                })
        },
        deleteReview(reviewIdx) {
            bookService.deleteReviewFromBook(this.book.id, reviewIdx)
                .then(res => {
                    this.reviews = res.reviews
                    console.log(res)
                    const msg = {
                        txt: 'deleted successfully',
                        type: 'success',
                        link: '/book'
                    }
                    console.log(msg);
                    eventBus.$emit('showMsg', msg);
                })
                .catch(err => {
                    const msg = {
                        txt: err,
                        type: 'error'
                    }
                    eventBus.$emit('showMsg', msg);
                })

        }
    },
    computed: {
        changeCurr() {
            let curr = this.book.listPrice.currencyCode
            if (curr === 'EUR') return '€'
            if (curr === 'ILS') return '₪'
            if (curr === 'USD') return '$'
        },
        showPageCount() {
            let count = this.book.pageCount
            if (count > 500) count += ' -Long reading'
            else if (count > 200) count += ' -Decent reading'
            else if (count < 100) count += ' -Light reading'
            return count
        },
        showPublishedDate() {
            let date = this.book.publishedDate
            let now = new Date().getFullYear()
            let diff = now - date
            if (diff > 10) return `${date}, the diff: ${diff} - Veteran Book`
            if (diff <= 1) return `${date}, the diff: ${diff} - New Book`
            return `${date}`
        },
        checkPrice() {
            let price = this.book.listPrice.amount
            if (price > 150) return 'high-price'
            if (price < 20) return 'low-price'
        },


    },
}