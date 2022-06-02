import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  const { questions, loading, waiting, index, correct } = useGlobalContext()
  if (waiting) {
    return <SetupForm />
  }
  if (loading) {
    return <Loading />
  }
  // destructuring questions for our purpose
  console.log(questions[0]);
  const { question, incorrect_answers, correct_answer } = questions[0]
  const answers = [...incorrect_answers, correct_answer]

  return <main>
    <Modal />
    <section className="quiz">
      <p className="correct-answers">
        correct answers : {correct}/{index}
      </p>
    </section>
  </main>
}

export default App
