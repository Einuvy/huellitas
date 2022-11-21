const {createApp} = Vue

const app = createApp( {
    data() {
        return {
            eventsData: [],
            data: [],
            card: [],
            nombre: undefined,
            descripcion: undefined,
            precio: undefined,
            stock: undefined,
            imagen: undefined,
        }
    },
    created() {
        fetch('https://apipetshop.herokuapp.com/api/articulos')
        .then(response => response.json())
        .then(datos => {
            this.eventsData = datos
            this.data = this.eventsData.response
            this.detail()
        })
        .catch(error => console.error(error))
    },
    methods: {
        detail() {
            const params = new URLSearchParams(location.search)
            const id = params.get('id')
            this.card = this.data.find(cards => cards._id === id)
            this.nombre = this.card.nombre
            this.descripcion = this.card.descripcion
            this.precio = this.card.precio
            this.stock = this.card.stock
            this.imagen = this.card.imagen
        }
    }
} )

app.mount('#app')