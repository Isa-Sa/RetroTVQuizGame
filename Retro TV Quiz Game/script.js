const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')

const gameCategories = [ 
  {
        genre: "WHO?",
        questions: [
          {
                question: "Who created Star Wars?",
                answers: ["Gene Roddenberry", "George Lucas"],
                correct: "George Lucas",
                level: "easy",
          },
          {
                question: "Who is also known as the Dark Knight?",
                answers: ["Bruce Wayne", "Clark Kent"],
                correct: "Bruce Wayne",
                level: "medium",
          },
          {
                question: "Who was there first?",
                answers: ["Aztec", "Maya"],
                correct: "Maya",
                level: "hard",
          },
     ],
  },
  {
         genre: "WHERE?",
         questions: [
            {
                question: "Where was LOTR filmed?",
                answers: ["New Zealand", "Scotland"],
                correct: "New Zealand",
                level: "easy",
            },
            {
                question: "Where were the Salem Witch Trials?",
                answers: ["Mississippi", "Massachusetts"],
                correct: "Massachusetts",
                level: "medium",
            },
            {
                question: "Where is Llanfairpw llgwyngyll?",
                answers: ["Papua New Guinea", "United Kingdom"],
                correct: "United Kingdom",
                level: "hard",
            },
       ],
    },
    {
         genre: "WHEN?",
         questions: [
            {
                question: "When is the Finnish Independence day?",
                answers: ["March 18", "December 6"],
                correct: "December 6",
                level: "easy",
            },
            {
                question: "When was the 1st Super Mario Game released?",
                answers: ["1985", "1981"],
                correct: "1985",
                level: "medium",
            },
            {
                question: "When did the Berlin Wall fall?",
                answers: ["1976", "1989"],
                correct: "1989",
                level: "hard",
            },
        ],
    },
    {
         genre: "WHAT?",
         questions: [
            {
                question: "What is the capital of Finland?",
                answers: ["Kajaani", "Helsinki"],
                correct: "Helsinki",
                level: "easy",
            },
            {
                question: "What is the capital of Iceland?",
                answers: ["Reidarfjordur", "Reykjavik"],
                correct: "Reykjavik",
                level: "medium",
            },
            {
                question: "What country does Easter Island belong to?",
                answers: ["Chile", "Uruguay"],
                correct: "Chile",
                level: "hard",
            },
        ],
    },
    {
         genre: "HOW MANY?",
         questions: [
            {
                question: "How many planets are in our Solar System?",
                answers: ["8", "9"],
                correct: "8",
                level: "easy",
            },
            {
                question: "How many seconds is an hour?",
                answers: ["36000", "3600"],
                correct: "3600",
                level: "medium",
            },
            {
                question: "How many people live in Mexico City?",
                answers: ["3,2 mil", "8,8 mil"],
                correct: "8,8 mil",
                level: "hard",
            },
        ],
    },
]  

let score = 0

// 5 CATEGORY COLUMNS
gameCategories.forEach(category => addCategory(category))

function addCategory(category) {
    const column = document.createElement('div')
    column.classList.add('genre-column')
  
    const genreTitle = document.createElement('div')
    genreTitle.classList.add('genre-title')
    genreTitle.innerHTML = category.genre
  
    column.appendChild(genreTitle)
    game.append(column)
  
    category.questions.forEach(question => {
      const card = document.createElement('div')
      card.classList.add('card')
      card.classList.add('card_alignment')
      card.classList.add('card_hover')
      column.append(card)
      
      if (question.level === 'easy') {
          card.innerHTML = 100
      }
      if (question.level === 'medium') {
        card.innerHTML = 200
      }
      if (question.level === 'hard') {
          card.innerHTML = 300
      } 
      
      card.setAttribute('data-question', question.question)
      card.setAttribute('data-answer-1', question.answers[0])
      card.setAttribute('data-answer-2', question.answers[1])
      card.setAttribute('data-correct', question.correct)
      card.setAttribute('data-value', card.getInnerHTML())
      
      card.addEventListener('click', flipCard)
   })
}

function flipCard() {
  this.innerHTML = ""
  this.style.fontSize = "20px"
  this.style.lineHeight = "25px"
  this.classList.remove('card_hover')
  this.classList.remove('card_alignment')
  this.classList.add('card_2')
  const textDisplay = document.createElement('div')
  textDisplay.classList.add('card-text')
  textDisplay.innerHTML = this.getAttribute('data-question')
  const firstButton = document.createElement('button')
  const secondButton = document.createElement('button')
  firstButton.classList.add('first-button')
  secondButton.classList.add('second-button')
  firstButton.innerHTML = this.getAttribute('data-answer-1')
  secondButton.innerHTML = this.getAttribute('data-answer-2')
  firstButton.addEventListener('click', getResult)
  secondButton.addEventListener('click', getResult)
  this.append(textDisplay, firstButton, secondButton)
  
  const allCards = Array.from(document.querySelectorAll('.card'))
  allCards.forEach(card => card.removeEventListener('click', flipCard))
}

function getResult() {
  const allCards = Array.from(document.querySelectorAll('.card'))
  allCards.forEach(card => card.addEventListener('click', flipCard))
  
  const cardOfButton = this.parentElement
  
  if (cardOfButton.getAttribute('data-correct') == this.innerHTML) {
    score = score + parseInt(cardOfButton.getAttribute('data-value'))
    scoreDisplay.innerHTML = score
    cardOfButton.classList.add('correct-answer')
    setTimeout(() => {
        while (cardOfButton.firstChild) {
          cardOfButton.removeChild(cardOfButton.lastChild)
        }
      cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
    }, 100)
 } else {
     cardOfButton.classList.add('wrong-answer')
     setTimeout(() => {
       while (cardOfButton.firstChild) {
         cardOfButton.removeChild(cardOfButton.lastChild)
       }
       cardOfButton.innerHTML = 0
     }, 100)
 }
 cardOfButton.removeEventListener('click', flipCard)
}