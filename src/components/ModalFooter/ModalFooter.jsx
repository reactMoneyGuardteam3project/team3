import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import 'animate.css';
import styles from './ModalFooter.module.css';
import Logo from '../CommonFile/Logo/Logo';
import FormButton from '../CommonFile/FormButton/FormButton';

const ModalFooter = ({ closeModal }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = event => {
      if (event.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]); // ✅ dependency array doğru kullanıldı

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) closeModal();
  };

  const isTabletOrLarger = useMediaQuery({ query: '(min-width: 768px)' });
  const animation = 'animate__animated animate__fadeInDown animate__slow';

  return (
    <div className={styles.modalFooter} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        {isTabletOrLarger && <Logo variant="formLogo" />}

        <h2>Team</h2>

        <ul className={styles.teamList}>
          <li>
            <a
              href="https://github.com/Gizo-coder"
              target="_blank"
              rel="noreferrer"
            >
              Gizem Demirci
            </a>
          </li>
          <li>
            <a
              href="https://github.com/hayrunnisaicik"
              target="_blank"
              rel="noreferrer"
            >
              Nisa İcik
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Emreayvz"
              target="_blank"
              rel="noreferrer"
            >
              Emre Ayvaz
            </a>
          </li>
          <li>
            <a
              href="https://github.com/DoganDmrbs"
              target="_blank"
              rel="noreferrer"
            >
              Doğan Demirbaş
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ayktshnbs"
              target="_blank"
              rel="noreferrer"
            >
              Aykut Şahinbaş
            </a>
          </li>
          <li>
            <a
              href="https://github.com/MiracSengul"
              target="_blank"
              rel="noreferrer"
            >
              Miraç Şengül
            </a>
          </li>
        </ul>

        <div className={`${styles.thanksBtn} ${animation}`}>
          <FormButton
            type="button"
            text="Thank You"
            variant="whiteButton" 
            handlerFunction={closeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalFooter;
