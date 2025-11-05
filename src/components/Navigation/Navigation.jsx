import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import homeIcon from '../../images/icons/home.svg';
import statisticIcon from '../../images/icons/statistic.svg';
import currencyIcon from '../../images/icons/currency.svg';


const Navigation = () => {
  const getClassName = (isActive, additionalClass) =>
    isActive
      ? `${styles.navLink} ${styles.active}`
      : `${styles.navLink} ${additionalClass}`;

  return (
    <div className={styles.navigation}>
      <NavLink
        to="/dashboard"
        end
        className={({ isActive }) => getClassName(isActive, '')}
      >
        <div className={styles.linkIcon}>
          <svg className={styles.homeIcon}>
            <use href={`${homeIcon}#icon-home`}></use>
          </svg>
        </div>
        <span className={styles.linkText}>Home</span>
      </NavLink>

      <NavLink
        to="/dashboard/statistics"
        className={({ isActive }) => getClassName(isActive, '')}
      >
        <div className={styles.linkIcon}>
          <svg className={styles.statisticIcon}>
            <use href={`${statisticIcon}#icon-statistic`}></use>
          </svg>
        </div>
        <span className={styles.linkText}>Statistics</span>
      </NavLink>

      <NavLink
        to="currency"
        className={({ isActive }) =>
          getClassName(isActive, styles.currencyLink)
        }
      >
        <div className={styles.linkIcon}>
          <svg className={styles.currencyIcon}>
            <use href={`${currencyIcon}#icon-currency`}></use>
          </svg>
        </div>
        <span className={styles.linkText}>Currency</span>
      </NavLink>
    </div>
  );
};

export default Navigation;