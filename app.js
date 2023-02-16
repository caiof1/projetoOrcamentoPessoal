class Despesa {
    constructor(ano, dia, mes, descricao, valor, tipo) {
        this.ano = ano
        this.dia = dia
        this.mes = mes
        this.descricao = descricao
        this.valor = valor
        this.tipo = tipo
    }
}

class Bd {
    constructor() {
        let existeID = localStorage.getItem('ID')
        if(existeID === null) {
            localStorage.setItem('ID', 0)
        }
    }
    ProximoID() {
        let proximoID = parseInt(localStorage.getItem('ID')) + 1
        localStorage.setItem('ID', proximoID)
    }

    Gravar(d) {
        this.ProximoID()
        let ID = localStorage.getItem('ID')
        localStorage.setItem(ID, JSON.stringify(d))
    }
}

let bd = new Bd()
let isFilled


function cadastrarDespesa() {
    ValidarcamposVazios()
    if(isFilled) {
        let ano = document.getElementById('ano')
        let dia = document.getElementById('dia')
        let mes = document.getElementById('mes')
        let descricao = document.getElementById('descricao')
        let valor = document.getElementById('valor')
        let tipo = document.getElementById('tipo')


        let despesa = new Despesa(ano.value, dia.value, mes.value, descricao.value, valor.value, tipo.value)
        bd.Gravar(despesa)

        limparCampos()
    } else {
        alert('Falta preencher algum campo! Olhe os campos com borda em vermelho :D')
    }
    
}

function ValidarcamposVazios() {

    let ano = document.getElementById('ano')
    let dia = document.getElementById('dia')
    let mes = document.getElementById('mes')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')
    let tipo = document.getElementById('tipo')

    if(ano.value == '') {
        ano.style.borderColor = 'red'
    } else {
        ano.style.borderColor = ''
    }
    if(dia.value == '') {
        dia.style.borderColor = 'red'
    } else {
        dia.style.borderColor = ''
    }
    if(mes.value == '') {
        mes.style.borderColor = 'red'
    } else {
        mes.style.borderColor = ''
    }
    if(descricao.value == '') {
        descricao.style.borderColor = 'red'
    } else {
        descricao.style.borderColor = ''
    }
    if(valor.value == '') {
        valor.style.borderColor = 'red'
    } else {
        valor.style.borderColor = ''
    }
    if(tipo.value == '') {
        tipo.style.borderColor = 'red'
    } else {
        tipo.style.borderColor = ''
    }


    if(ano.value == '' || dia.value == '' || mes.value == '' || descricao.value == '' || valor.value == '' || tipo.value == '') {
        isFilled = false
    } else {
        isFilled = true
    }
}

function limparCampos() {
    let dia = document.getElementById('dia').value = ''
    let mes = document.getElementById('mes').value = ''
    let descricao = document.getElementById('descricao').value = ''
    let valor = document.getElementById('valor').value = ''
    let tipo = document.getElementById('tipo').value = ''
}

let tbody = document.getElementById('tbody')
let tipoEscolhido

let mostrarDespesa = () => {
    for(let i = 1; i <= localStorage.getItem('ID'); i++) {
        tipoEscolhido = ''
        let des = JSON.parse(localStorage.getItem(i))
        if(des != null) {
            let criarDespesa = document.createElement('tr')
            let date = document.createElement('td')
            let type = document.createElement('td')
            let descri = document.createElement('td')
            let val = document.createElement('td')
            let excluir = document.createElement('td')
            let inserirIconeExcluir = document.createElement('i')
            inserirIconeExcluir.style.cursor = 'pointer'
            inserirIconeExcluir.id = 'mudar-vermelho'
            tbody.appendChild(criarDespesa)
            criarDespesa.id = i
            criarDespesa.appendChild(date)
            criarDespesa.appendChild(type)
            criarDespesa.appendChild(descri)
            criarDespesa.appendChild(val)
            criarDespesa.appendChild(excluir)
            excluir.appendChild(inserirIconeExcluir)
            excluir.addEventListener('click', () => {
                criarDespesa.remove()
                localStorage.removeItem(criarDespesa.id)
            })
            date.innerHTML = des.dia + '/' + des.mes + '/' + des.ano
            if(des.tipo == 1) {
                tipoEscolhido = 'Alimentação'
            } else if(des.tipo == 2) {
                tipoEscolhido = 'Educação'
            } else if(des.tipo == 3) {
                tipoEscolhido = 'Lazer'
            } else if(des.tipo == 4) {
                tipoEscolhido = 'Saúde'
            } else if(des.tipo == 5) {
                tipoEscolhido = 'Transporte'
            }
            type.innerHTML = tipoEscolhido   
            descri.innerHTML = des.descricao
            val.innerHTML = 'R$' + des.valor
            inserirIconeExcluir.classList = 'fas fa-trash'
        }
        
    }
}

function consultarDespesa() {
    let ano = document.getElementById('ano')
    let dia = document.getElementById('dia')
    let mes = document.getElementById('mes')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')
    let tipo = document.getElementById('tipo')


    for(let j = 1; j <= localStorage.getItem('ID'); j++) {
        let des = JSON.parse(localStorage.getItem(j))
        if(des != null) {
            let anoCompleto
            let localAnoCompleto
            if(dia.value != '') {
                anoCompleto = dia.value
                localAnoCompleto = des.dia
            }
            if(mes.value != '') {
                anoCompleto += '/' + mes.value
                localAnoCompleto += '/' + des.mes
            }
            if(ano.value != '') {
                anoCompleto += '/' + ano.value
                localAnoCompleto += '/' + des.ano
            }

            if(anoCompleto != localAnoCompleto || (des.tipo != tipo.value && tipo.value != '') || (des.descricao != descricao.value && descricao.value != '') || (des.valor != valor.value && valor.value != '')) {
                document.getElementById(j).style.display = 'none'
            } else {
                document.getElementById(j).style.display = ''
            }

        }
        
        //Fiz o filtro desse jeito mais complicado, por não saber utilizar o .filter na epoca, porém, fiz outros projetos
        //Utilizando o .filter :D Não quis apagar esse metodo que fiz, por ter feito algo diferente e pensado de uma forma diferente, acho que ainda vale alguma coisa kk
    }
}

mostrarDespesa()

