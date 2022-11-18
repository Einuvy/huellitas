const {createApp} = Vue


const destacados = createApp({
    data(){
        return {
            productos: [],
            productosDestacados: [],
            productoRandom: [],
            numero: 3
        }
    },
    created(){
        this.getApi()
    },
    methods: {
        getApi(){
            fetch('https://apipetshop.herokuapp.com/api/articulos')
            .then(response => response.json())
            .then(data => {
                this.productos = data.response
                this.productosDestacados = this.productos.filter(producto => producto.stock <= 5)
            })
            .catch(err => console.log(err))
        }
    }
})


destacados.mount('#destacados')