import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const { isModalOpen, closeModal, correct, questions } = useGlobalContext()
  return (
    <div
    // changing className based on weather the modal is open or not
      className={`${
        isModalOpen ? 'modal-container isOpen' : 'modal-container'
      }`}
    >
      <div className='modal-content'>
        <h2>congrats</h2>
        <p>You answered {((correct/questions.length)*100).toFixed(0)}% of questions correctly</p>
        {/* onClick close the modal and show setup form */}
        <button className='close-btn' onClick={closeModal}>play again</button>
      </div>
    </div>
  )
}

export default Modal
