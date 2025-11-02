import { useEffect } from 'react';
import styles from './ModalFooter.module.css';
import { useMediaQuery } from 'react-responsive';
import Logo from '../CommonFile/Logo/Logo';
import FormButton from '../CommonFile/FormButton/FormButton';
import 'animate.css';

const ModalFooter = ({ closeModal }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const addCloseEvent = event => {
      event.key === 'Escape' && closeModal();
    };
    document.addEventListener('keydown', addCloseEvent);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', addCloseEvent);
    };
  }, [closeModal]); // Added closeModal to the dependency array

  const closeOnClickOutside = event => {
    event.currentTarget === event.target && closeModal();
  };

  const screenCondition = useMediaQuery({ query: '(min-width: 768px)' });
  const animation = 'animate__animated animate__fadeInDown animate__slow';

  return (
    <div className={styles.modalFooter} onClick={closeOnClickOutside}>
      <div className={styles.modalContent}>
        {screenCondition && <Logo variant={'formLogo'} />}

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
            type={'button'}
            text={'Thank You'}
            variant={'whiteButtton'}
            handlerFunction={() => closeModal()}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalFooter;