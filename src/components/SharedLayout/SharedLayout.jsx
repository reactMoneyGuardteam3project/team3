import styles from './SharedLayout.module.css';
import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Balance from '../Balance/Balance';

import { useMediaQuery } from 'react-responsive';
import Currency from '../Currency/Currency';
import Footer from '../Footer/Footer';
import { Suspense } from 'react';

const SharedLayout = () => {
  const screenCondition = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <>
      <Header />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sharedSectionElements}>
            <div className={styles.navAndBalanceContainer}>
              <Navigation />
              {screenCondition && <Balance />}
            </div>

            {screenCondition && <Currency />}
          </div>
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SharedLayout;