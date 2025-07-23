import Wrapper from "../assets/wrappers/BigSidebar"
import NavLinks from './NavLinks'
import Logo from './Logo'
import { useDashboardContext } from "../pages/DashboardLayout"
import { Link } from "react-router-dom"
const BigSidebar = () => {
   const { showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container show-sidebar' :
        'sidebar-container'
      }>
          <div className="content">
            <header>
              <Link to='/'> 
              <Logo/>
              </Link>
            </header>
            <NavLinks isBigSidebar/>
          </div>
      </div>
    </Wrapper>
  )
}
export default BigSidebar