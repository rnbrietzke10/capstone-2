import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { lakes } from '../../Data/lakes';
import { rivers } from '../../Data/rivers';
import './NavBar.scss';

import { UserContext } from '../../contexts/UserContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

const NavBar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const lakesArray = Object.keys(lakes);
  const riversArray = Object.keys(rivers);

  const navigate = useNavigate();

  const logoutHandler = async () => {
    await localStorage.removeItem('user');
    await localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <>
      <Navbar key='md' expand='md' id='navbar' className='mb-3' sticky='top'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/' className='logo'></Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement='end'
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                Texas Anglers
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='justify-content-end flex-grow-1 pe-3 left-nav-container'>
                {/* User logged in  */}
                {currentUser ? (
                  <>
                    <NavDropdown
                      title={<span className='dropdown-title'>Lakes</span>}
                      id={`offcanvasNavbarDropdown-expand-md`}
                      style={{ color: '#fff' }}
                    >
                      {lakesArray.map(lake => (
                        <NavDropdown.Item
                          as={Link}
                          to={`/lakes/${lake}`}
                          key={lake}
                        >
                          {lakes[lake].name}
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                    <NavDropdown
                      title={<span className='dropdown-title'>Rivers</span>}
                      id={`offcanvasNavbarDropdown-expand-md`}
                    >
                      {riversArray.map(river => (
                        <NavDropdown.Item
                          as={Link}
                          to={`/rivers/${river}`}
                          key={river}
                        >
                          {rivers[river].name}
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>

                    <NavDropdown
                      align='end'
                      title={
                        <img
                          className='thumbnail-image'
                          src={currentUser.profileImg}
                          alt='user pic'
                        />
                      }
                      id={`offcanvasNavbarDropdown-expand-md`}
                    >
                      <NavDropdown.Item
                        as={Link}
                        to={`/users/${currentUser.username}`}
                      >
                        {`${currentUser.firstName} ${currentUser.lastName}'s Profile`}
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to={`/users/${currentUser.username}/update`}
                      >
                        Update Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Log Out
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <Nav.Link id='nav-link' as={Link} to={`/register`}>
                      Sign up
                    </Nav.Link>
                    <Nav.Link id='nav-link' as={Link} to={`/login`}>
                      Login
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;

/**************** old nav bar */

/**
 *
  const [clickLakes, setClickLakes] = useState(false);
  const [clickRivers, setClickRivers] = useState(false);
  const [clickUserProfile, setClickUserProfile] = useState(false);
  const [click, setClick] = useState(false);

  const handleClickLakes = () => {
    setClickRivers(false);
    setClickUserProfile(false);
    setClickLakes(!clickLakes);
  };

  const handleClickRivers = () => {
    setClickLakes(false);
    setClickUserProfile(false);
    setClickRivers(!clickRivers);
  };

  const handleClickUserProfile = () => {
    setClickLakes(false);
    setClickRivers(false);
    setClickUserProfile(!clickUserProfile);
  };

  const handleClick = e => {
    if (e.target.tagName !== 'A' && e.target.tagName !== 'SPAN') {
      setClickLakes(false);
      setClickRivers(false);
      setClickUserProfile(false);
      setClick(!click);
    }
  };
  const handleCloseMenus = () => {
    setClickLakes(false);
    setClickRivers(false);
    setClickUserProfile(false);
    setClick(false);
  };

  return (
    <div className='navbar'>
      <div>
        <Link to='/'>
          <div className='logo' onClick={handleCloseMenus}></div>
        </Link>
      </div>
      <div className='menu-icon' onClick={handleClick}>
        <FontAwesomeIcon
          icon={click ? faXmark : faBars}
          size='xl'
          style={{ color: '#ffffff' }}
          className=''
        />
      </div>
      <div
        className={click ? 'route_links active' : 'route_links inactive'}
        onClick={handleClick}
      >
        <div className='nav_link_container dropdown' onClick={handleClickLakes}>
          <span className='nav_link'>Lakes</span>

          {clickLakes ? (
            <Dropdown
              items={Object.keys(lakes)}
              locationsInfo={lakes}
              type='lakes'
              handleCloseMenus={handleCloseMenus}
            />
          ) : (
            ''
          )}
        </div>
        <div
          onClick={handleClickRivers}
          className='nav_link_container dropdown'
        >
          <span className='nav_link'>Rivers</span>

          {clickRivers ? (
            <Dropdown
              items={Object.keys(rivers)}
              locationsInfo={rivers}
              type='rivers'
              handleCloseMenus={handleCloseMenus}
            />
          ) : (
            ''
          )}
        </div>

        {!currentUser ? (
          <>
            <div className='nav_link_container'>
              <Link
                to='/register'
                className='nav_link'
                onClick={handleCloseMenus}
              >
                Register
              </Link>
            </div>
            <div className='nav_link_container'>
              <Link to='/login' className='nav_link' onClick={handleCloseMenus}>
                Login
              </Link>
            </div>
          </>
        ) : (
          <div onClick={handleClickUserProfile} className='nav_user_link'>
            <Link to={`/users/${currentUser.username}`}>
              <div
                className='user_info nav_link'
                style={{
                  backgroundImage: `url(${currentUser.profileImg})`,
                }}
              />
            </Link>
            <span
              onClick={handleClickUserProfile}
              className='nav_link user_profile_mobile'
            >
              {currentUser.username}
            </span>
          </div>
        )}
        {clickUserProfile ? (
          <UserProfileDropdown
            info={{ ...currentUser, path: `/users/${currentUser.username}` }}
            handleCloseMenus={handleCloseMenus}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
 */
