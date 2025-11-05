import styles from './TransactionItem.module.css';
import icons from '../../images/icons/sprite.svg';
import {
  formatData,
  getTransactionCategory,
} from '../../constants/TransactionConstants';
import { useDispatch } from 'react-redux';
import {
  setTransactionForUpdate,
  setTransactionIdForDelete,
} from '../../redux/transactions/slice';

const TransactionItem = ({ transaction, openDeleteModal, openEditModal }) => {
  const dispatch = useDispatch();

  const { id, type, categoryId, comment, amount, transactionDate } = transaction;

  const handleDeleteClick = () => {
    dispatch(setTransactionIdForDelete(id));
    openDeleteModal();
  };

  const handleEditClick = () => {
    dispatch(setTransactionForUpdate({ ...transaction }));
    openEditModal();
  };

  const isIncome = type === 'INCOME';
  const isExpense = type === 'EXPENSE';

  const textClass = isIncome
    ? styles.incomeText
    : isExpense
    ? styles.expenseText
    : '';
  const borderClass = isIncome
    ? styles.incomeBorder
    : isExpense
    ? styles.expenseBorder
    : '';

  return (
    <li className={`${styles.transactionItem} ${borderClass}`}>
      <div className={styles.row}>
        <span className={styles.label}>Date</span>
        <span className={styles.value}>{formatData(transactionDate)}</span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Type</span>
        <span className={styles.value}>{isIncome ? '+' : '-'}</span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Category</span>
        <span className={styles.value}>
          {getTransactionCategory(categoryId)}
        </span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Comment</span>
        <span className={styles.value}>{comment || '-'}</span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Sum</span>
        <span className={`${styles.value} ${textClass}`}>
          {isIncome
            ? amount.toLocaleString('en-US', { minimumFractionDigits: 2 })
            : (amount * -1).toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      </div>

      <div className={`${styles.row} ${styles.actions}`}>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDeleteClick}
        >
          Delete
        </button>

        <button
          type="button"
          className={styles.editButton}
          onClick={handleEditClick}
        >
          <svg className={styles.editIcon}>
            <use href={`${icons}#icon-edit`}></use>
          </svg>
          <span>Edit</span>
        </button>
      </div>
    </li>
  );
};

export default TransactionItem;
