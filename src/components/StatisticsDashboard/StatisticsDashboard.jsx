import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './StatisticsDashboard.module.css';
import { useDispatch } from 'react-redux';
import { Months_OPTIONS, YEARS_OPTIONS } from 'constants/TransactionConstants';
import { fetchTransactionsSummary } from '../../redux/transactions/operations';

const StatisticsDashboard = () => {
  const dispatch = useDispatch();

  const [month, setMonth] = useState(new Date().getMonth() + 1); // Luna curentă
  const [year, setYear] = useState(new Date().getFullYear()); // Anul curent

  const monthRef = useRef(null);
  const yearRef = useRef(null);

  // Funcție pentru a trimite cererea către API
  const getTransactionSummary = useCallback(() => {
    if (month && year) {
      dispatch(fetchTransactionsSummary({ month, year }));
    } else {
      console.error('Month or year is undefined.');
    }
  }, [dispatch, month, year]);

  // Actualizează luna și anul atunci când dropdown-urile se schimbă
  const handleMonthChange = event => {
    setMonth(event.target.value);
  };

  const handleYearChange = event => {
    setYear(event.target.value);
  };

  useEffect(() => {
    // Rulează doar după ce luna și anul sunt setate
    if (month && year) {
      getTransactionSummary();
    }
  }, [getTransactionSummary, month, year]);

  return (
    <div className={styles.dropdownsWrapper}>
      {/* Dropdown pentru lună */}
      <select
        onChange={handleMonthChange}
        ref={monthRef}
        value={month} // Setăm valoarea curentă
      >
        {Months_OPTIONS.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {/* Dropdown pentru an */}
      <select
        onChange={handleYearChange}
        ref={yearRef}
        value={year} // Setăm valoarea curentă
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