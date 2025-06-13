import React, { useEffect, useRef } from 'react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const dialog = modalRef.current;
    if (isOpen) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }, [isOpen]);

  const handleConfirmClick = () => {
    onConfirm();
    onClose();
  };

  return (
    <div>
      <dialog id="confirm-modal" className="modal" ref={modalRef} onClose={onClose}>
        <div className="modal-box p-6 rounded-lg shadow-xl bg-white relative">
          {title && <h2 className="font-bold text-xl mb-4 text-gray-800">{title}</h2>}
          <p className="mb-6 text-gray-700">{message}</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmClick}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}