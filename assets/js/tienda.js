const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            datos: [],
            medicamentos: [],
            juguetes: [],
            ultimosStocks: [],
            inputSearch: '',
            productoSearch:[],
            productoSearchMedicamentos: [],
            productoSearchJuguetes: [],
            carrito: [],
            totalProduct: 0,
            productoRandom: [],
            productosImprimir: [],
            productosImprimirJuguetes: []


        }
    },
    created() {
        fetch('https://apipetshop.herokuapp.com/api/articulos')
            .then(response => response.json())
            .then(datos => {
                this.datos = datos.response;
                this.medicamentos = this.datos.filter(producto => producto.tipo === "Medicamento")
                this.juguetes = this.datos.filter(producto => producto.tipo === "Juguete")
                this.productoSearchMedicamentos = this.medicamentos;
                this.productoSearchJuguetes = this.juguetes;

                this.ultimosStocks = this.datos.filter( producto => producto.stock <= 2)
                this.productoSearch = this.datos;

                if (localStorage.hasOwnProperty('cart') && localStorage.hasOwnProperty('juguetes') && localStorage.hasOwnProperty('medicamentos')) {
                    console.log('gola?');
                    this.carrito = [... new Set(JSON.parse(localStorage.getItem('cart')))]
                    this.medicamentos = [... new Set (JSON.parse(localStorage.getItem('medicamentos')))]
                    this.juguetes = [... new Set(JSON.parse(localStorage.getItem('juguetes')))]
                } else {
                    console.log('jola?');
                    localStorage.setItem('cart', JSON.stringify(this.carrito))
                    localStorage.setItem('medicamentos', JSON.stringify(this.medicamentos))
                    localStorage.setItem('juguetes', JSON.stringify(this.juguetes))
                }



            })
            .catch(error => console.error(error))

    },
    mounted() {

    },
    methods: {
        addCart(element) {
            this.carrito.push(element)
            element.amount = 1
            element.originalPrice = element.precio
            if (element.tipo === 'Medicamento') {
                this.medicamentos = this.productoSearchMedicamentos.filter(product => product !== element)
            } else {
                this.juguetes = this.productoSearchJuguetes.filter(product => product !== element)
            }
            this.actualizarLocaleStorage()
            this.tomarLocalStorage()

        },
        deleteCart(element) {
            this.carrito = this.carrito.filter(product => product !== element)
            if (element.tipo === 'Medicamento') {
                this.medicamentos.push(element)
            } else {
                this.juguetes.push(element)
            }
            this.actualizarLocaleStorage()
            this.tomarLocalStorage()
            this.busquedaJuguetes()

        },
        addAmount(element) {


            if (element.amount < element.stock) {
                element.amount++
                element.precio += element.originalPrice
            } else {
                alert("No hay mas stock")
            }
            this.actualizarLocaleStorage()
            this.tomarLocalStorage()
        },
        removeAmount(element) {


            element.amount--
            element.precio -= element.originalPrice
            this.actualizarLocaleStorage()
            this.tomarLocalStorage()
        },
        alerts() {
            Toastify({
                text: "Producto agregado al carrito",
                duration: 3000,
                destination: "",
                newWindow: false,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #FDC830, #F37335)"
                },
            }).showToast()
        }
    },
    computed: {
        busqueda(){
        let datosBusqueda = this.datos.filter( producto => producto.nombre.toLowerCase().trim().includes(this.inputSearch.toLowerCase().trim()))
        this.productoSearch = datosBusqueda;
    },
        busquedaMedicamentos() {
            let datosBusqueda = this.medicamentos.filter(producto => producto.nombre.toLowerCase().trim().includes(this.inputSearch.toLowerCase().trim()))
            this.productoSearchMedicamentos = datosBusqueda;
        },
        busquedaJuguetes() {
            let datosBusqueda = this.juguetes.filter(producto => producto.nombre.toLowerCase().trim().includes(this.inputSearch.toLowerCase().trim()))
            this.productoSearchJuguetes = datosBusqueda;
        },
        sumCart() {
            this.totalProduct = this.carrito.map(product => product.precio).reduce((acc, iter) => acc + iter)
        },
        actualizarLocaleStorage() {
            localStorage.setItem('cart', JSON.stringify(this.carrito))
            localStorage.setItem('medicamentos', JSON.stringify(this.medicamentos))
            localStorage.setItem('juguetes', JSON.stringify(this.juguetes))
        },
        tomarLocalStorage() {
            this.carrito = JSON.parse(localStorage.getItem('cart'))
            this.medicamentoStorage = JSON.parse(localStorage.getItem('medicamentos'))
            this.jugueteStorage = JSON.parse(localStorage.getItem('juguetes'))
        }
    }
})

app.mount('#app')