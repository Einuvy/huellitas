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
                this.dataMedicamento = this.dataInfo.filter(property => property.tipo === "Medicamento")
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
        
    },
    computed: {
        filterAll() {
            const filterChecked = this.dataMedicamento.filter(event => this.checked.includes( event.stock ) || this.checked.length === 0)
            this.copyDataInfo = filterChecked.filter( event => event.nombre.toLowerCase().trim().includes( this.inputText.toLowerCase().trim()))
            console.log(this.copyDataInfo)
        }
    }
} )

app.mount('#content')