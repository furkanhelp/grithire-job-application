import styled from 'styled-components';

const Wrapper = styled.section`
  /* nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    top: 0;
    position: absolute;
    z-index: 1;
    text-align: center;
    transform: translate(25%, 0%);
  } */

  /* .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -1rem;
  } */

  /* h1 {
    position: absolute;
    top: 50%;
    left: 55%;
    text-align: center;
    transform: translate(-50%, -50%);
    position: absolute;
    font-weight: 500;
    span {
      color: var(--primary-500);
    }
    margin-bottom: 1.5rem;
  } */
  p {
    line-height: 2;
    color: var(--text-secondary-color);
    margin-bottom: 2.5rem;
    max-width: 35em;
  }
  /* .register-link {
    margin-right: 1rem;
  } */
  /* .main-img {
    display: none;
  } */
  /* .btn {
    position: absolute;
    top: 70%;
    left: 43%;
    text-align: center;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 0.75rem 1rem;
  }
  .btn2 {
    position: absolute;
    top: 70%;
    left: 55%;
    text-align: center;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 0.75rem 1rem;
    margin-right: 1rem;
  } */
  /* @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  } */
  /* @media (max-width: 1280px) {
    .btn {
      top: 73%;
      left: 50%;
      padding: 0.45rem 0.5rem;
    }
    .btn2 {
      top: 80%;
      left: 50%;
      padding: 0.50rem 0.5rem;
      margin-right: 1.7rem;
    }
    h1 {
      top: 45%;
    }
  } */
`;
export default Wrapper;
