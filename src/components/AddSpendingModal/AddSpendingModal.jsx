import React from "react";
import Modal from "react-modal";

//Event API
import * as eventApi from "../../utilities/api/event";

//Modal Styles
const customStyles = {
  content: {
    height: "20%",
    width: "50%",
    borderRadius: "1rem",
    padding: "2rem 1rem",
  },
};

const AddSpendingModal = ({
  isOpen,
  onClose,
  modalId,
  expense,
  setExpense,
}) => {
  //Edit Expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    setExpense(null);
    const expenseNum = parseInt(expense);
    const data = { expenseNum };
    await eventApi.editExpense(modalId, data);
    onClose();
    setExpense(expenseNum);
  };

  return (
    <div className="">
      <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            className="form-control"
            placeholder="Expense"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
          />
          <button className="btn btn-primary mt-2">Edit</button>
        </form>
      </Modal>
    </div>
  );
};

export default AddSpendingModal;
