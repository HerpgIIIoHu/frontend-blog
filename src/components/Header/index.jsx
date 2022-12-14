import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);
  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth='lg'>
        <div className={styles.inner}>
          <Link className={styles.logo} to='/'>
            <div>Blog</div>
          </Link>
          <div>
            {isAuth && (
              <img
                style={{ borderRadius: '50%', position: 'absolute', right: '28%', top: '13px' }}
                width={30}
                height={30}
                src={userData ? userData.avatarUrl : 'https://vtp-club.ru/img/user.png'}
                alt='userAvatar'
              />
            )}

            <div className={styles.buttons}>
              {isAuth ? (
                <>
                  <Link to='/add-post'>
                    <Button variant='contained'>Написать статью</Button>
                  </Link>
                  <Button onClick={onClickLogout} variant='contained' color='error'>
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <Link to={'/login'}>
                    <Button variant='outlined'>Войти</Button>
                  </Link>
                  <Link to='/register'>
                    <Button variant='contained'>Создать аккаунт</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
