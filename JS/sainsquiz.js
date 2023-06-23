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
        question: "Hewan dan tumbuhan yang dilindungi berada di tempat-tempat khusus berikut, kecuali...",
        choice1: "A. cagar alam",
        choice2: "B. suaka margasatwa",
        choice3: "C. taman nasional",
        choice4: "D. hutan bakau",
        answer: 4,
    },
    {
        question: "Lensa mata adalah bagian mata yang berfungsi...",
        choice1: "A. mengatur daya akomodasi mata",
        choice2: "B. melindungi mata dari keringat",
        choice3: "C. membentuk bayangan benda",
        choice4: "D. mengatur banyaknya cahaya yang masuk ke mata",
        answer: 1,
    },
    {
        question: "Kupu-kupu dan belalang ditempatkan pada kelompok yang sama berdasarkan...",
        choice1: "A. bagian tubuh, jumlah kaki, dan jumlah sayap",
        choice2: "B. ruas kaki, keadaan sayap, dan sikap sewaktu hinggap",
        choice3: "C. keadaan sayap, bentuk mulut, dan jumlah kaki",
        choice4: "D. bagian kepala, bentuk mulut, dan jumlah kaki",
        answer: 1,
    },
    {
        question: "Terdapat 100 ml sebuah alkohol sedang dilarutkan ke dalam 200 ml air. Berapakah kadar alkohol dalam larutan alkohol tersebut?",
        choice1: "A. 25%",
        choice2: "B. 33%",
        choice3: "C. 50%",
        choice4: "D. 75%",
        answer: 2,
    },
    {
        question: "Bunyi dapat dihasilkan dari sebuah benda yang bergetar. Benda tersebut dapat disebut...",
        choice1: "A. alat bunyi",
        choice2: "B. rambatan bunyi",
        choice3: "C. pantulan bunyi",
        choice4: "D. sumber bunyi",
        answer: 4,
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