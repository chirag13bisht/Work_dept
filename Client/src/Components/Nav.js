import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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

const Submenu = ({ isOpen ,wasOpen}) => {
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
        <div className='hidden lg:flex bg-gradient-to-r  from-[#012f66] to-[#0568a1] items-center justify-between text-center p-4 shadow-lg'>
        
            <NavLink className="block mt-2 hover:text-black mx-auto " style={isHovered[0] ? { ...submenu, ...boxStylemenuHover } : submenu}
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={() => handleMouseLeave(0)} to="/Main">Add Complaint</NavLink>
       
         
            <NavLink className="block mt-2 hover:text-black mx-auto" style={isHovered[1] ? { ...submenu, ...boxStylemenuHover } : submenu}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={() => handleMouseLeave(1)}>Delete Complaint</NavLink>
        

            <NavLink className="block mt-2 hover:text-black mx-auto" style={isHovered[2] ? { ...submenu, ...boxStylemenuHover } : submenu}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={() => handleMouseLeave(2)}>Modify Complaint</NavLink>
        
        </div>
      )}
      {/* Add a dropdown menu for smaller screens */}
      {wasOpen && (
        <div className='lg:hidden'>
          <div className='p-4 bg-blue-500 shadow-lg'>
            <NavLink className="block mt-2 hover:text-black" style={submenu} to="/Main">Add Complaint</NavLink>
            <NavLink className="block mt-2 hover:text-black" style={submenu}>Delete Complaint</NavLink>
            <NavLink className="block mt-2 hover:text-black" style={submenu}>Modify Complaint</NavLink>
          </div>
        </div>
      )}
    </>
  );
};

const NavLinks = ({ isOpen, toggleNavUser }) => {
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
      await Axios.get('http://localhost:3002')
        .then((res) => {
          setRole(res.data[0].role);
        });
    };
    userRole();
  }, []);

  if (role === "General") {
    return (
      <>
        <NavLink className="relative text-2xl px-4" style={isHovered[3] ? { ...navstyle, ...boxStyleHover } : navstyle}
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={() => handleMouseLeave(3)}
          onClick={toggleNavUser}
          >
          Lodge Complaint
        </NavLink>
        <NavLink style={isHovered[4] ? { ...navstyle, ...boxStyleHover } : navstyle}
          onMouseEnter={() => handleMouseEnter(4)}
          onMouseLeave={() => handleMouseLeave(4)}
          className="hover:text-black text-2xl px-4" to="/Summary">Summary</NavLink>
        <NavLink style={isHovered[5] ? { ...navstyle, ...boxStyleHover } : navstyle}
          onMouseEnter={() => handleMouseEnter(5)}
          onMouseLeave={() => handleMouseLeave(5)}
          className="hover:text-black text-2xl px-4" to="/Profile">Profile</NavLink>
      </>
    );
  } else {
    return (
      <>
        <NavLink style={isHovered[0] ? { ...navstyle, ...boxStyleHover } : navstyle}
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={() => handleMouseLeave(0)}
          className="hover:text-black text-2xl px-4" to="/Feedbacks">Feedbacks</NavLink>
        <NavLink style={isHovered[1] ? { ...navstyle, ...boxStyleHover } : navstyle}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={() => handleMouseLeave(1)}
          className="hover:text-black text-2xl px-4" to="/Summary">Summary</NavLink>
        <NavLink style={isHovered[2] ? { ...navstyle, ...boxStyleHover } : navstyle}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={() => handleMouseLeave(2)}
          className="hover:text-black text-2xl px-4" to="/Profile">Profile</NavLink>
      </>
    );
  }
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavUser = () => {
    setIsOpen(!isOpen);
    
  };
  const [wasOpen, setWasOpen] = useState(false);

  const toggleNaviUser = () => {
    setWasOpen(!wasOpen);
    
  };


  return (
    <>
      <header className='bg-gradient-to-r from-[#012f66] to-[#0568a1] sticky top-0 z-[20] items-center justify-between p-8 flex-wrap mx-auto flex w-full'>
        <div className=''>
          <img className="m-0 md:object-none hidden sm:block " src='/Images/drdo_logo.png' alt='logo' />
        </div>
        <nav className='flex w-auto justify-end'>
          <div></div>
          <div className='hidden lg:flex w-full justify-end'>
            <NavLinks  isOpen={isOpen} toggleNavUser={toggleNavUser}/>
          </div>
          <div className='lg:hidden'>
            <button onClick={toggleNaviUser}>
              {wasOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
        {wasOpen && (
          <div className='flex flex-col items-center basis-full'>
            <NavLinks  />
          </div>
        )}
      </header>
      <Submenu isOpen={isOpen} />
    </>
  );
};

export default Nav;