export default {
    template: `
        <header class="app-header">
            <div class="logo">
             <a  class="logo-link" href="/"><h3>Books</h3></a>
             </div>
             <nav class="main-nav">
                <router-link @click.native="scrollToTop" to="/" active-class="active-link" exact>Home</router-link> 
                <router-link @click.native="scrollToTop" to="/book">Books</router-link> 
                <router-link @click.native="scrollToTop" to="/about">About</router-link>
            </nav>
        </header>
    `,
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    }
}