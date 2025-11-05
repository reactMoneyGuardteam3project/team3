import styles from './StatisticsTable.module.css';
import { useSelector } from 'react-redux';
import {
  selectTransactionsSummary,
  selectFilteredCategories,
  selectIsLoading,
} from '../../redux/transactions/selectors';
import { getTransactionCategoryColor } from '../../constants/TransactionConstants';
import LoadingSpinner from '../CommonFile/LoadingSpinner/Loader';

const StatisticsTable = () => {
  const isLoading = useSelector(selectIsLoading);
  const transactionsSummary = useSelector(selectTransactionsSummary);
  const filteredCategories = useSelector(selectFilteredCategories);

  const renderCategorySummary = () => (
    <div className={styles.categorySummary}>
      {filteredCategories.map(item => (
        <div key={item.name} className={styles.categoryRow}>
          <div className={styles.category}>
            <div
              className={styles.colorDot}
              style={{
                backgroundColor: getTransactionCategoryColor(item.name),
              }}
            />
            <span>{item.name}</span>
          </div>
          <span className={styles.sum}>
            {(item.total * -1).toLocaleString('en-US')}
          </span>
        </div>
      ))}

      <div className={styles.total}>
        <div className={styles.totalExpenses}>
          <span>Expenses</span>
          <span>
            {(transactionsSummary?.expenseSummary * -1 || 0).toLocaleString(
              'en-US'
            )}
          </span>
        </div>

        <div className={styles.totalIncome}>
          <span>Income</span>
          <span>
            {(transactionsSummary?.incomeSummary || 0).toLocaleString('en-US')}
          </span>
        </div>
      </div>
    </div>
  );

  const renderMissingDataMessage = () => (
    <p className={styles.noData}>There is no data for selected date</p>
  );

  return (
    <div className={styles.statisticsTable}>
      <div className={styles.tableHead}>
        <span>Category</span>
        <span>Sum</span>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : filteredCategories?.length > 0 ? (
        renderCategorySummary()
      ) : (
        renderMissingDataMessage()
      )}
    </div>
  );
};

export default StatisticsTable;
