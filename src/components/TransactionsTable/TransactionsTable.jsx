import TransactionTableRow from '../TransactionTableRow/TransactionTableRow';
import styles from './TransactionsTable.module.css';

const TransactionsTable = ({ data = [], openDeleteModal, openEditModal }) => {
  return (
    <div className={styles.TransactionsTable}>
      {data.length > 0 ? (
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr className={styles.tableHeadRow}>
              <th className={styles.dateColumn}>Date</th>
              <th className={styles.typeColumn}>Type</th>
              <th className={styles.categoryColumn}>Category</th>
              <th className={styles.commentColumn}>Comment</th>
              <th className={styles.sumColumn}>Sum</th>
              <th className={styles.editColumn}></th>
              <th className={styles.deleteColumn}></th>
            </tr>
          </thead>

          <tbody className={styles.tableBody}>
            {data.map(item => (
              <TransactionTableRow
                key={item.id}
                transaction={item}
                openDeleteModal={openDeleteModal}
                openEditModal={openEditModal}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.noDataMessage}>
          There are no transactions yet for this period.
        </p>
      )}
    </div>
  );
};

export default TransactionsTable;
