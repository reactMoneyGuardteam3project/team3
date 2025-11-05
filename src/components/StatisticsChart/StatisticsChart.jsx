import 'animate.css';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import styles from './StatisticsChart.module.css';
import {
  selectFilteredCategories,
  selectIsLoading,
  selectTransactionsSummary,
} from '../../redux/transactions/selectors';
import { getTransactionCategoryColor } from '../../constants/TransactionConstants';
import LoadingSpinner from '../CommonFile/LoadingSpinner/Loader';

const StatisticsChart = () => {
  const isLoading = useSelector(selectIsLoading);
  const transactionsSummary = useSelector(selectTransactionsSummary);
  const filteredCategories = useSelector(selectFilteredCategories);

  const balanceForSpecificPeriod = transactionsSummary?.periodTotal ?? 0;

  // Sayıyı binlik ayraçlarla formatlama
  const formatNumber = amount =>
    amount.toLocaleString('en-US', { minimumFractionDigits: 2 });

  // Chart data hazırlama
  const hasData = filteredCategories?.length > 0;

  const chartLabels = hasData
    ? filteredCategories.map(item => item.name)
    : ['No data available'];

  const chartValues = hasData
    ? filteredCategories.map(item => item.total * -1)
    : [100];

  const chartBackgroundColors = hasData
    ? filteredCategories.map(item => getTransactionCategoryColor(item.name))
    : ['rgba(255, 255, 255, 0.6)']; // eksik parantez kapandı ✅

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartValues,
        backgroundColor: chartBackgroundColors,
        borderWidth: 0,
        hoverOffset: 5,
      },
    ],
  };

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    elements: {
      arc: { hoverOffset: 4 },
    },
  };

  const textAnimationClasses =
    'animate__animated animate__zoomIn animate__slow';

  return (
    <div className={styles.chartContainer}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Doughnut data={chartData} options={chartOptions} />
          <div className={`${styles.balance} ${textAnimationClasses}`}>
          ₴ {formatNumber(balanceForSpecificPeriod)}
          </div>
        </>
      )}
    </div>
  );
};

export default StatisticsChart;
