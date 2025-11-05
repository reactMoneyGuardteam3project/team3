import { Navigate } from 'react-router-dom';
import CurrencyPage from '../CurrencyPage/CurrencyPage';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const RestrictedCurrencyPage = () => {
  // Kullanıcının giriş durumunu Redux store'dan al
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Eğer kullanıcı giriş yapmışsa CurrencyPage göster, değilse ana sayfaya yönlendir
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <CurrencyPage />;
};

export default RestrictedCurrencyPage;
