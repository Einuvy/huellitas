const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            search: new URLSearchParams(location.search).get('search'),
            datos: [],
            inputSearch: '',
            productoURL: [],


        }
    },
    created() {
        fetch('https://apipetshop.herokuapp.com/api/articulos')
            .then(response => response.json())
            .then(datos => {
                this.datos = datos.response;
                this.productoURL = this.datos
                /*  this.buscarPorURL() */
            })
            .catch(error => console.error(error))
    },
    mounted() {

    },
    methods: {

    },
    computed: {
        buscarPorURL() {
            let datosURL = this.datos.filter(producto => producto.nombre.toLowerCase().trim().includes(this.search))
            this.productoURL = datosURL;
        },
        busqueda() {

            let datosBusqueda = this.datos.filter(producto => producto.nombre.toLowerCase().trim().includes(this.inputSearch.toLowerCase().trim()))
            this.productoURL = datosBusqueda;

        }
    }
})

app.mount('#app')