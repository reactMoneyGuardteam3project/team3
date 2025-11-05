import styles from './Currency.module.css';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';

const Currency = () => {
  const [rates, setRates] = useState(null);

  useEffect(() => {
    const fetchMonobankRates = async () => {
      try {
        const response = await axios.get('https://api.monobank.ua/bank/currency');
        const monoRates = response.data;

        // USD ve EUR kurlarını seç
        const usdRate = monoRates.find(r => r.currencyCodeA === 840 && r.currencyCodeB === 980);
        const eurRate = monoRates.find(r => r.currencyCodeA === 978 && r.currencyCodeB === 980);

        const result = {
          USD: {
            buy: usdRate?.rateBuy?.toFixed(2) || 'N/A',
            sell: usdRate?.rateSell?.toFixed(2) || 'N/A'
          },
          EUR: {
            buy: eurRate?.rateBuy?.toFixed(2) || 'N/A',
            sell: eurRate?.rateSell?.toFixed(2) || 'N/A'
          }
        };

        const fetchTime = new Date().getTime();
        localStorage.setItem('MONO', JSON.stringify({ data: result, fetchTime }));
        setRates(result);
      } catch (error) {
        console.error('Error fetching Monobank data:', error);
      }
    };

    const storedData = localStorage.getItem('MONO');
    if (storedData) {
      const { data, fetchTime } = JSON.parse(storedData);
      const currentTime = new Date().getTime();
      if (currentTime - fetchTime < 3600000) {
        setRates(data); // 1 saatten azsa localStorage'dan al
      } else {
        fetchMonobankRates();
      }
    } else {
      fetchMonobankRates();
    }
  }, []);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1279px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  if (!rates) return <div>Loading...</div>;

  return (
    <div className={styles.tablewrapper}>
      <table className={styles.table}>
        <thead className={styles.tablehead}>
          <tr>
            <th className={styles.tableheader}>Currency</th>
            <th className={styles.tableheader}>Purchase</th>
            <th className={styles.tableheader}>Sale</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.tabledata}>USD</td>
            <td className={styles.tabledata}>{rates.USD.buy}</td>
            <td className={styles.tabledata}>{rates.USD.sell}</td>
          </tr>
          <tr>
            <td className={styles.tabledata}>EUR</td>
            <td className={styles.tabledata}>{rates.EUR.buy}</td>
            <td className={styles.tabledata}>{rates.EUR.sell}</td>
          </tr>
        </tbody>
      </table>

      {/* Mobil ve tablet/desktop için grafik */}
      {(isMobile || isTablet || isDesktop) && (
        <div className={styles.tablegraph}>
          {isDesktop && (
            <>
              <div className={styles.usd}>{rates.USD.buy}</div>
              <div className={styles.eur}>{rates.EUR.buy}</div>
            </>
          )}
          <svg
            className={styles.svg}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 480 102"
            fill="none"
          >
            <path
              d="M0 68.5585L38.4 43.1037C41.728 40.3298 50.9952 34.7819 61.44 34.7819C71.8848 34.7819 80.128 38.6981 82.944 40.6561L165.12 96.461C167.424 98.0927 174.49 101.356 184.32 101.356C194.15 101.356 201.216 98.0927 203.52 96.461L345.6 8.83226C349.184 6.22151 357.12 1 367.104 1C377.088 1 386.048 6.22151 390.144 8.83226L420.864 29.3919C422.912 30.6973 429.312 33.3081 438.528 33.3081C447.744 33.3081 452.727 30.4637 454.656 29.3919C461.379 25.6567 466.207 21.6267 474.624 22.0492C475.705 22.1035 478.251 22.335 480 23.0282"
              stroke="#FF868D"
            />
          </svg>
          <svg
            className={styles.svggradient}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 480 167"
            fill="none"
          >
            <path
              d="M38.4 42.1037L0 67.5585V167H480V22.0282C478.251 21.335 475.705 21.1035 474.624 21.0492C466.207 20.6267 461.379 24.6567 454.656 28.3919L454.573 28.4384C452.585 29.5434 447.614 32.3081 438.528 32.3081C429.312 32.3081 422.912 29.6973 420.864 28.3919L390.144 7.83226C386.048 5.22151 377.088 0 367.104 0C357.12 0 349.184 5.22151 345.6 7.83226L203.52 95.461C201.216 97.0927 194.15 100.356 184.32 100.356C174.49 100.356 167.424 97.0927 165.12 95.461L82.944 39.6561C80.128 37.6981 71.8848 33.7819 61.44 33.7819C50.9952 33.7819 41.728 39.3298 38.4 42.1037Z"
              fill="url(#paint0_linear)"
              fillOpacity="0.6"
            />
            <path
              d="M38.4 42.1037L0 67.5585V167H480V22.0282C478.251 21.335 475.705 21.1035 474.624 21.0492C466.207 20.6267 461.379 24.6567 454.656 28.3919L454.573 28.4384C452.585 29.5434 447.614 32.3081 438.528 32.3081C429.312 32.3081 422.912 29.6973 420.864 28.3919L390.144 7.83226C386.048 5.22151 377.088 0 367.104 0C357.12 0 349.184 5.22151 345.6 7.83226L203.52 95.461C201.216 97.0927 194.15 100.356 184.32 100.356C174.49 100.356 167.424 97.0927 165.12 95.461L82.944 39.6561C80.128 37.6981 71.8848 33.7819 61.44 33.7819C50.9952 33.7819 41.728 39.3298 38.4 42.1037Z"
              fill="#390096"
              fillOpacity="0.2"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="240"
                y1="18.5"
                x2="240"
                y2="146"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" />
                <stop offset="0.374892" stopColor="white" stopOpacity="0.536458" />
                <stop offset="0.6091" stopColor="white" stopOpacity="0.269957" />
                <stop offset="0.766012" stopColor="white" stopOpacity="0.151176" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );
};

export default Currency;
