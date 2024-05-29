import { Link } from "react-router-dom";
import medicalLogo from "../../assets/images/Fatima Specialist Hospital only EMBLEM with No background Big.png"
import medicalPattern from "../../assets/images/demo-medical-logo-white.png"
import logoEmblem from "../../assets/images/Fatima Specialist Hospital No background small.png"




const Footer = () => {

    return ( 
    
      <footer className="p-0">
        
      <div className="footer-top bg-dark-gray pt-35px pb-35px border-radius-6px lg-no-border-radius position-relative overflow-hidden">
          <div className="position-absolute right-minus-100px bottom-minus-80px margin-100px-top opacity-1 w-250px"><img src={medicalPattern} alt="" className=""/></div>
          <div className="container">
              <div className="row align-items-center">
                  {/* <!-- start footer column --> */}
                  <div className="col-xl-3 col-sm-6 order-1 text-center text-sm-start xs-mb-20px">
                      <Link href="demo-medical.html" className="footer-logo d-inline-block"><img src={medicalLogo} data-at2x={logoEmblem} alt=""/></Link>
                  </div>
                  {/* <!-- end footer column -->
                  <!-- start footer column --> */}
                  <div className="col-xl-6 order-3 order-xl-2 lg-mt-10px">
                      <ul className="footer-navbar text-center lh-normal">  
                          <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                          <li className="nav-item"><Link to="about" className="nav-link">About</Link></li>
                          <li className="nav-item"><Link to="treatments" className="nav-link">Treatments</Link></li>
                          <li className="nav-item"><Link to="doctors" className="nav-link">Doctors</Link></li>
                          <li className="nav-item"><Link to="contacts" className="nav-link">Contact</Link></li>
                      </ul>
                  </div>
                  {/* <!-- end footer column -->
                  <!-- start footer column --> */}
                  <div className="col-xl-3 col-sm-6 position-relative text-center text-sm-end elements-social social-icon-style-08 order-2 order-xl-3">
                      <ul className="small-icon light">
                          <li><Link className="facebook" href="#" target="_blank"><i className="fa-brands fa-facebook-f"></i></Link></li>
                          <li><Link className="instagram" href="#" target="_blank"><i className="fa-brands fa-instagram"></i></Link></li>  
                          <li><Link className="twitter" href="#" target="_blank"><i className="fa-brands fa-twitter"></i></Link></li> 
                        
                      </ul>
                  </div>
                  {/* <!-- end footer column --> */}
              </div>
          </div>
      </div>
      <div className="container">
          <div className="row row-cols-1 row-cols-md-2 align-items-center pt-30px pb-30px">
              {/* <!-- start copyright --> */}
              <div className="col last-paragraph-no-margin fs-15 text-center text-md-start sm-mb-10px">
                  <p>&copy; 2024   Proudly Powered by Listacc Ltd. </p>
              </div>
              {/* <!-- end copyright -->
              <!-- start footer menu --> */}
              <div className="col  fs-15 text-center text-md-end">
                  <ul className="footer-navbar lh-normal"> 
                      <li className="me-35px sm-me-20px"><Link href="#">Terms and conditions</Link></li>
                      <li><Link href="#">Privacy policy</Link></li>
                  </ul>
              </div>
              {/* <!-- end footer menu --> */}
          </div>
      </div>        
  </footer>
    
      );
}
 
export default Footer;