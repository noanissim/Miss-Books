export default {
    template: `
        <div class="book-filter">
            <label>Search: </label>
            <input @input="filter" v-model="filterBy.name" type="text" placeholder="Search">
            <input @input="filter" v-model.number="filterBy.fromPrice" type="number" placeholder="Min price">
            <input @input="filter" v-model.number="filterBy.toPrice" type="number" placeholder="Max price">
        </div>
    `,
    data() {
        return {
            filterBy: {
                name: '',
                fromPrice: 0,
                toPrice: Infinity,
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', {
                ...this.filterBy
            });
            //deep copy
            console.log(JSON.parse(JSON.stringify(this.filterBy)));
            this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        }
    }
}