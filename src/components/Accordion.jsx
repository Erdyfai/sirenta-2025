import { useState } from 'react';

export default function Accordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`collapse collapse-arrow border-0 border-b border-blue-50 ${isOpen ? 'collapse-open bg-base-200' : 'collapse-close'}`}>
      <input type="checkbox" checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
      <div className="collapse-title font-display font-semibold cursor-pointer text-dark-lab2" onClick={() => setIsOpen(!isOpen)}>
        {question}
      </div>
      <div className="collapse-content text-sm font-display">{answer}</div>
    </div>
  );
}
