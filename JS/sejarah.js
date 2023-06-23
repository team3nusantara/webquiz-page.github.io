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
        choice1: "A. ±500",
        choice2: "B. ±3000",
        choice3: "C. ±1000",
        choice4: "D. ±1500",
        answer: 4,
    },
    {
        question: "Berdasarkan subjeknya, sejarah sebagai kisah dapat dikelompokkan menjadi dua, yaitu…",
        choice1: "A. Sejarah politik dan sejarah baru",
        choice2: "B. Sejarah konvensional dan sejarah baru",
        choice3: "C. Sejarah lokal dan sejarah nasional",
        choice4: "D. Sejarah nasional dan sejarah regional",
        answer: 2,
    },
    {
        question: "Sejarah selalu mengikuti perkembangan gerak kemajuan manunia serta kebudayaannya. Hal ini menunjukkan bahwa sejarah merupakan ilmu yang bersifat ....",
        choice1: "A. Dinamis",
        choice2: "B. Stagnan",
        choice3: "C. Tetap",
        choice4: "D. Mutlak",
        answer: 1,
    },
    {
        question: "Kerajaan Hindu tertua di Indonesia adalah",
        choice1: "A. Kerajaan Mataram",
        choice2: "B. Kerajaan Sriwijaya",
        choice3: "C. Kerajaan Kutai",
        choice4: "D. Kerajaan Demak",
        answer: 3,
    },
    {
        question: "Masa keruntuhan kerajaan Majapahit terjadi setelah wafatnya",
        choice1: "A. Rakai Pakitan",
        choice2: "B. Mulawarman",
        choice3: "C. Gadjah Mada dan Hayam Wuruk",
        choice4: "D. Purnawarman",
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