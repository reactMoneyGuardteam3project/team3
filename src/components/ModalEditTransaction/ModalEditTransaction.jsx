import { useEffect } from 'react';
import styles from './ModalEditTransaction.module.css';
import EditTransactionForm from '../EditTransactionForm/EditTransactionForm';

const ModalEditTransactionNew = ({ closeModal }) => {
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
    <div className={styles.editModal} onClick={handleBackdropClick}>
      <EditTransactionForm closeModal={closeModal} />
    </div>
  );
};

export default ModalEditTransactionNew;
