let email = document.getElementById("email")
let password = document.getElementById("senha")
let botao = document.getElementById("continuar")
let teste = 0


botao.addEventListener("mouseenter", checkInputs)

botao.addEventListener("click", navegarParaUrl)

function checkInputs() {
    const emailValue = email.value;
    const passwordValue = password.value;
  
    if (emailValue === "") {
      console.log("O email é obrigatório.");
    } else if (!checkEmail(emailValue)) {
        console.log("Por favor, insira um email válido.");
    } else {
        if (teste < 2) {
            teste++
        }
    }
  
    if (passwordValue === "") {
        console.log("A senha é obrigatória.");
    } else if (passwordValue.length < 7) {
        console.log("A senha precisa ter no mínimo 7 caracteres.");
    } else {
        if (teste < 2) {
            teste++
        }
    }

    console.log(teste)
  }

function navegarParaUrl() {
    if (teste == 2) {
        window.location.href = "../../Inicio/index.html";
    }
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
}