const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progresstext');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressbarfull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Berapa total medali yang diraih indonesia di olympic",
        choice1: "A. 3",
        choice2: "B. 4",
        choice3: "C. 5",
        choice4: "D. 6",
        answer: 3,
    },
    {
        question: "Kapan Indonesia pernah bermain di piala dunia",
        choice1: "A. 1963",
        choice2: "B. 1955",
        choice3: "C. 1925",
        choice4: "D. 1936",
        answer: 4,
    },
    {
        question: "Nomor renang putri dilombakan sejak Olimpiade Stockholm pada tahun...",
        choice1: "A. 1990",
        choice2: "B. 1912",
        choice3: "C. 1913",
        choice4: "D. 1991",
        answer: 2,
    },
    {
        question: "Di olimpiade mana indonesia meraih dua medali emas?",
        choice1: "A. Munich",
        choice2: "B. Tokyo",
        choice3: "C. Rio De Janerio",
        choice4: "D. Barcelona",
        answer: 4,
    },
    {
        question: "gaya tinju apa yang terkenal digunakan oleh Mayweather?",
        choice1: "A. inner-boxing",
        choice2: "B. Philly-shell",
        choice3: "C. brawling",
        choice4: "D. brawling",
        answer: 2,
    },
]
const scorepoint = 20
const maxquestion = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > maxquestion) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end-quiz.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${maxquestion}`
    progressBarFull.style.width = `${(questionCounter/maxquestion) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(scorepoint)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()