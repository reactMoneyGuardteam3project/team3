import styles from './ModalDeleteTransaction.module.css';
import { useMediaQuery } from 'react-responsive';
import FormButton from '../CommonFile/FormButton/FormButton';
import Logo from '../CommonFile/Logo/Logo';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction } from '../../redux/transactions/operations';
import { selectTransactionIdForDelete } from '../../redux/transactions/selectors';
import { getUserInfo } from '../../redux/auth/operations';

const ModalDeleteTransaction = ({ closeModal }) => {
  const dispatch = useDispatch();
  const transactionIdForDelete = useSelector(selectTransactionIdForDelete);
  const screenCondition = useMediaQuery({ query: '(min-width: 768px)' });

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const addCloseEvent = event => {
      if (event.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', addCloseEvent);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', addCloseEvent);
    };
  }, [closeModal]);

  const closeOnClickOutside = event => {
    if (event.currentTarget === event.target) closeModal();
  };

  const handleDeleteClick = () => {
    dispatch(deleteTransaction(transactionIdForDelete))
      .unwrap()
      .then(() => {
        closeModal();
        dispatch(getUserInfo());
      })
      .catch(error => console.error(error));
  };

  return (
    <div className={styles.deleteModal} onClick={closeOnClickOutside}>
      <div className={styles.modalContent}>
        {screenCondition && <Logo variant={'formLogo'} />}

        <p>Are you sure you want to delete this transaction?</p>

        <div className={styles.buttonsWrapper}>
          <FormButton
            type={'button'}
            text={'Delete'}
            variant={'multiColorButtton'}
            handlerFunction={handleDeleteClick}
          />
          <FormButton
            type={'button'}
            text={'Cancel'}
            variant={'whiteButtton'}
            handlerFunction={closeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteTransaction;
