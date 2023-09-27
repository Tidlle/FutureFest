const btn = document.querySelector("#btn")
const textbox = document.querySelector("#textbox")
const container = document.querySelector("#chat-container")

textbox.addEventListener("keypress",(e)=>{
    if(e.code == "Enter"){
        btn.click()
    }
})

btn.addEventListener("click", chatMe)

function chatMe() {
    let chatText = document.createElement("div")
    if (textbox.value == "") {

    } else {
        chatText.className = "card card-answer p-2"
        chatText.innerHTML = textbox.value
        textbox.value = ""

        container.appendChild(chatText)
        chatHe()
    }
}

function chatHe() {
    let chatText = document.createElement("div")
    const index = document.querySelectorAll(".chat-container > .card-answer").length
    let text
    switch (index) {
        case 1:
            text = "Como você tem se sentido emocionalmente nas últimas semanas? Você tem notado mudanças em seu humor?"
            break;
        case 2:
            text = "Você já experimentou sentimentos persistentes de tristeza, ansiedade, raiva ou desesperança?"
            break;
        case 3:
            text = "Você tem enfrentado dificuldades para dormir ou experimentado mudanças em seus hábitos de sono? "
            break;
        case 4:
            text = "Houve algum evento estressante ou trauma recente que você gostaria de discutir?"
            break;
        case 5:
            text = "Você já teve pensamentos suicidas ou autolesivos?"
            break;
        default:
            let random = Math.random()
            if(random > 0.5){
                text = "vai pro medico dog"
            }
            else if(random < 0.5){
                text = "ta suave paizao"
            }
            btn.removeEventListener("click",chatMe)
            textbox.disabled = true
            btn.remove()
            break;
            
        }
    chatText.className = "card card-question p-2"
    chatText.innerHTML = text

    container.appendChild(chatText)
    console.log(text)
}