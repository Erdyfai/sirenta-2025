import React from 'react';
import { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const dialog = modalRef.current;
    if (isOpen) {
      dialog?.showModal();
    } else dialog?.close();
  }, [isOpen]);
  return (
    <div>
      <dialog id="custom-modal" className="modal" ref={modalRef} onClose={onClose}>
        <div className="modal-box">
          {title && <h2 className="font-bold text-lg">{title}</h2>}
          {children}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
