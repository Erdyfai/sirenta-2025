import React, { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, title, children, onSubmit }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const dialog = modalRef.current;
    if (isOpen) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }

    const handleCancel = (e) => {
      e.preventDefault(); // Cegah ESC menutup modal
      onClose?.();
    };

    dialog?.addEventListener('cancel', handleCancel);
    return () => {
      dialog?.removeEventListener('cancel', handleCancel);
    };
  }, [isOpen, onClose]);

  return (
    <dialog ref={modalRef} className="modal" onClose={onClose}>
      <div className="modal-box space-y-4">
        {title && <h2 className="font-bold text-lg">{title}</h2>}
        {children}
        {onSubmit && (
          <div className="modal-action">
            <button type="button" className="btn btn-primary" onClick={onSubmit}>
              Simpan
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Batal
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
