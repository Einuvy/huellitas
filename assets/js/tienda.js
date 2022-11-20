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
            carrito: []
        }
    },
    created(){
        fetch('https://apipetshop.herokuapp.com/api/articulos')
            .then(response => response.json())
            .then(datos =>{
                this.datos= datos.response;
                this.medicamentos = this.datos.filter( producto => producto.tipo === "Medicamento")
                this.juguetes = this.datos.filter( producto => producto.tipo === "Juguete")
                this.productoSearchMedicamentos = this.datos;
                this.productoSearchJuguetes = this.datos;
                /*console.log(this.datos);

                let numeroAleatorio = Math.round(Math.random(1)*15)

                console.log(numeroAleatorio);
                console.log(this.datos[numeroAleatorio]); */
            }) 
            .catch(error => console.error(error))
    },
    mounted(){

    },
    methods:{
        
    },
    computed: {
       busquedaMedicamentos(){
            let datosBusqueda = this.medicamentos.filter( producto => producto.nombre.toLowerCase().trim().includes(this.inputSearch.toLowerCase().trim()))
            this.productoSearchMedicamentos = datosBusqueda;
        },
        busquedaJuguetes(){
            let datosBusqueda = this.juguetes.filter( producto => producto.nombre.toLowerCase().trim().includes(this.inputSearch.toLowerCase().trim()))
            this.productoSearchJuguetes = datosBusqueda;
        },
        comprar(){

        }
    }
})

app.mount('#app')