import React, {useState} from 'react'
import Modal from 'react-modal'
import * as eventApi from '../../utilities/api/event'

const AddSpendingModal = ({isOpen, onClose, modalId, expense, setExpense}) => {


   
    const customStyles = {
        content: {
        height: '20%',
        width:"50%",
        borderRadius:"1rem",
        padding:'2rem 1rem'
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setExpense(null)
        const expenseNum = parseInt(expense)
        const data = {expenseNum}
        eventApi.editExpense(modalId, data)
        setExpense(expenseNum)
        onClose()
    }
    
  return (
    <div className=''>
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
        <form onSubmit={onSubmit} className="form">
            <input type="text" className='form-control' placeholder='Expense' value={expense} onChange={e => setExpense(e.target.value)}/>
            <button className='btn btn-primary mt-2'>Edit</button>
        </form>
    </Modal>
    </div>
  )
}

export default AddSpendingModal