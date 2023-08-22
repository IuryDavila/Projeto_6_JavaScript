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

			despesa.id = i
			despesas.push(despesa)
		}

		return despesas
	}

	pesquisar(despesa){
		let filtros = Array()

		filtros = this.registros() 

		if(despesa.ano != ''){
		filtros = filtros.filter(d => d.ano == despesa.ano)

		}

		if(despesa.mes != ''){
		filtros = filtros.filter(d => d.mes == despesa.mes)

		}	

		if(despesa.dia != ''){
		filtros = filtros.filter(d => d.dia == despesa.dia)

		}	

		if(despesa.tipo != ''){
		filtros = filtros.filter(d => d.tipo == despesa.tipo)

		}	

		if(despesa.descricao != ''){
		filtros = filtros.filter(d => d.descricao == despesa.descricao)

		}	

		if(despesa.valor != ''){
		filtros = filtros.filter(d => d.valor == despesa.valor)

		}	

		return filtros		
		
	}

	remover(id){
		localStorage.removeItem(id)
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

		ano.value = ""
		mes.value = ""
		dia.value = ""
		tipo.value = ""
		descricao.value = ""
		valor.value = ""

		
	} else{
		alert('faltam informações')
	}

}

function CarregarDados(despesas = Array(), filtros = false){ 
	if(despesas.length == 0 && filtros == false){

	
	despesas = bancodedados.registros()

	
}


	let puxarlistaDespesas = document.getElementById("listaDespesas")
			puxarlistaDespesas.innerHTML = ''


			
		despesas.forEach(function(d){
			var linha = puxarlistaDespesas.insertRow();
			linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
			linha.insertCell(1).innerHTML = d.tipo
				switch(d.tipo){
				case 1: d.tipo = "alimentação"
					break
				case 2: d.tipo = "Educação"
					break
				case 3: d.tipo = "Lazer"
					break
				case 4: d.tipo = "Saúde"
					break
				case 5: d.tipo = "Transporte"
					break				
				}
			linha.insertCell(2).innerHTML = d.descricao
			linha.insertCell(3).innerHTML = d.valor

			let btn = document.createElement("button")
			btn.className = 'btn btn-danger'
			btn.innerHTML = "X"
			btn.id = `id_despesa_${d.id}`
			btn.onclick = function(){

			//alert(id)
			let id = this.id.replace('id_despesa_','')

			bancodedados.remover(id)

			window.location.reload()

			}

			linha.insertCell(4).append(btn)


		})

 }


function search(){
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('Valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
	

	let despesas = bancodedados.pesquisar(despesa)

	this.CarregarDados(despesas, true)

}
	

