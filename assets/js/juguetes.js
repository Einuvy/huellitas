const {createApp} = Vue

const app = createApp( {
    data() {
        return {
            dataPet : undefined,
            dataInfo : undefined,
            dataMedicamento: [],
            copyDataInfo: undefined,
            name : undefined,
            categories: undefined,
            juguetes: undefined,
            checked: [],
            inputText: ''
        }
    },
    created() {
        fetch('https://apipetshop.herokuapp.com/api/articulos')
            .then(res => res.json())
            .then(data => {
                this.dataPet = data
                this.dataInfo = this.dataPet.response
                this.copyDataInfo = this.dataInfo
                this.dataMedicamento = this.dataInfo.filter(property => property.tipo === "Juguete")
                this.checkbox()
            })
    },
    methods: {
        checkbox() {
            this.categories = Array.from(new Set(this.dataMedicamento.map(property => property.stock)))
        },
        search() {
            this.copyDataInfo = this.dataMedicamento.filter(property => property.nombre.toLowerCase().includes(this.inputText.toLowerCase().trim()))
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
        filterAll() {
            const filterChecked = this.dataMedicamento.filter(event => this.checked.includes( event.stock ) || this.checked.length === 0)
            this.copyDataInfo = filterChecked.filter( event => event.nombre.toLowerCase().trim().includes( this.inputText.toLowerCase().trim()))
        }
    }
} )

app.mount('#content')