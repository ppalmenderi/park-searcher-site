import React from 'react';

function News() {
  return (
    <>
      <div class="container mt-5">
        {/* Card start */}
        <div class="row d-flex justify-content-center mb-5">
          <div class="card col-lg-6 p-0">
            <h5 class="card-header bg-info">Illinois State Parks Done</h5>
            <div class="card-body bg-light">
              <h5 class="card-title text-secondary">July 30, 2023</h5>
              <p class="card-text">
                All 132 properties managed by the state of Illinois have been
                added to the database, bringing the total park count to 205.
              </p>
            </div>
          </div>
        </div>
        {/* Card end */}

        {/* Card start */}
        <div class="row d-flex justify-content-center mb-5">
          <div class="card col-lg-6 p-0">
            <h5 class="card-header bg-info">Filtering added</h5>
            <div class="card-body bg-light">
              <h5 class="card-title text-secondary">July 23, 2023</h5>
              <p class="card-text">
                You now have the option to filter parks by park type and/or the
                state that is located in. More filters options will be added in
                the future!
              </p>
            </div>
          </div>
        </div>
        {/* Card end */}

        {/* Card start */}
        <div class="row d-flex justify-content-center mb-5">
          <div class="card col-lg-6 p-0">
            <h5 class="card-header bg-info">National Parks Done</h5>
            <div class="card-body bg-light">
              <h5 class="card-title text-secondary">June 12, 2023</h5>
              <p class="card-text">
                All of the National Parks have been added to the database. Total
                park count is now at 63 parks.
              </p>
            </div>
          </div>
        </div>
        {/* Card end */}
      </div>
    </>
  );
}

export default News;
