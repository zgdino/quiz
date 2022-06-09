import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  const {
    questions,
    loading,
    waiting,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext()
  if (waiting) {
    return <SetupForm />
  }
  if (loading) {
    return <Loading />
  }
  // destructuring questions
  const { question, incorrect_answers, correct_answer } = questions[index]
  // const answers = [...incorrect_answers, correct_answer]

  let answers = [...incorrect_answers]
  // tempIndex is between [0,3]
  const tempIndex = Math.floor(Math.random() * 4)
  // if random number is 3 then put the correct answer at the bottom
  if (tempIndex === 3) {
    answers.push(correct_answer)
  // if random number is 0-2 in that spot push the correct answer
  } else {
    answers.push(answers[tempIndex])
    answers[tempIndex] = correct_answer
  }

  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers : {correct}/{index}
        </p>
        <article className='container'>
          {/* some questions from API are set as an HTML hence dangerouslySetInnerHTML → MUST NOT COME FROM THE USER, possible malicious intent*/}
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className='btn-container'>
            {answers.map((answer, index) => {
              return (
                // self closing button because of HTML inside of an API
                <button
                  key={index}
                  className='answer-btn'
                  // passing the statement as an value: check context for explanation
                  onClick={() => checkAnswer(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              )
            })}
          </div>
        </article>
        <button className='next-question' onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  )
}

export default App
