export default {
    props: ['txt'],
    template: `
        <div class="long-text">
            <p>description:
                <span>{{showText}} 
                    <span 
                        v-if="isTextLong" 
                        class="read-more-btn" 
                        @click="toggleReadMore">Read more...
                    </span>
                    <span 
                        v-if="isTextExpended" 
                        class="read-more-btn" 
                        @click="toggleReadMore">Read less...
                    </span>
                </span>
            </p>
           
            
        </div>
    `,
    data() {
        return {
            isFull: false
        }
    },
    methods: {
        toggleReadMore() {
            this.isFull = !this.isFull
        }
    },
    computed: {
        showText() {
            let strLength = this.txt.length
            if (strLength < 100 || this.isFull) return this.txt

            let strShort = this.txt.slice(0, 100)
            return strShort
        },
        isTextLong() {
            return (!this.isFull && this.txt.length > 100)
        },
        isTextExpended() {
            return (this.isFull && this.txt.length > 100)
        }
    },
}