export default {
    props: [''],
    template: `
       <section class="review-add">
            <form class="review-form" @submit.prevent="save">
                <h3>Add book review</h3>
                <input v-model="reviewerName" type="text" name="" placeholder="Enter your name here">
                <label for="">Enter your rating:</label>
                <select v-model="rate" name="rate" id="">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <input v-model="date" type="date"  name="" id="">
                <textarea v-model="textReview" name="" id="" cols="30" rows="10"></textarea>
                <button>save</button>
            </form>

       </section>
    `,
    data() {
        return {
            rate: '',
            reviewerName: '',
            date: null,
            textReview: '',
        }
    },
    methods: {
        save() {
            const review = {
                rate: this.rate,
                reviewerName: this.reviewerName,
                date: this.date,
                textReview: this.textReview,
            }
            this.$emit('addReview', review)
        }
    },
    computed: {

    },
}