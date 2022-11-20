const {createApp} = Vue;

const app = createApp({
    data(){
        return{
            datos: [],
            medicamentos: [],
            juguetes:[],
            ultimosStocks: [],
            inputSearch: '',
            productoSearchMedicamentos: [],
            productoSearchJuguetes:[],
            carrito: [],
            totalProduct: 0,
            productoRandom: [],
            productosImprimir: [],
            productosImprimirJuguetes: []

            
        }
    },
    created(){
        fetch('https://apipetshop.herokuapp.com/api/articulos')
            .then(response => response.json())
            .then(datos =>{
                this.datos= datos.response;
                this.medicamentos = this.datos.filter( producto => producto.tipo === "Medicamento")
                this.juguetes = this.datos.filter( producto => producto.tipo === "Juguete")
                this.productoSearchMedicamentos = this.medicamentos;
                this.productoSearchJuguetes = this.juguetes;
                
                let numeroAleatorio = Math.round(Math.random(1)*15)
                
                this.productoRandom = this.datos[numeroAleatorio]

                console.log(numeroAleatorio);
                console.log(this.datos[numeroAleatorio]); 
            }) 
            .catch(error => console.error(error))
            this.carrito = JSON.parse(localStorage.getItem('cart'))
            if(!this.carrito){
            this.carrito = []
            }
    },
    mounted(){

    },
    methods:{
        addCart(element){
            if(!this.carrito.includes(element)){
                this.carrito.push(element)
                element.amount = 1
                element.originalPrice = element.precio
                this.productoSearchMedicamentos = this.productoSearchMedicamentos.filter(product => product !== element )
                this.productoSearchJuguetes = this.productoSearchJuguetes.filter(product => product !== element )
                localStorage.setItem('cart', JSON.stringify(this.carrito))
            }
        },
        deleteCart(element){
            this.carrito = this.carrito.filter(product => product !== element)
            this.productosImprimir = this.productoSearchMedicamentos.filter(product => product !== element )
            localStorage.setItem('cart', JSON.stringify(this.carrito))

        },
        addAmount(element){
            if(element.amount < element.stock){
                element.amount++
                element.precio += element.originalPrice
            } else{
                alert("No hay mas stock")
            }
            localStorage.setItem('cart', JSON.stringify(this.carrito))
        },
        removeAmount(element){
            element.amount--
            element.precio -= element.originalPrice
            localStorage.setItem('cart', JSON.stringify(this.carrito))
        }
    },
    computed: {
       busquedaMedicamentos(){
            if(this.carrito.length == 0){
                let datosBusqueda = this.medicamentos.filter( producto => producto.nombre.toLowerCase().trim().includes(this.inputSearch.toLowerCase().trim()))
                this.productosImprimir = datosBusqueda;
            } else {
                let datosBusqueda2 = this.productoSearchMedicamentos.filter( producto => producto.nombre.toLowerCase().trim().includes(this.inputSearch.toLowerCase().trim())) 
                this.productosImprimir = datosBusqueda2;

            }
        },
        busquedaJuguetes(){
            if(this.carrito.length == 0){
                let datosBusqueda3 = this.juguetes.filter( producto => producto.nombre.toLowerCase().trim().includes(this.inputSearch.toLowerCase().trim()))
                this.productosImprimirJuguetes = datosBusqueda3;
            } else {
                let datosBusqueda4 = this.productoSearchJuguetes.filter( producto => producto.nombre.toLowerCase().trim().includes(this.inputSearch.toLowerCase().trim())) 
                this.productosImprimirJuguetes = datosBusqueda4;

            }
        },
        sumCart(){
            this.totalProduct = this.carrito.map(product => product.precio).reduce((acc, iter)=> acc + iter )
        },
        
    }
})

app.mount('#app')