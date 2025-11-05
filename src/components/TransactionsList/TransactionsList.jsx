import TransactionItem from '../TransactionItem/TransactionItem';
import styles from './TransactionsList.module.css';

const TransactionsList = ({ data = [], openDeleteModal, openEditModal }) => {
  if (!data.length) {
    return <p className={styles.noTransactions}>No transactions found</p>;
  }

  return (
    <ul className={styles.transactionList}>
      {data.map(transaction => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          openDeleteModal={openDeleteModal}
          openEditModal={openEditModal}
        />
      ))}
    </ul>
  );
};

export default TransactionsList;
