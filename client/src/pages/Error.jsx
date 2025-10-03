import { Link, useRouteError } from "react-router-dom"
import Wrapper from '../assets/wrappers/ErrorPage';
import img from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>we'll be right back</h3>
          <p>we couldn't find that page </p>
          <Link to='/'>back home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
    <div>
      <h3>something went wrong</h3>
    
    </div>

    </Wrapper>
  )
}
export default Error