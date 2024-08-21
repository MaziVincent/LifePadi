// import "../../assets/css/vendors.min.css";
// import "../../assets/css/icon.min.css";
// import "../../assets/css/style.css";
// import "../../assets/css/responsive.css";
// import "../../assets/css/seo-agency.css";
import agencyBg from "../../assets/images/seo/demo-seo-agency-bg.jpg"
import bottomBg from "../../assets/images/seo/demo-seo-agency-bottom-bg.png"
import vlBg from "../../assets/images/seo/demo-seo-agency-vertical-line-bg.svg"
import bg02 from "../../assets/images/seo/demo-seo-agency-bg-02.jpg"
import anaBg from "../../assets/images/seo/demo-seo-agency-analysis-bg.png"
import vlBgMed from "../../assets/images/seo/vertical-line-bg-medium-gray.svg"

const Prof = () => {
  return (
    <>
      <section
        className="cover-background position-relative ipad-top-space-margin"
        style={{ backgroundImage: `url(${agencyBg})` }}
      >
        <div
          className="background-position-left-top h-100 w-100 position-absolute left-0px top-0"
          style={{ backgroundImage: `url(${vlBgMed})` }}        ></div>
        <div
          className="background-position-center-bottom background-size-100 background-no-repeat position-absolute bottom-0 left-0px w-100 h-400px lg-h-170px z-index-1"
          style={{ backgroundImage: `url(${bottomBg})` }}        ></div>
        <div
          id="particles-style-01"
          className="h-100 position-absolute left-0px top-0 w-100"
          data-particle="true"
          data-particle-options='{"particles": {"number": {"value": 1.1,"density": {"enable": true,"value_area": 900}},"shape": {"type": ["image"],"image":{"src":"images/particles-demo-4-bg.png","width":180,"height":100}},"opacity": {"value": 0.5,"random": false,"anim": {"enable": false,"speed": 1,"sync": false}},"size": {"value": 120,"random": true,"anim": {"enable": false,"sync": true}},"line_linked":{"enable":false,"distance":0,"color":"#ffffff","opacity":0.4,"width":1},"move": {"enable": true,"speed":1,"direction": "right","random": false,"straight": false}},"interactivity": {"detect_on": "canvas","events": {"onhover": {"enable": false,"mode": "repulse"},"onclick": {"enable": false,"mode": "push"},"resize": true}},"retina_detect": false}'
        ></div>
        <div className="container position-relative pb-2">
          <div className="row align-items-center text-center text-md-start justify-content-sm-center">
            <div className="col-md-6 col-sm-9 position-relative z-index-1 text-dark-gray md-mb-35px">
              <div
                className="alt-font fs-110 md-fs-100 fw-300 lh-85 ls-minus-2px mb-15px fancy-text-style-4"
                data-anime='{ "el": "childs", "opacity": [0, 1], "rotateY": [-90, 0], "rotateZ": [-10, 0], "translateY": [80, 0], "translateZ": [50, 0], "staggervalue": 200, "duration": 900, "easing": "easeOutCirc" }'
              >
                <span className="d-inline-block">Organic</span>
                <span
                  className="fw-700 fs-150 md-fs-120 ls-minus-5px d-inline-block"
                  data-fancy-text='{ "effect": "rubber-band", "string": ["search", "results"] }'
                ></span>
              </div>
              <div data-anime='{ "opacity": [0, 1], "rotateY": [-90, 0], "rotateZ": [-10, 0], "translateY": [80, 0], "translateZ": [50, 0], "duration": 900, "delay": 500, "easing": "easeOutCirc" }'>
                <span className="alt-font fs-20 fw-500 w-70 lg-w-85 sm-w-100 mb-40px md-mb-30px d-block opacity-7">
                  We offer flexible pricing plans so that our clients can take
                  advantage of services.
                </span>
              </div>
              <a
                href="index.html"
                className="btn btn-extra-large btn-rounded with-rounded btn-gradient-orange-sky-blue btn-box-shadow box-shadow-extra-large"
                data-anime='{ "opacity": [0, 1], "rotateY": [-90, 0], "rotateZ": [-10, 0], "translateY": [80, 0], "translateZ": [50, 0], "duration": 900, "delay": 800, "easing": "easeOutCirc" }'
              >
                Get free analysis
                <span className="bg-white text-base-color">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </a>
            </div>
            <div
              className="col-md-6 text-center"
              data-anime='{ "opacity": [0, 1], "translateY": [150, 0], "duration": 2000, "easing": "easeOutBack" }'
            >
              <img
                src="https://via.placeholder.com/550x783"
                alt=""
                className="animation-float"
              />
            </div>
          </div>
          <div
            className="position-absolute bottom-minus-90px md-bottom-minus-70px sm-bottom-minus-50px right-30px sm-right-10px z-index-9"
            data-anime='{ "opacity": [0, 1], "scale": [0, 1], "translateZ": [50, 0], "staggervalue": 200, "duration": 900, "delay": 800, "easing": "easeOutCirc" }'
          >
            <img
              src="https://via.placeholder.com/233x237"
              alt=""
              className="md-w-180px xs-w-150px"
            />
          </div>
        </div>
      </section>
      <section
        className="background-position-center-top pb-0 pt-4 sm-pt-40px"
        style={{ backgroundImage: `url(${vlBg})` }}      >
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div
              className="col-xl-7 col-lg-8 col-md-10 text-center"
              data-anime='{ "translateY": [50, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <h2 className="fw-600 text-dark-gray alt-font ls-minus-1px">
                Social marketing services
              </h2>
            </div>
          </div>
          <div
            className="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 justify-content-center"
            data-anime='{ "el": "childs", "rotateZ": [5, 0], "translateY": [30, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 200, "easing": "easeOutQuad" }'
          >
            <div className="col icon-with-text-style-03 lg-mb-50px xs-mb-40px transition-inner-all">
              <div className="feature-box ps-7 pe-7 sm-ps-4 sm-pe-4">
                <div className="feature-box-icon mb-30px sm-mb-20px">
                  <img
                    className="h-65px"
                    src="images/demo-seo-agency-icon-03.svg"
                    alt=""
                  />
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="d-inline-block alt-font fw-700 text-dark-gray mb-5px fs-20">
                    Real time analytics
                  </span>
                  <p>We deliver email marketing campaigns to your audience.</p>
                </div>
              </div>
            </div>
            <div className="col icon-with-text-style-03 lg-mb-50px xs-mb-40px transition-inner-all">
              <div className="feature-box ps-7 pe-7 sm-ps-4 sm-pe-4">
                <div className="feature-box-icon mb-30px sm-mb-20px">
                  <img
                    className="h-65px"
                    src="images/demo-seo-agency-icon-01.svg"
                    alt=""
                  />
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="d-inline-block alt-font fw-700 text-dark-gray mb-5px fs-20">
                    Keywords analytics
                  </span>
                  <p>We also help our clients with social media strategy.</p>
                </div>
              </div>
            </div>
            <div className="col icon-with-text-style-03 xs-mb-40px transition-inner-all">
              <div className="feature-box ps-7 pe-7 sm-ps-4 sm-pe-4">
                <div className="feature-box-icon mb-30px sm-mb-20px">
                  <img
                    className="h-65px"
                    src="images/demo-seo-agency-icon-04.svg"
                    alt=""
                  />
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="d-inline-block alt-font fw-700 text-dark-gray mb-5px fs-20">
                    SEO optimization
                  </span>
                  <p>
                    We believe in challenges and so we have made challenges.
                  </p>
                </div>
              </div>
            </div>
            <div className="col icon-with-text-style-03">
              <div className="feature-box ps-7 pe-7 sm-ps-4 sm-pe-4">
                <div className="feature-box-icon mb-30px sm-mb-20px">
                  <img
                    className="h-65px"
                    src="images/demo-seo-agency-icon-02.svg"
                    alt=""
                  />
                </div>
                <div className="feature-box-content last-paragraph-no-margin">
                  <span className="d-inline-block alt-font fw-700 text-dark-gray mb-5px fs-20">
                    Boost performance
                  </span>
                  <p>Team delivers incomparable quality with designing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="position-relative background-position-center-top half-section xs-ps-15px xs-pe-15px overflow-hidden"
        style={{ backgroundImage: `url(${vlBgMed})` }}      >
        <div
          id="particles-style-02"
          className="h-100 position-absolute left-0px top-0 z-index-minus-1 w-100"
          data-particle="true"
          data-particle-options='{"particles": {"number": {"value":8,"density": {"enable": true,"value_area": 4000}},"shape": {"type": ["image"],"image":{"src":"images/demo-seo-agency-particles-img.png","width":220,"height":134}},"opacity": {"value": 0.5,"random": false,"anim": {"enable": false,"speed": 1,"sync": false}},"size": {"value": 120,"random": true,"anim": {"enable": false,"sync": true}},"line_linked":{"enable":false,"distance":0,"color":"#ffffff","opacity":0.4,"width":1},"move": {"enable": true,"speed":1,"direction": "right","random": false,"straight": false}},"interactivity": {"detect_on": "canvas","events": {"onhover": {"enable": false,"mode": "repulse"},"onclick": {"enable": false,"mode": "push"},"resize": true}},"retina_detect": false}'
        ></div>
        <div
          className="container bg-white border-radius-6px box-shadow-double-large"
          data-bottom-top="transform:scale(1, 1) translateX(20px);"
          data-top-bottom="transform:scale(1, 1) translateX(-20px);"
        >
          <div className="row row-cols-1 row-cols-lg-3 row-cols-sm-2 align-items-center pt-50px pb-50px ps-30px pe-30px justify-content-center">
            <div className="col md-mb-40px alt-font text-dark-gray fw-600">
              <div className="d-flex flex-column flex-md-row justify-content-center align-items-center g-0 text-center text-md-start">
                <div className="flex-shrink-0 me-15px sm-me-0">
                  <h2 className="mb-0">
                    99<sup className="fs-30">%</sup>
                  </h2>
                </div>
                <div>
                  <span className="fs-18 lh-26 d-block">
                    Track and analyze <br />
                    business reports.
                  </span>
                </div>
              </div>
            </div>
            <div className="col md-mb-40px alt-font text-dark-gray fw-600">
              <div className="d-flex flex-column flex-md-row justify-content-center align-items-center g-0 text-center text-md-start">
                <div className="flex-shrink-0 me-15px sm-me-0">
                  <h2 className="mb-0">4.98</h2>
                </div>
                <div>
                  <div className="review-star-icon fs-20 lh-34 text-gradient-orange-sky-blue">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <span className="d-block fs-18 lh-20">Best rated agency</span>
                </div>
              </div>
            </div>
            <div className="col alt-font text-dark-gray fw-600">
              <div className="d-flex flex-column flex-md-row justify-content-center align-items-center g-0 text-center text-md-start">
                <div className="flex-shrink-0 me-15px sm-me-0">
                  <h2 className="mb-0">
                    98<sup className="fs-30">%</sup>
                  </h2>
                </div>
                <div>
                  <span className="fs-18 lh-26 d-block">
                    Genuine repeated <br />
                    happy customers.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="background-position-center-top pt-0"
        style={{ backgroundImage: `url(${vlBgMed})` }}      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 d-block d-sm-flex align-items-center text-center text-sm-start justify-content-center fs-22 alt-font mb-7">
              <div className="me-5px xs-ms-10px d-inline-block align-middle">
                <i className="fa-regular fa-heart text-red"></i>
              </div>
              <div className="d-inline-block align-middle">
                Join the{" "}
                <span className="fw-800 text-dark-gray text-decoration-line-bottom-medium">
                  10000+
                </span>{" "}
                companies trusting our agency.
              </div>
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <div
              className="col-md-6 animation-float sm-mb-50px"
              data-anime='{ "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <img
                src="https://via.placeholder.com/580x535"
                alt=""
              />
            </div>
            <div
              className="col-lg-5 offset-lg-1 col-md-6 text-center text-md-start"
              data-anime='{ "el": "childs", "willchange": "transform", "opacity": [0, 1], "rotateY": [-90, 0], "rotateZ": [-10, 0], "translateY": [80, 0], "translateZ": [50, 0], "staggervalue": 200, "duration": 600, "delay": 100, "easing": "easeOutCirc" }'
            >
              <span className="ps-20px pe-20px mb-25px md-mb-20px text-uppercase text-dark-gray fs-13 lh-40 md-lh-50 ls-1px alt-font fw-700 border-radius-4px bg-gradient-chablis-red-quartz-white d-inline-block">
                Working process
              </span>
              <h2 className="alt-font text-dark-gray fw-600 ls-minus-1px">
                Simple working process to start.
              </h2>
              <p className="w-80 xl-w-85 lg-w-90 md-w-100 mb-20px">
                We are committed to deliver unique digital media solutions from
                web development to eCommerce solutions for our happy clients by
                using our knowledge and expertise.
              </p>
              <a
                href="demo-seo-agency-process.html"
                className="btn btn-link btn-hover-animation-switch btn-large text-dark-gray fw-700"
              >
                <span>
                  <span className="btn-text">learn more</span>
                  <span className="btn-icon">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  <span className="btn-icon">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section
        className="background-position-center-bottom background-size-100 background-no-repeat bg-base-color"
        style={{ backgroundImage: `url(${anaBg})` }}
        data-anime='{ "translate": [0, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
      >
        <div className="container-fluid d-none d-md-block">
          <div className="row">
            <div className="p-0 overlap-section text-end pe-4 md-pe-5">
              <img
                src="images/demo-seo-agency-08.png"
                alt=""
                className="animation-rotation lg-w-150px"
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center mb-1">
            <div className="col-12 text-center">
              <h2 className="fw-600 alt-font text-white ls-minus-1px">
                Receive your free SEO analysis?
              </h2>
            </div>
          </div>
          <div className="row contact-form-style-06 position-relative justify-content-center pb-12">
            <div className="col-xl-10">
              <form
                action="email-templates/contact-form.php"
                method="post"
                className="row justify-content-center"
              >
                <div className="col-md-5 sm-mb-25px">
                  <input
                    className="border-color-transparent-white-very-light input-medium bg-transparent ps-35px border-radius-100px fw-300 placeholder-light form-control required"
                    type="url"
                    name="url"
                    placeholder="Enter your website URL.."
                  />
                </div>
                <div className="col-md-5 sm-mb-25px">
                  <input
                    className="border-color-transparent-white-very-light input-medium bg-transparent ps-35px border-radius-100px fw-300 placeholder-light form-control required"
                    type="email"
                    name="email"
                    placeholder="Enter your email..."
                  />
                </div>
                <div className="col-12 col-md-auto">
                  <button
                    type="submit"
                    aria-label="submit"
                    className="btn bg-white text-base-color p-0 btn-rounded submit w-65px h-65px sm-w-100"
                  >
                    <i className="fa-solid fa-arrow-right ms-0 icon-small"></i>
                  </button>
                </div>
                <div className="col-12 col-md-10 form-results border-radius-4px mt-15px lh-normal pt-10px pb-10px ps-15px pe-15px fs-16 text-center d-none"></div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section
        className="background-position-center-top pt-4 md-pt-6 sm-pt-40px"
        style={{ backgroundImage: `url(${vlBg})` }}      >
        <div className="container">
          <div className="row mb-8 md-mb-10">
            <div className="col-12 tab-style-04">
              <ul className="nav nav-tabs border-0 justify-content-center fw-500 fs-19 mb-4 md-mb-6 sm-mb-5px alt-font">
                <li className="nav-item">
                  <a
                    data-bs-toggle="tab"
                    href="#tab_five1"
                    className="nav-link active"
                  >
                    Keyword research
                    <span className="tab-border bg-dark-gray"></span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#tab_five2"
                  >
                    Target analysis<span className="tab-border bg-dark-gray"></span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#tab_five3"
                  >
                    Social marketing
                    <span className="tab-border bg-dark-gray"></span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#tab_five4"
                  >
                    Email campaign<span className="tab-border bg-dark-gray"></span>
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  className="tab-pane fade in active show"
                  id="tab_five1"
                >
                  <div className="row align-items-center justify-content-center">
                    <div
                      className="col-lg-7 col-md-6 sm-mb-30px"
                      data-anime='{ "opacity": [0, 1], "staggervalue": 200, "duration": 600, "delay": 0, "easing": "easeOutCirc" }'
                    >
                      <img
                        src="https://via.placeholder.com/682x510"
                        alt=""
                      />
                    </div>
                    <div
                      className="col-lg-5 col-md-6 ps-8 lg-ps-3 sm-ps-15px text-center text-md-start"
                      data-anime='{ "el": "childs", "willchange": "transform", "opacity": [0, 1], "rotateY": [-90, 0], "rotateZ": [-10, 0], "translateY": [80, 0], "translateZ": [50, 0], "staggervalue": 200, "duration": 600, "delay": 100, "easing": "easeOutCirc" }'
                    >
                      <span className="ps-20px pe-20px mb-30px md-mb-20px text-uppercase text-dark-gray fs-13 lh-40 md-lh-50 ls-1px alt-font fw-700 border-radius-4px bg-gradient-chablis-red-quartz-white d-inline-block">
                        Keyword research
                      </span>
                      <h2 className="alt-font text-dark-gray fw-600 ls-minus-1px">
                        Keywords lead to customers.
                      </h2>
                      <p className="w-80 xl-w-90 md-w-100">
                        We are committed to deliver unique digital media
                        solutions from web design to eCommerce solutions for our
                        clients by using our knowledge and expertise.
                      </p>
                      <a
                        href="demo-seo-agency-what-we-do.html"
                        className="btn btn-link btn-hover-animation-switch btn-large text-dark-gray fw-700"
                      >
                        <span>
                          <span className="btn-text">learn more</span>
                          <span className="btn-icon">
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>
                          <span className="btn-icon">
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade in"
                  id="tab_five2"
                >
                  <div className="row align-items-center justify-content-center">
                    <div className="col-lg-7 col-md-6 sm-mb-30px">
                      <img
                        src="https://via.placeholder.com/682x510"
                        alt=""
                      />
                    </div>
                    <div className="col-lg-5 col-md-6 ps-8 lg-ps-3 sm-ps-15px text-center text-md-start">
                      <span className="ps-20px pe-20px mb-30px md-mb-20px text-uppercase text-dark-gray fs-13 lh-40 md-lh-50 ls-1px alt-font fw-700 border-radius-4px bg-gradient-chablis-red-quartz-white d-inline-block">
                        Target analysis
                      </span>
                      <h2 className="alt-font text-dark-gray fw-600 ls-minus-1px">
                        Power your online visibility.
                      </h2>
                      <p className="w-80 xl-w-90 md-w-100">
                        We are committed to deliver unique digital media
                        solutions from web design to eCommerce solutions for our
                        clients by using our knowledge and expertise.
                      </p>
                      <a
                        href="demo-seo-agency-what-we-do.html"
                        className="btn btn-link btn-hover-animation-switch btn-large text-dark-gray fw-700"
                      >
                        <span>
                          <span className="btn-text">learn more</span>
                          <span className="btn-icon">
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>
                          <span className="btn-icon">
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade in"
                  id="tab_five3"
                >
                  <div className="row align-items-center justify-content-center">
                    <div className="col-lg-7 col-md-6 sm-mb-30px">
                      <img
                        src="https://via.placeholder.com/682x510"
                        alt=""
                      />
                    </div>
                    <div className="col-lg-5 col-md-6 ps-8 lg-ps-3 sm-ps-15px text-center text-md-start">
                      <span className="ps-20px pe-20px mb-30px md-mb-20px text-uppercase text-dark-gray fs-13 lh-40 md-lh-50 ls-1px alt-font fw-700 border-radius-4px bg-gradient-chablis-red-quartz-white d-inline-block">
                        Social marketing
                      </span>
                      <h2 className="alt-font text-dark-gray fw-600 ls-minus-1px">
                        Brand identity and strategy.
                      </h2>
                      <p className="w-80 xl-w-90 md-w-100">
                        We are committed to deliver unique digital media
                        solutions from web design to eCommerce solutions for our
                        clients by using our knowledge and expertise.
                      </p>
                      <a
                        href="demo-seo-agency-what-we-do.html"
                        className="btn btn-link btn-hover-animation-switch btn-large text-dark-gray fw-700"
                      >
                        <span>
                          <span className="btn-text">learn more</span>
                          <span className="btn-icon">
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>
                          <span className="btn-icon">
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade in"
                  id="tab_five4"
                >
                  <div className="row align-items-center justify-content-center">
                    <div className="col-lg-7 col-md-6 sm-mb-30px">
                      <img
                        src="https://via.placeholder.com/682x510"
                        alt=""
                      />
                    </div>
                    <div className="col-lg-5 col-md-6 ps-8 lg-ps-3 sm-ps-15px text-center text-md-start">
                      <span className="ps-20px pe-20px mb-30px md-mb-20px text-uppercase text-dark-gray fs-13 lh-40 md-lh-50 ls-1px alt-font fw-700 border-radius-4px bg-gradient-chablis-red-quartz-white d-inline-block">
                        Email marketing
                      </span>
                      <h2 className="alt-font text-dark-gray fw-600 ls-minus-1px">
                        Tailor-made email campaign.
                      </h2>
                      <p className="w-80 xl-w-90 md-w-100">
                        We are committed to deliver unique digital media
                        solutions from web design to eCommerce solutions for our
                        clients by using our knowledge and expertise.
                      </p>
                      <a
                        href="demo-seo-agency-what-we-do.html"
                        className="btn btn-link btn-hover-animation-switch btn-large text-dark-gray fw-700"
                      >
                        <span>
                          <span className="btn-text">learn more</span>
                          <span className="btn-icon">
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>
                          <span className="btn-icon">
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mb-4">
            <div
              className="col-xl-7 col-lg-8 col-md-10 text-center"
              data-anime='{ "translateY": [50, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <h2 className="text-dark-gray fw-600 alt-font ls-minus-1px">
                Choose the best package your business needs
              </h2>
            </div>
          </div>
          <div
            className="row align-items-center justify-content-center pricing-table-style-06"
            data-anime='{ "el": "childs", "willchange": "transform", "scale": [0.95, 1], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
          >
            <div className="col-lg-4 col-md-8 md-mb-30px">
              <div className="bg-white box-shadow-quadruple-large border-radius-6px p-18 lg-p-13 text-center">
                <h6 className="text-dark-gray fw-600 alt-font mb-0">Standard</h6>
                <span className="mb-20px d-inline-block">Unlimited users</span>
                <div className="row align-items-center">
                  <div className="col-sm-5 pe-sm-0">
                    <h2 className="text-dark-gray mb-0 alt-font fw-600 ls-minus-2px text-center text-sm-end">
                      <sup className="fs-28">$</sup>22
                    </h2>
                  </div>
                  <div className="col-lg-7 col-sm-5 text-center text-sm-start last-paragraph-no-margin fs-15 lh-24">
                    <p>per user/month billed annually</p>
                  </div>
                </div>
                <ul className="p-0 mt-20px mb-30px list-style-01 text-start lh-normal">
                  <li className="border-color-extra-medium-gray pt-20px pb-20px text-dark-gray d-flex">
                    <i className="feather icon-feather-check fs-20 text-green me-10px"></i>
                    Marketing strategy
                  </li>
                  <li className="border-color-extra-medium-gray pt-20px pb-20px text-dark-gray d-flex">
                    <i className="feather icon-feather-check fs-20 text-green me-10px"></i>
                    Competitive work analysis
                  </li>
                  <li className="border-color-extra-medium-gray pt-20px pb-20px opacity-6 d-flex">
                    <i className="feather icon-feather-x fs-20 text-red me-10px"></i>
                    Social media share audit
                  </li>
                  <li className="border-color-extra-medium-gray pt-20px pb-20px opacity-6 d-flex">
                    <i className="feather icon-feather-x fs-20 text-red me-10px"></i>
                    Monthly management
                  </li>
                </ul>
                <div className="pricing-footer w-100">
                  <a
                    href="demo-seo-agency-pricing.html"
                    className="btn btn-medium btn-dark-gray btn-round-edge w-100 btn-box-shadow"
                  >
                    Choose package
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- end pricing item -->
                    <!-- start pricing item --> */}
            <div className="col-lg-4 col-md-8 md-mb-30px">
              <div className="bg-white box-shadow-quadruple-large border-radius-6px p-18 lg-p-13 text-center">
                <span className="ps-15px pe-15px mb-20px text-uppercase text-base-color fs-12 lh-26 alt-font fw-700 border-radius-4px box-shadow-large border border-1 border-color-extra-medium-gray d-inline-block">
                  popular{" "}
                </span>
                <h6 className="text-dark-gray fw-600 alt-font mb-0">Business</h6>
                <span className="mb-20px d-inline-block">Unlimited users</span>
                <div className="row align-items-center">
                  <div className="col-sm-5 pe-sm-0">
                    <h2 className="text-dark-gray mb-0 alt-font fw-600 ls-minus-2px text-center text-sm-end">
                      <sup className="fs-28">$</sup>33
                    </h2>
                  </div>
                  <div className="col-lg-7 col-sm-5 text-center text-sm-start last-paragraph-no-margin fs-15 lh-24">
                    <p>per user/month billed annually</p>
                  </div>
                </div>
                <ul className="p-0 mt-20px mb-30px list-style-01 text-start lh-normal">
                  <li className="border-color-extra-medium-gray pt-20px pb-20px text-dark-gray d-flex">
                    <i className="feather icon-feather-check fs-20 text-green me-10px"></i>
                    Marketing strategy
                  </li>
                  <li className="border-color-extra-medium-gray pt-20px pb-20px text-dark-gray d-flex">
                    <i className="feather icon-feather-check fs-20 text-green me-10px"></i>
                    Competitive work analysis
                  </li>
                  <li className="border-color-extra-medium-gray pt-20px pb-20px text-dark-gray d-flex">
                    <i className="feather icon-feather-check fs-20 text-green me-10px"></i>
                    Social media share audit
                  </li>
                  <li className="border-color-extra-medium-gray pt-20px pb-20px opacity-5 d-flex">
                    <i className="feather icon-feather-x fs-20 text-red me-10px"></i>
                    Monthly management
                  </li>
                </ul>
                <div className="pricing-footer w-100">
                  <a
                    href="demo-seo-agency-pricing.html"
                    className="btn btn-medium btn-base-color btn-round-edge w-100 btn-box-shadow"
                  >
                    Choose package
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-8">
              <div className="bg-white box-shadow-quadruple-large border-radius-6px p-18 lg-p-13 text-center">
                <h6 className="text-dark-gray fw-600 alt-font mb-0">Ultimate</h6>
                <span className="mb-20px d-inline-block">Unlimited users</span>
                <div className="row align-items-center">
                  <div className="col-sm-5 pe-sm-0">
                    <h2 className="text-dark-gray mb-0 alt-font fw-600 ls-minus-2px text-center text-sm-end">
                      <sup className="fs-28">$</sup>44
                    </h2>
                  </div>
                  <div className="col-lg-7 col-sm-5 text-center text-sm-start last-paragraph-no-margin fs-15 lh-24">
                    <p>per user/month billed annually</p>
                  </div>
                </div>
                <ul className="p-0 mt-20px mb-30px list-style-01 text-start lh-normal">
                  <li className="border-color-extra-medium-gray pt-20px pb-20px text-dark-gray d-flex">
                    <i className="feather icon-feather-check fs-20 text-green me-10px"></i>
                    Marketing strategy
                  </li>
                  <li className="border-color-extra-medium-gray pt-20px pb-20px text-dark-gray d-flex">
                    <i className="feather icon-feather-check fs-20 text-green me-10px"></i>
                    Competitive work analysis
                  </li>
                  <li className="border-color-extra-medium-gray pt-20px pb-20px text-dark-gray d-flex">
                    <i className="feather icon-feather-check fs-20 text-green me-10px"></i>
                    Social media share audit
                  </li>
                  <li className="border-color-extra-medium-gray pt-20px pb-20px text-dark-gray d-flex">
                    <i className="feather icon-feather-check fs-20 text-green me-10px"></i>
                    Monthly management
                  </li>
                </ul>
                <div className="pricing-footer w-100">
                  <a
                    href="demo-seo-agency-pricing.html"
                    className="btn btn-medium btn-dark-gray btn-round-edge w-100 btn-box-shadow"
                  >
                    Choose package
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="cover-background"
        style={{ backgroundImage: `url(${bg02})` }}
      >
        <div className="container">
          <div
            className="row justify-content-center text-center text-lg-start"
            data-anime='{ "el": "childs", "translateY": [0, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
          >
            <div className="col-lg-6 col-md-9 md-mb-35px">
              <span className="ps-20px pe-20px mb-25px text-uppercase text-dark-gray fs-13 lh-40 md-lh-50 ls-1px alt-font fw-700 border-radius-4px bg-white d-inline-block">
                Satisfied clients
              </span>
              <h2 className="alt-font text-dark-gray fw-600 ls-minus-1px mb-30px">
                What our clients are saying about us?
              </h2>
              <div className="d-flex justify-content-center justify-content-lg-start">
                <div className="slider-one-slide-prev-1 text-dark-gray swiper-button-prev slider-navigation-style-04 border border-1 border-color-transparent-dark-very-light">
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div className="slider-one-slide-next-1 text-dark-gray swiper-button-next slider-navigation-style-04 border border-1 border-color-transparent-dark-very-light">
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-10">
              <div
                className="swiper slider-one-slide magic-cursor"
                data-slider-options='{ "slidesPerView": 1, "loop": true, "autoplay": { "delay": 4000, "disableOnInteraction": false }, "navigation": { "nextEl": ".slider-one-slide-next-1", "prevEl": ".slider-one-slide-prev-1" }, "keyboard": { "enabled": true, "onlyInViewport": true }, "effect": "slide" }'
              >
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <span className="d-inline-block fs-22 lh-36 w-90 lg-w-100 mb-20px text-dark-gray">
                      This theme has a wide variety of options and a really good
                      customer support. Some of the customizations are unlimited
                      but even so the theme still gives a lot of features while
                      prioritizing web speed.
                    </span>
                    <div className="mt-5px">
                      <div className="rounded-circle bg-white rounded-circle w-100px h-100px d-inline-block align-middle overflow-hidden me-20px">
                        <img
                          src="https://via.placeholder.com/100x101"
                          alt=""
                        />
                      </div>
                      <div className="d-inline-block align-middle text-start">
                        <div className="text-dark-gray fs-20 fw-600 alt-font">
                          Herman miller
                        </div>
                        <div className="lh-30">Chief financial</div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <span className="d-inline-block fs-22 lh-36 w-90 lg-w-100 mb-20px text-dark-gray">
                      Their team are easy to work with and helped me make
                      amazing websites in a short amount of time. Thanks guys
                      for all your hard work. This is an excellent theme!
                    </span>
                    <div className="mt-5px">
                      <div className="rounded-circle bg-white rounded-circle w-100px h-100px d-inline-block align-middle overflow-hidden me-20px">
                        <img
                          src="https://via.placeholder.com/100x101"
                          alt=""
                        />
                      </div>
                      <div className="d-inline-block align-middle text-start">
                        <div className="text-dark-gray fs-20 fw-600 alt-font">
                          Michelle moore
                        </div>
                        <div className="lh-30">Sales manager</div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <span className="d-inline-block fs-22 lh-36 w-90 lg-w-100 mb-20px text-dark-gray">
                      Our experience with your agency has been amazingly
                      satisfying so far. The company I work with is happy to let
                      you know that we are a regular customer and look forward
                      to our cooperation soon!
                    </span>
                    <div className="mt-5px">
                      <div className="rounded-circle bg-white rounded-circle w-100px h-100px d-inline-block align-middle overflow-hidden me-20px">
                        <img
                          src="https://via.placeholder.com/100x101"
                          alt=""
                        />
                      </div>
                      <div className="d-inline-block align-middle text-start">
                        <div className="text-dark-gray fs-20 fw-600 alt-font">
                          Loretta smith
                        </div>
                        <div className="lh-30">Sales manager</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gradient-top-very-light-gray overlap-height position-relative">
        <div className="container overlap-gap-section">
          <div className="row justify-content-center mb-4">
            <div
              className="col-xxl-6 col-lg-8 col-md-10 text-center"
              data-anime='{ "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <h2 className="fw-600 alt-font text-dark-gray ls-minus-1px">
                Trusted by over 26,300 reputed companies
              </h2>
            </div>
          </div>
          <div className="row justify-content-center row-cols-2 row-cols-md-4 row-cols-sm-3 clients-style-03">
            <div
              className="col text-center mb-35px"
              data-anime='{ "translateY": [15, 0], "opacity": [0,1], "duration": 600, "delay": 300, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <div className="client-box">
                <a href="#">
                  <img
                    src="https://via.placeholder.com/192x192"
                    alt=""
                    className="box-shadow-extra-large border-radius-100px lg-w-80 md-w-95 xs-w-auto"
                  />
                </a>
              </div>
            </div>

            <div
              className="col text-center mb-35px"
              data-anime='{ "translateY": [15, 0], "opacity": [0,1], "duration": 600, "delay": 1000, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <div className="client-box">
                <a href="#">
                  <img
                    src="https://via.placeholder.com/192x192"
                    alt=""
                    className="box-shadow-extra-large border-radius-100px lg-w-80 md-w-95 xs-w-auto"
                  />
                </a>
              </div>
            </div>

            <div
              className="col text-center mb-35px"
              data-anime='{ "translateY": [15, 0], "opacity": [0,1], "duration": 600, "delay":900, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <div className="client-box">
                <a href="#">
                  <img
                    src="https://via.placeholder.com/193x192"
                    alt=""
                    className="box-shadow-extra-large border-radius-100px lg-w-80 md-w-95 xs-w-auto"
                  />
                </a>
              </div>
            </div>

            <div
              className="col text-center mb-35px"
              data-anime='{ "translateY": [15, 0], "opacity": [0,1], "duration": 600, "delay": 500, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <div className="client-box">
                <a href="#">
                  <img
                    src="https://via.placeholder.com/192x192"
                    alt=""
                    className="box-shadow-extra-large border-radius-100px lg-w-80 md-w-95 xs-w-auto"
                  />
                </a>
              </div>
            </div>

            <div
              className="col text-center sm-mb-35px"
              data-anime='{ "translateY": [15, 0], "opacity": [0,1], "duration": 600, "delay": 700, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <div className="client-box">
                <a href="#">
                  <img
                    src="https://via.placeholder.com/192x193"
                    alt=""
                    className="box-shadow-extra-large border-radius-100px lg-w-80 md-w-95 xs-w-auto"
                  />
                </a>
              </div>
            </div>

            <div
              className="col text-center sm-mb-35px"
              data-anime='{ "translateY": [15, 0], "opacity": [0,1], "duration": 600, "delay":1200, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <div className="client-box">
                <a href="#">
                  <img
                    src="https://via.placeholder.com/192x193"
                    alt=""
                    className="box-shadow-extra-large border-radius-100px lg-w-80 md-w-95 xs-w-auto"
                  />
                </a>
              </div>
            </div>

            <div
              className="col text-center"
              data-anime='{ "translateY": [15, 0], "opacity": [0,1], "duration": 600, "delay": 800, "staggervalue": 150, "easing": "easeOutQuad" }'
            >
              <div className="client-box">
                <a href="#">
                  <img
                    src="https://via.placeholder.com/193x193"
                    alt=""
                    className="box-shadow-extra-large border-radius-100px lg-w-80 md-w-95 xs-w-auto"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-7 mb-9 sm-mt-40px sm-mb-0">
            <div className="col-12 d-block d-sm-flex align-items-center text-center text-sm-start justify-content-center fs-22 alt-font">
              <div className="me-5px xs-ms-10px d-inline-block align-middle">
                <i className="fa-regular fa-heart text-red"></i>
              </div>
              <div className="d-inline-block align-middle">
                Join the{" "}
                <span className="fw-800 text-dark-gray text-decoration-line-bottom-medium">
                  10000+
                </span>{" "}
                companies trusting our agency.
              </div>
            </div>
          </div>
        </div>
        <div
          className="background-position-center-bottom background-size-100 background-no-repeat h-300px sm-h-150px position-absolute sm-position-relative left-0px bottom-0 w-100 d-none d-md-block"
          style={{ backgroundImage: `url(${anaBg})` }}        ></div>
      </section>

      <section className="p-0 sm-pt-50px">
        <div className="container overlap-section">
          <div className="row justify-content-center box-shadow-quadruple-large border-radius-6px overflow-hidden g-0">
            <div className="col-lg-6">
              <div
                className="p-15 lg-p-13 md-p-10 bg-white h-100 background-position-right-bottom background-no-repeat xs-background-image-none"
                style={{backgroundImage: "url('https://via.placeholder.com/135x162')"}}
              >
                <span className="ps-25px pe-25px mb-25px text-uppercase text-dark-gray fs-13 lh-42 ls-1px alt-font fw-700 border-radius-4px bg-gradient-chablis-red-quartz-white d-inline-block">
                  Keep in touch
                </span>
                <h3 className="alt-font text-dark-gray fw-600">
                  Looking for help? Ready to help!
                </h3>
                <div className="mt-11">
                  <div className="col icon-with-text-style-08 mb-25px">
                    <div className="feature-box feature-box-left-icon-middle border-bottom pb-25px border-color-extra-medium-gray">
                      <div className="feature-box-icon me-25px xs-me-15px lh-0px">
                        <i className="bi bi-telephone-outbound icon-medium text-dark-gray"></i>
                      </div>
                      <div className="feature-box-content">
                        <span className="alt-font fs-18 fw-500">
                          Feel free to get in touch?
                        </span>
                        <span className="d-block fw-600 alt-font fs-20">
                          <a
                            href="tel:1234567890"
                            className="text-dark-gray"
                          >
                            123 456 7890
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col icon-with-text-style-08 mb-25px">
                    <div className="feature-box feature-box-left-icon-middle border-bottom pb-25px border-color-extra-medium-gray">
                      <div className="feature-box-icon me-25px xs-me-15px lh-0px">
                        <i className="bi bi-envelope icon-medium text-dark-gray"></i>
                      </div>
                      <div className="feature-box-content">
                        <span className="alt-font fs-18 fw-500">
                          How can we help you?
                        </span>
                        <span className="d-block fw-600 alt-font fs-20">
                          <a
                            href="mailto:help@yourdomain.com"
                            className="text-dark-gray"
                          >
                            help@yourdomain.com
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col icon-with-text-style-08">
                    <div className="feature-box feature-box-left-icon-middle">
                      <div className="feature-box-icon me-25px xs-me-15px lh-0px">
                        <i className="bi bi-chat-text icon-medium text-dark-gray"></i>
                      </div>
                      <div className="feature-box-content">
                        <span className="alt-font fs-18 fw-500">
                          Are you ready for coffee?
                        </span>
                        <span className="text-dark-gray d-block alt-font fw-600 fs-20">
                          401 Broadway, London
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 contact-form-style-03">
              <div className="p-15 lg-p-13 md-p-10 bg-dark-gray h-100">
                <h1 className="fw-600 alt-font text-white fancy-text-style-4 ls-minus-1px">
                  Say
                  <span data-fancy-text='{ "effect": "rotate", "string": ["hello!", "hallå!", "salve!"] }'></span>
                </h1>

                <form
                  action="email-templates/contact-form.php"
                  method="post"
                >
                  <div className="position-relative form-group mb-20px">
                    <span className="form-icon">
                      <i className="bi bi-person icon-extra-medium"></i>
                    </span>
                    <input
                      className="ps-0 border-radius-0px fs-17 bg-transparent border-color-transparent-white-light placeholder-medium-gray form-control required"
                      type="text"
                      name="name"
                      placeholder="Enter your name*"
                    />
                  </div>
                  <div className="position-relative form-group mb-20px">
                    <span className="form-icon">
                      <i className="bi bi-envelope icon-extra-medium"></i>
                    </span>
                    <input
                      className="ps-0 border-radius-0px fs-17 bg-transparent border-color-transparent-white-light placeholder-medium-gray form-control required"
                      type="email"
                      name="email"
                      placeholder="Enter your email address*"
                    />
                  </div>
                  <div className="position-relative form-group form-textarea mt-15px mb-25px">
                    <textarea
                      className="ps-0 border-radius-0px fs-17 bg-transparent border-color-transparent-white-light placeholder-medium-gray form-control"
                      name="comment"
                      placeholder="Enter your message"
                      rows="4"
                    ></textarea>
                    <span className="form-icon">
                      <i className="bi bi-chat-square-dots icon-extra-medium"></i>
                    </span>
                    <input
                      type="hidden"
                      name="redirect"
                      value=""
                    />
                    <button
                      className="btn btn-small btn-gradient-orange-sky-blue ls-1px mt-30px submit w-100 btn-round-edge-small"
                      type="submit"
                    >
                      Send message
                    </button>
                    <div className="form-results mt-20px d-none"></div>
                  </div>
                  <span className="text-white opacity-3 fs-14 lh-22 d-block">
                    I accept the terms & conditions and i understand that my
                    data will be hold securely in accordance with the privacy
                    policy.
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Prof;
