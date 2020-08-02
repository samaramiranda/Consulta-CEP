const cep = document.querySelector("#cep")

//Preenchendo o HTML com os dados
const showData = (result) => {
  //percorrendo cada propriedade do objeto JSON
  for (const campo in result) {
    //se o campo do JSON existir no HTML ele é preenchido
    if (document.querySelector("#" + campo)) {
      document.querySelector("#" + campo).value = result[campo]
    }
  }
}

cep.addEventListener("blur", (event) => {
  let search = cep.value.replace("-", "")

  //definindo as opções para acesso com fetch
  const options = {
    method: "GET",
    mode: "cors",
    cache: "default"
  }

  //acessando a API
  fetch(`https://viacep.com.br/ws/${search}/json/`, options)
    .then((response) => {//se o acesso a API der certo retorna um JSON
      response.json()
        .then((data) => {//se o retorno em JSON der certo retorna os dados dele
          showData(data)
        })
    })
    .catch((error) => {//se o acesso a API der errado retorna a mensagem de erro
      console.log("ERRO: " + error.message)
    })
})