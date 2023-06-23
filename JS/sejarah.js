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
        question: "Agama Hindu muncul di Indonesia pada tahun ... SM",
        choice1: "±500",
        choice2: "±3000",
        choice3: "±1000",
        choice4: "±1500",
        answer: 4,
    },
    {
        question: "Nilai-nilai budaya masyarakat praaksara yang tersirat berdasarkan peninggalan benda pada gambar tersebut adalah",
        choice1: "Gotong Royong",
        choice2: "Religius",
        choice3: "Sosial",
        choice4: "Kemanusiaan",
        answer: 2,
    },
    {
        question: "Perhatikan gambar tokoh berikut! Tokoh tersebut merupakan raja Gowa yang dikenal dengan julukan “Ayam Jantan dari Timur”, yang gigih melawan VOC Belanda. Tokoh yang dimaksud adalah",
        choice1: "Sultan Hasanuddin",
        choice2: "Pattimura",
        choice3: "Pangeran Diponegoro",
        choice4: "Aru Palaka",
        answer: 1,
    },
    {
        question: "Kerajaan Hindu tertua di Indonesia adalah",
        choice1: "Kerajaan Mataram",
        choice2: "Kerajaan Sriwijaya",
        choice3: "Kerajaan Kutai",
        choice4: "Kerajaan Demak",
        answer: 3,
    },
    {
        question: "Masa keruntuhan kerajaan Majapahit terjadi setelah wafatnya",
        choice1: "Rakai Pakitan",
        choice2: "Mulawarman",
        choice3: "Gadjah Mada dan Hayam Wuruk",
        choice4: "Purnawarman",
        answer: 3,
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