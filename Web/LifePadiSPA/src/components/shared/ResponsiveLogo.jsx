import  { useEffect, useState } from 'react';
import logoDark from "../../assets/images/Logo+name (dark).svg";
import logoLight from "../../assets/images/Logo+name (light).svg";
import logoSmallDark from "../../assets/images/Logo(dark).svg"
import logoSmallLight from "../../assets/images/Logo (light).svg"
import { Link } from 'react-router-dom';

const ResponsiveLogo = () => {
    //const [logoSrc, setLogoSrc] = useState(logoLight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isDarkMode, setIsDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleDarkModeChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);
    
    // Cleanup event listeners
    return () => {
      window.removeEventListener('resize', handleResize);
      darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
    };
  }, []);

  let logoSrc = logoLight;
  if (isDarkMode) {
    logoSrc = logoDark;
  }

  if (windowWidth <= 768) {
    logoSrc = isDarkMode ? logoSmallLight : logoSmallDark;
  } else {
    logoSrc = isDarkMode ? logoLight : logoDark;
  }

  return (
    <div className="flex justify-center w-14 h-14 md:w-44 min-w-20 ">
        <Link to="/">
        <img src={logoSrc} alt="Logo" className=" h-full w-full max-w-44 mx-auto" />

        </Link>
    </div>
  );
};

export default ResponsiveLogo;
