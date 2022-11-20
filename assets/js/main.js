const {createApp} = Vue


const destacados = createApp({
    data(){
        return {
            productos: [],
            productosDestacados: [],
            productoRandom: [],
            numeroRandom: []
            
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

                this.numeroRandom = Math.floor(Math.random()* this.productosDestacados.length)

                this.productoRandom = this.productosDestacados[this.numeroRandom]
                
            })
            .catch(err => console.log(err))
        }
    }
})


destacados.mount('#destacados')