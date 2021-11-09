export default {
    props: ['book'],
    template: `
        <div class="book-preview">
            <img class="img-thumnail" :src="book.thumbnail"/>
            <p>title : {{book.title}}</p>
            <p>price :<span> {{changeCurrIntl}}</span></p>
            <p>id: {{book.id}}</p>
            
        </div>
    `,
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        changeCurr() {
            let curr = this.book.listPrice.currencyCode
            if (curr === 'EUR') return '€'
            if (curr === 'ILS') return '₪'
            if (curr === 'USD') return '$'
        },
        changeCurrIntl() {
            return new Intl.NumberFormat(this.book.language, {

                style: 'currency',
                currency: this.book.listPrice.currencyCode,
            }).format(this.book.listPrice.amount);
        }

    }
}