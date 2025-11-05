import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styles from './StatisticsDashboard.module.css';
import {
  Months_OPTIONS,
  YEARS_OPTIONS,
} from '../../constants/TransactionConstants';
import { fetchTransactionsSummary } from '../../redux/transactions/operations';

const StatisticsDashboard = () => {
  const dispatch = useDispatch();

  const [month, setMonth] = useState(String(new Date().getMonth() + 1)); // Değerleri string yapmak iyi olur
  const [year, setYear] = useState(String(new Date().getFullYear()));

  const getTransactionSummary = useCallback(() => {
    if (month && year) {
      dispatch(fetchTransactionsSummary({ month, year }));
    }
  }, [dispatch, month, year]);

  // Ay veya yıl değiştiğinde yeniden veriyi getir
  useEffect(() => {
    getTransactionSummary();
  }, [getTransactionSummary]);

  return (
    <div className={styles.dropdownsWrapper}>
      {/* Ay seçimi */}
      <select
        className={styles.select}
        onChange={e => setMonth(e.target.value)}
        value={month}
      >
        {Months_OPTIONS.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {/* Yıl seçimi */}
      <select
        className={styles.select}
        onChange={e => setYear(e.target.value)}
        value={year}
      >
        {YEARS_OPTIONS.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatisticsDashboard;
