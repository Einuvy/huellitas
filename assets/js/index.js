const {createApp} = Vue;

const app = createApp({
    data(){
        return{
            datos: [],
            ultimosStocks: [],
            inputSearch: '',
            productoSearch:[],
        }
    },
    created(){
        fetch('https://apipetshop.herokuapp.com/api/articulos')
            .then(response => response.json())
            .then(datos =>{
                this.datos= datos.response;

                this.ultimosStocks = this.datos.filter( producto => producto.stock <= 2)
                console.log(this.ultimosStocks);

                this.productoSearch = this.datos;

            }) 
            .catch(error => console.error(error))
    },
    mounted(){

    },
    methods:{
        
    },
    computed: {
        busqueda(){
            let datosBusqueda = this.datos.filter( producto => producto.nombre.toLowerCase().trim().includes(this.inputSearch.toLowerCase().trim()))
            this.productoSearch = datosBusqueda;
        }
    }
})

app.mount('#app')