// axios is a library that handles ajax requests
import axios from 'axios'
import React, { useState, useContext } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

// const url = ''
// const tempUrl =
//   'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  // if waiting display the form, if not, display the questions
  const [waiting, setWaiting] = useState(true)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // setting quiz hook as an object to change its properties dynamically through handleChange function
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy',
  })

  const fetchQuestions = async (url) => {
    setLoading(true)
    setWaiting(false)
    const response = await axios(url).catch((err) => console.log(err))
    if (response) {
      const data = response.data.results
      if (data.length > 0) {
        setQuestions(data)
        setLoading(false)
        setWaiting(false)
        setError(false)
      } else {
        setWaiting(true)
        setError(true)
      }
    } else {
      setWaiting(true)
    }
  }

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1
      // when index goes over the number of questions open the modal
      if (index > questions.length - 1) {
        openModal()
        return 0
      } else {
        return index
      }
    })
  }
  // passing in the value that later get checked if true and if you look at the use of checkAnswer in onClick within App.js you will understand it better; even statement of trueness is treated as a value
  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1)
    }
    // no matter the correctness or even skipping the questions, go to the next question
    nextQuestion()
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setWaiting(true)
    setCorrect(0)
    setIsModalOpen(false)
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    // [name] bellow referres to property name we have in the quiz up top, so we can dinamically change the NAME of the property(difficulty, category or amount) we are assigning value to
    setQuiz({ ...quiz, [name]: value })
  }

  const handleSubmit = (e) => {
    // prevent page refresh every for every submit; in some projects you want to do it, but not in this one
    e.preventDefault()
    const { amount, difficulty, category } = quiz

    // category pulled from table object from the top; accessing it dynamically
    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`

    fetchQuestions(url)
  }

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
