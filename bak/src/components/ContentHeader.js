import contentImage from '../assets/content-image.jpg';

function ContentHeader() {
  return (
    <>
      <div className="row gx-4 gx-lg-5 align-items-center my-5">
        <div className="col-lg-7">
          <img
            className="img-fluid rounded mb-4 mb-lg-0"
            src={contentImage}
            alt="man jumping on rocks"
          />
        </div>
        <div className="col-lg-5">
          <h1 className="font-weight-light">Park Searcher</h1>
          <p>
            Find a park near you or anywhere that you want in the United States
            without needing to visit multiple sites!
          </p>
          {/* <a className="btn btn-primary" href="#!">
              Call to Action!
            </a> */}
          {/* <div className="card text-white bg-secondary my-5 py-4 text-center">
            <div className="card-body">
              <p className="text-white m-0">
                This call to action card is a great place to showcase some
                important information or display a clever tagline!
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default ContentHeader;
