// src/components/Statistics/RestrictedStatisticsPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import StatisticsPage from './StatisticsPage';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const RestrictedStatisticsPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Kullanıcı giriş yapmamışsa ana sayfaya yönlendir
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // Giriş yapmışsa StatisticsPage render et
  return <StatisticsPage />;
};

export default RestrictedStatisticsPage;
