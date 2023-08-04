import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X,ChevronUp,ChevronDown } from 'lucide-react';
import Axios from 'axios';


const navstyle = {
  margin: '1rem',
  color: 'white',
  font: 'bold',
};

const boxStyleHover = {
  height: '50px',
  backgroundColor: 'white',
  color: 'black',
  borderRadius: '5px',
  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const submenu = {
  hover: 'black',
  font: 'bold',
  color:"white",

};
const boxStylemenuHover = {
    height: '50px',
    width:'150px',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '5px',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };


const Submenu = ({ isOpen ,ismenuOpen}) => {
    const [isHovered, setIsHovered] = useState([false, false, false]);

    const handleMouseEnter = (index) => {
      const updatedHoverState = [...isHovered];
      updatedHoverState[index] = true;
      setIsHovered(updatedHoverState);
    };
  
    const handleMouseLeave = (index) => {
      const updatedHoverState = [...isHovered];
      updatedHoverState[index] = false;
      setIsHovered(updatedHoverState);
    };
    
  return (
    <>
      {isOpen && (
        <div className='hidden lg:flex bg-gradient-to-r  duration-300   from-[#012f66] to-[#0568a1] items-center justify-between text-center p-4 shadow-lg  '>
        
            <NavLink className="block mt-2 hover:text-black mx-auto duration-300" style={isHovered[0] ? { ...submenu, ...boxStylemenuHover } : submenu}
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={() => handleMouseLeave(0)} to="/Main">Add Complaint</NavLink>
       
         
            <NavLink className="block mt-2 hover:text-black mx-auto duration-300" style={isHovered[1] ? { ...submenu, ...boxStylemenuHover } : submenu}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={() => handleMouseLeave(1)}>Delete Complaint</NavLink>
        

            <NavLink className="block mt-2 hover:text-black mx-auto duration-300" style={isHovered[2] ? { ...submenu, ...boxStylemenuHover } : submenu}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={() => handleMouseLeave(2)}>Modify Complaint</NavLink>
        
        </div>
      )}
    
    </>
  );
};

const NavLinks = ({isLGScreen, toggleNavUser }) => {
  const [isHovered, setIsHovered] = useState([false, false, false, false, false, false]);

  const handleMouseEnter = (index) => {
    const updatedHoverState = [...isHovered];
    updatedHoverState[index] = true;
    setIsHovered(updatedHoverState);
  };

  const handleMouseLeave = (index) => {
    const updatedHoverState = [...isHovered];
    updatedHoverState[index] = false;
    setIsHovered(updatedHoverState);
  };

  Axios.defaults.withCredentials = true;
  const [role, setRole] = useState("");
  useEffect(() => {
    const userRole = async () => {
      try {
        const res = await Axios.get('http://localhost:3002');
        setRole(res.data[0].role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };
    userRole();
  }, []);

  const [isthisOpen, setisThisOpen] = useState(false);

  const toggleNavedUser = () => {
    setisThisOpen(!isthisOpen);
    
  };
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    toggleNavedUser();
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  if (role === "General") {
    return (
      <>
           <NavLink
          className="text-2xl px-4  duration-300"
          style={isHovered[3] && isLGScreen ? { ...navstyle, ...boxStyleHover } : navstyle}
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={() => handleMouseLeave(3)}
          onClick={() => {
            toggleNavUser();
            toggleNavedUser();
            toggleSubMenu()
          }}
        >
           <span  className='flex justify-between'>
            Lodge Complaint 
            
         
            {isLGScreen ? (
              isSubMenuOpen ? (
                <ChevronUp className="inline ml-2 lg:hidden " />
              ) : (
                <ChevronDown className="inline ml-2 lg:hidden" />
              )
            ) : (
              <button className="focus:outline-none" onClick={toggleSubMenu}>
                {isSubMenuOpen  ? <ChevronUp /> : <ChevronDown />}
              </button>
            )}  </span>
          { isthisOpen &&   (
            <div className="lg:hidden mt-2   flex-col items-center justify-between  text-center p-4">
              <NavLink className="block mt-3 hover:text-black mx-auto text-md " style={submenu} to="/Main">
                Add Complaint
              </NavLink>
              <NavLink className="block mt-3 hover:text-black mx-auto text-md " style={submenu}>
                Modify Complaint
              </NavLink>
              <NavLink className="block mt-3 hover:text-black mx-auto text-md " style={submenu}>
                Delete Complaint
              </NavLink>
            </div>
          )}
        </NavLink>
        <NavLink
          style={isHovered[4] && isLGScreen ? { ...navstyle, ...boxStyleHover } : navstyle}
          onMouseEnter={() => handleMouseEnter(4)}
          onMouseLeave={() => handleMouseLeave(4)}
          className="hover:text-black text-2xl px-4 duration-500"
          to="/Summary"
        >
          Summary
        </NavLink>
        <NavLink
          style={isHovered[5] && isLGScreen ? { ...navstyle, ...boxStyleHover } : navstyle}
          onMouseEnter={() => handleMouseEnter(5)}
          onMouseLeave={() => handleMouseLeave(5)}
          className="hover:text-black text-2xl px-4 duration-500"
          to="/Profile"
        >
          Profile
        </NavLink>
      </>
    );
  } else {
    return (
      <>
        <NavLink style={isHovered[0] && isLGScreen ? { ...navstyle, ...boxStyleHover } : navstyle}
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={() => handleMouseLeave(0)}
          className="hover:text-black text-2xl px-4 duration-500" to="/Feedbacks">Feedbacks</NavLink>
        <NavLink style={isHovered[1] && isLGScreen ? { ...navstyle, ...boxStyleHover } : navstyle}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={() => handleMouseLeave(1)}
          className="hover:text-black text-2xl px-4 duration-500" to="/Summary">Summary</NavLink>
        <NavLink style={isHovered[2] && isLGScreen ? { ...navstyle, ...boxStyleHover } : navstyle}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={() => handleMouseLeave(2)}
          className="hover:text-black text-2xl px-4 duration-500" to="/Profile">Profile</NavLink>
      </>
    );
  }
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ismenuOpen, setIsmenuOpen] = useState(false);
  const [isLGScreen, setIsLGScreen] = useState(false);

  const toggleNavUser = () => {
    setIsOpen(!isOpen);
    setIsmenuOpen(!ismenuOpen)
    
  };
  const [wasOpen, setWasOpen] = useState(false);

  const toggleNaviUser = () => {
    setWasOpen(!wasOpen);
    
  };
  useEffect(() => {
    const handleResize = () => {
      setIsLGScreen(window.innerWidth >= 1024);
    };
    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize); // Listen for resize events
    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup on component unmount
    };
  }, []);


  return (
    <>
      <header className='bg-gradient-to-r from-[#012f66] to-[#0568a1] sticky top-0 z-[20] items-center justify-between p-8 flex-wrap mx-auto flex w-full'>
        <div className=''>
          <img className="m-0 md:object-none hidden sm:block " src='/Images/drdo_logo.png' alt='logo' />
        </div>
        <nav className='flex w-auto justify-end'>
          <div></div>
          <div className='hidden lg:flex w-full justify-end'>
            <NavLinks  isOpen={isOpen}  toggleNavUser={toggleNavUser} isLGScreen={isLGScreen} />
          </div>
          <div className='lg:hidden'>
            <button onClick={toggleNaviUser}>
              {wasOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
        {wasOpen && (
          <div className='flex flex-col  lg:hidden basis-full mt-4'>
            <NavLinks  isOpen={isOpen} toggleNavUser={toggleNavUser} isLGScreen={isLGScreen}/>
          </div>
        )}
      </header>
       <Submenu isOpen={isOpen}  />
    </>
  );
};

export default Nav;