import styles from './Currency.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Currency = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const balance = 24000.0;

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get('https://api.monobank.ua/bank/currency');
        const data = response.data;

        const usd = data.find(r => r.currencyCodeA === 840 && r.currencyCodeB === 980);
        const eur = data.find(r => r.currencyCodeA === 978 && r.currencyCodeB === 980);

        const formatted = {
          USD: {
            purchase: usd?.rateBuy?.toFixed(2) || '—',
            sale: usd?.rateSell?.toFixed(2) || '—',
          },
          EUR: {
            purchase: eur?.rateBuy?.toFixed(2) || '—',
            sale: eur?.rateSell?.toFixed(2) || '—',
          },
        };

        setRates(formatted);
        localStorage.setItem('currency_data', JSON.stringify(formatted));
        localStorage.setItem('currency_timestamp', String(Date.now()));
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    const cached = localStorage.getItem('currency_data');
    const cachedTs = localStorage.getItem('currency_timestamp');
    const now = Date.now();

    if (cached && cachedTs && now - Number(cachedTs) < 3600000) {
      setRates(JSON.parse(cached));
      setLoading(false);
    } else {
      fetchRates();
    }
  }, []);

  if (loading) return <div className={styles.loading}>Yükleniyor...</div>;

  return (
    <div className={styles.currencyContainer}>
     

      <div className={styles.tableContainer}>
        <div className={styles.currencyHeader}>
          <span>Currency</span>
          <span>Purchase</span>
          <span>Sale</span>
        </div>
        <div className={styles.currencyRow}>
          <span>USD</span>
          <span>{rates.USD.purchase}</span>
          <span>{rates.USD.sale}</span>
        </div>
        <div className={styles.currencyRow}>
          <span>EUR</span>
          <span>{rates.EUR.purchase}</span>
          <span>{rates.EUR.sale}</span>
        </div>
      </div>

      <div className={styles.graphContainer}>
        <svg className={styles.graphCanvas} viewBox="0 0 480 120">
          <path
            className={styles.graphLine}
            d="M0 100 L100 80 L200 90 L300 60 L400 70 L480 50"
          />
          <path
            className={styles.graphLine}
            stroke="#5F3DC4"
            fill="rgba(95, 61, 196, 0.15)"
            d="M0 120 L100 100 L200 110 L300 80 L400 90 L480 70"
          />
        </svg>
      </div>
    </div>
  );
};

export default Currency;
