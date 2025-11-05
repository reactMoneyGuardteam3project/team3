import styles from './CurrencyPage.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const CurrencyPage = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonobankRates = async () => {
      try {
        const response = await axios.get('https://api.monobank.ua/bank/currency');
        const monoRates = response.data;

        const usdRate = monoRates.find(r => r.currencyCodeA === 840 && r.currencyCodeB === 980);
        const eurRate = monoRates.find(r => r.currencyCodeA === 978 && r.currencyCodeB === 980);

        const result = {
          USD: {
            purchase: usdRate?.rateBuy?.toFixed(2) || 'N/A',
            sale: usdRate?.rateSell?.toFixed(2) || 'N/A',
          },
          EUR: {
            purchase: eurRate?.rateBuy?.toFixed(2) || 'N/A',
            sale: eurRate?.rateSell?.toFixed(2) || 'N/A',
          },
        };

        localStorage.setItem('MONO', JSON.stringify({ data: result, fetchTime: Date.now() }));
        setRates(result);
      } catch (error) {
        console.error('Error fetching Monobank data:', error);
      } finally {
        setLoading(false);
      }
    };

    const storedData = localStorage.getItem('MONO');
    if (storedData) {
      const { data, fetchTime } = JSON.parse(storedData);
      if (Date.now() - fetchTime < 3600000) {
        setRates(data);
        setLoading(false);
        return;
      }
    }
    fetchMonobankRates();
  }, []);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1279px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.pageTitle}>Currency Rates</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Purchase</th>
            <th>Sale</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>USD</td>
            <td>{rates.USD.purchase}</td>
            <td>{rates.USD.sale}</td>
          </tr>
          <tr>
            <td>EUR</td>
            <td>{rates.EUR.purchase}</td>
            <td>{rates.EUR.sale}</td>
          </tr>
        </tbody>
      </table>

      {(isMobile || isTablet || isDesktop) && (
        <div className={styles.graphWrapper}>
          {isDesktop && (
            <div className={styles.desktopRates}>
              <div className={styles.usd}>{rates.USD.purchase}</div>
              <div className={styles.eur}>{rates.EUR.purchase}</div>
            </div>
          )}

          <svg
            className={styles.svgGraph}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 480 167"
            fill="none"
          >
            <path
              d="M0 100 L100 80 L200 90 L300 60 L400 70 L480 50"
              stroke="#FF868D"
              strokeWidth="2"
              fill="url(#grad1)"
            />
            <path
              d="M0 120 L100 100 L200 110 L300 80 L400 90 L480 70"
              stroke="#5F3DC4"
              strokeWidth="2"
              fill="url(#grad2)"
            />
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="167" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FF868D" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#FF868D" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="167" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#5F3DC4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#5F3DC4" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );
};

export default CurrencyPage;
