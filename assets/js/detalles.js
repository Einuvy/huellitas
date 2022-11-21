const {createApp} = Vue

const app = createApp( {
    data() {
        return {
            eventsData: [],
            data: [],
            card: [],
        }
    },
    created() {
        fetch('https://apipetshop.herokuapp.com/api/articulos')
        .then(response => response.json())
        .then(datos => {
            this.datos = datos
            this.data = this.datos.response
            this.detail()
        })
        .catch(error => console.error(error))
    },
    methods: {
        detail() {
            const params = new URLSearchParams(location.search)
            const id = params.get('id')
            this.card = this.data.find(cards => cards._id === id)

        }
    }
} )

app.mount('#app')