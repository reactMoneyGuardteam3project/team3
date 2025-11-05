import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Balance from '../Balance/Balance';
import Currency from '../Currency/Currency';
import Footer from '../Footer/Footer';
import styles from './SharedLayout.module.css';

const SharedLayout = () => {
  const isTabletOrLarger = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <>
      <Header />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sharedSectionElements}>
            <div className={styles.navAndBalanceContainer}>
              <Navigation />
              {isTabletOrLarger && <Balance />}
            </div>

            {isTabletOrLarger && <Currency />}
          </div>

          {/* Suspense ile lazy yükleme */}
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SharedLayout;
