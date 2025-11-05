import { useEffect } from 'react';
import styles from './ModalAddTransaction.module.css';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';

const ModalAddTransactionNew = ({ closeModal }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = event => {
      if (event.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]); // ✅ dependency eklendi

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) closeModal();
  };

  return (
    <div className={styles.addModal} onClick={handleBackdropClick}>
      <AddTransactionForm closeModal={closeModal} />
    </div>
  );
};

export default ModalAddTransactionNew;
