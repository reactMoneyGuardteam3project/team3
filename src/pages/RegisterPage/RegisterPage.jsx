import styles from './RegisterPage.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/auth/selectors';
import RegisterForm from '../../components/RegistrationForm/RegistrationForm';
import LoadingScreen from '../../components/CommonFile/LoadingScreen/LoadingScreen';

const RegisterPage = () => {
  const isLoading = useSelector(selectIsLoading);
  const [forcedLoading, setForcedLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setForcedLoading(false), 2000);
    return () => clearTimeout(timer); // Cleanup
  }, []);

  if (forcedLoading) {
    return <LoadingScreen text={'Loading page...'} />;
  }

  if (isLoading) {
    return <LoadingScreen text={'Loading ...'} />;
  }

  return (
    <div className={styles.registerPage}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
