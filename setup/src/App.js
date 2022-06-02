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
  console.log(questions);
  const { question, incorrect_answers, correct_answer } = questions[0]
  const answers = [...incorrect_answers, correct_answer]

  return <main>
    <Modal />
    <section className="quiz">
      <p className="correct-answers">
        correct answers : {correct}/{index}
      </p>
      <article className="container">
        {/* some questions from API are set as an HTML hence dangerouslySetInnerHTML → MUST NOT COME FROM THE USER, possible malicious intent*/}
        <h2 dangerouslySetInnerHTML={{__html:question}}/>
        <div className="container">
          
        </div>
      </article>
    </section>
  </main>
}

export default App
