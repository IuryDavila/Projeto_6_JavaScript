class Despesa{
	constructor(ano, mes, dia, tipo, descricao, valor){
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validacao(){
		for(let i in this ){
			if(this[i] == undefined || this[i] == '' || this[i] == null){
				return false
			}
		}
		return true
	}
}

class BancoDeDados{

	constructor(){
		let id = localStorage.getItem('id')
			if(id === null){
				localStorage.setItem('id', 0)

			}

	}

	getproximoID(){	
	let pegarproximoID = localStorage.getItem('id')
	return (parseInt(pegarproximoID) + 1)
	}


	 	gravar(d){
		let id = this.getproximoID()
		localStorage.setItem(id, JSON.stringify(d))
		localStorage.setItem('id', id)


	}

	registros(){
		let despesas = Array()

		let id = localStorage.getItem('id')
		for(let i = 1; i <= id; i++){
			let despesa = JSON.parse(localStorage.getItem(i))

			if(despesa === null){
				continue
			}

			despesas.push(despesa)
		}

		return despesas
	}


}

let bancodedados = new BancoDeDados()
	


function adicionar() {
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(

		
			ano.value,
			mes.value,
			dia.value,
			tipo.value,
			descricao.value,
			valor.value
		)

	if(despesa.validacao()){
		bancodedados.gravar(despesa)
		alert('dados gravados com sucesso')

		
	} else{
		alert('faltam informações')
	}

}

function CarregarDados(){ 
	let despesas = Array()
	despesas = bancodedados.registros()

	console.log(despesas)
}


	

