import React, { useState, useEffect } from 'react';

const EditFaqForm = ({ faq, onSaveEdit, onClose }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  // Populate form fields when the faq prop changes
  useEffect(() => {
    if (faq) {
      setQuestion(faq.question);
      setAnswer(faq.answer);
    }
  }, [faq]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && answer.trim()) {
      onSaveEdit({ ...faq, question, answer }); // Pass updated FAQ object
      onClose(); // Close the modal
    } else {
      alert('Question and Answer cannot be empty!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <label htmlFor="edit-question" className="block text-gray-700 text-sm font-bold mb-2">
          Question:
        </label>
        <input
          type="text"
          id="edit-question"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter the FAQ question"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="edit-answer" className="block text-gray-700 text-sm font-bold mb-2">
          Answer:
        </label>
        <textarea
          id="edit-answer"
          rows="4"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter the FAQ answer"
          required
        ></textarea>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditFaqForm;