const game = document.getElementById("game")



function startGame(game, cardsCount) {
    const cardsNumberArray = []
    let firstcard = null
    let secondcard = null

    // Масив чисел
    for (let i = 1; i <= cardsCount; i++) {
        cardsNumberArray.push(i, i)
    }

    // Змішати числа масива
    for (let i=0; i<cardsNumberArray.length; i++) {
        let randomIndex = Math.floor (Math.random() * cardsNumberArray.length)

        let temp = cardsNumberArray[i]
        cardsNumberArray[i] = cardsNumberArray[randomIndex]
        cardsNumberArray[randomIndex] = temp
    }

    //Настройка сітки
    let columns = 2

    if (cardsCount === 3) {
        columns = 3
    }

    if (cardsCount === 4) {
        columns = 4
    }

    if (cardsCount === 5) {
        columns = 5
    }

    game.style = 'grid-template-columns: repeat(${columns}, 1fr);'

    //Створення карточок
    for (const cardNumber of cardsNumberArray) {
        let card = document.createElement("div")
        card.textContent = cardNumber
        card.classList.add("card")

        //Клік по карточці
        card.addEventListener("click", function () {
            if(card.classList.contains("open") || card.classList.contains
            ("success")) {
                return
            }
            if(firstcard!==null && secondcard !== null) {
                firstcard.classList.remove("open")
                secondcard.classList.remove("open")
                firstcard = null
                secondcard = null
            }

            card.classList.add("open")
            console.log("карточка по якій відбувся клік", card)

            if (firstcard === null) {
                firstcard = card
            } else {
                secondcard = card
            }

            if(firstcard!==null && secondcard !== null) {
                let firstcardNumber = firstcard.textContent
                let secondcardNumber = secondcard.textContent

                if (firstcardNumber === secondcardNumber) {
                    firstcard.classList.add("success")
                    secondcard.classList.add("success")
                }
            }

            if(cardsNumberArray.length === document.querySelectorAll(".success").length){

                setTimeout(function() {
                    game.innerHTML = ""
                    alert("Перемога!")
                    let cardsCount = Number(prompt("Введіть кількість пар", 4))
                    startGame(game, cardsCount)
                }, 400)


            }
        })

        game.append(card)
    }
}
let cardsCount = Number(prompt("Введіть кількість пар", 4))
startGame(game, cardsCount)

