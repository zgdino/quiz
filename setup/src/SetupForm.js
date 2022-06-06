import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  const {quiz, handleChange, handleSubmit, error} = useGlobalContext()
  return <main>
    <section className="quiz quiz-small">
      <form action="" className="setup-form"></form>
    </section>
  </main>
}

export default SetupForm
