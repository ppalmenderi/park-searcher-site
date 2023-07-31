import { startTransition, useEffect, useState } from 'react';
import FirebaseFirestoreService from '../FirebaseFirestoreService';
import ContentHeader from './ContentHeader';
import ParkItem from './ParkItem';

function Content() {
  // const [currentPark, setCurrentPark] = useState(null);
  const [parks, setParks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [parkTypeFilter, setParkTypeFilter] = useState('');
  const [stateSelectFilter, setStateSelectFilter] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [parksPerPage, setParksPerPage] = useState(9);

  const setParkTypeFilterHandler = (parkType) => {
    startTransition(() => {
      setParkTypeFilter(parkType);
    });
  };

  const setStateSelectFilterHandler = (parkType) => {
    startTransition(() => {
      setStateSelectFilter(parkType);
    });
  };

  // const setOrderByHandler = (order) => {
  //   startTransition(() => {
  //     setOrderBy(order);
  //   });
  // };

  // Handle parks per page function.  Uncomment this after moving the dropdown
  // const setParksPerPageHandler = (parks) => {
  //   startTransition(() => {
  //     setParksPerPage(parks);
  //   });
  // };

  const setParksHandler = (parks) => {
    startTransition(() => {
      setParks(parks);
    });
  };

  // const setCurrentParkHandler = (parks) => {
  //   startTransition(() => {
  //     setCurrentPark(parks);
  //   });
  // };

  useEffect(() => {
    setIsLoading(true);

    fetchParks()
      .then((fetchedParks) => {
        setParksHandler(fetchedParks);
      })
      .catch((error) => {
        console.error(error.message);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parkTypeFilter, stateSelectFilter, orderBy, parksPerPage]);

  async function fetchParks(cursorId = '') {
    const queries = [];

    if (parkTypeFilter) {
      queries.push({
        field: 'parkType',
        condition: '==',
        value: parkTypeFilter,
      });
    }

    if (stateSelectFilter) {
      queries.push({
        field: 'state',
        condition: '==',
        value: stateSelectFilter,
      });
    }

    const orderByField = 'name';
    let orderByDirection = 'asc';
    // let orderByDirection;
    // if (orderBy) {
    //   switch (orderBy) {
    //     case 'orderAsc':
    //       orderByDirection = 'asc';
    //       break;
    //     case 'orderDesc':
    //       orderByDirection = 'desc';
    //       break;
    //     default:
    //       break;
    //   }
    // }

    let fetchedParks = [];

    try {
      const response = await FirebaseFirestoreService.readDocuments({
        collection: 'nationalParks',
        queries: queries,
        orderByField: orderByField,
        orderByDirection: orderByDirection,
        perPage: parksPerPage,
        cursorId: cursorId,
      });

      const newParks = response.docs.map((parkDoc) => {
        const id = parkDoc.id;
        const data = parkDoc.data();
        // data.publishDate = new Date(data.publishDate.seconds * 1000);

        return { ...data, id };
      });

      if (cursorId) {
        fetchedParks = [...parks, ...newParks];
      } else {
        fetchedParks = [...newParks];
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
    return fetchedParks;
  }

  // Handle parks per page function.  Uncomment this after moving the dropdown
  // function handleParksPerPageChange(e) {
  //   const parksPerPage = e.target.value;

  //   setParksHandler([]);
  //   setParksPerPageHandler(parksPerPage);
  // }

  function handleLoadMoreParksClick() {
    const lastPark = parks[parks.length - 1];
    const cursorId = lastPark.id;

    handleFetchParks(cursorId);
  }

  async function handleFetchParks(cursorId = '') {
    try {
      const fetchedParks = await fetchParks(cursorId);

      setParksHandler(fetchedParks);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  // function lookupCategoryLabel(categoryKey) {
  //   const categories = {
  //     nationalPark: 'National Park',
  //     nationalForest: 'National Forest',
  //     statePark: 'State Park',
  //     countyPark: 'County Park',
  //   };

  //   const label = categories[categoryKey];

  //   return label;
  // }

  return (
    <>
      <div className="container px-4 px-lg-5">
        <ContentHeader />

        <div className="row mb-5">
          <div className="col-sm-6">
            <label htmlFor="parkType">Park Type:</label>
            <select
              value={parkTypeFilter}
              onChange={(e) => setParkTypeFilterHandler(e.target.value)}
              className="form-control"
              required
            >
              <option value="">Any</option>
              <option value="National Park">National Parks</option>
              <option value="National Forest">National Forests</option>
              <option value="State Park">State Parks</option>
              <option value="County Park">County Parks</option>
            </select>
          </div>
          <div className="col-sm-6">
            <label htmlFor="state">State:</label>
            <select
              value={stateSelectFilter}
              onChange={(e) => setStateSelectFilterHandler(e.target.value)}
              className="form-control"
              required
            >
              <option value="">Any</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
              <option value="AS">American Samoa</option>
              <option value="GU">Guam</option>
              <option value="MP">Northern Mariana Islands</option>
              <option value="PR">Puerto Rico</option>
              <option value="UM">United States Minor Outlying Islands</option>
              <option value="VI">Virgin Islands</option>
            </select>
          </div>

          {/* <label className="input-label">
                <select
                  value={orderBy}
                  onChange={(e) => setOrderByHandler(e.target.value)}
                  className="select"
                >
                  <option value="orderDesc">Descending</option>
                  <option value="orderAsc">Ascending</option>
                </select>
              </label> */}
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>

      <div className="row gx-4 gx-lg-5 d-flex justify-content-center">
        {isLoading ? (
          <div>
            <h5>Loading...</h5>
          </div>
        ) : null}
        {!isLoading && parks && parks.length === 0 ? (
          <div>
            <h5 className="">No parks found</h5>
          </div>
        ) : null}
        {!isLoading && parks && parks.length > 0 ? (
          <div className="row gx-4 gx-lg-5">
            {parks.map((park) => {
              return <ParkItem park={park} key={park.id} />;
            })}
          </div>
        ) : null}

        {isLoading || (parks && parks.length > 0) ? (
          <>
            {/* Parks per page.  This needs to be moved somewhere else */}
            {/* <label className="input-label">
              Parks Per Page:
              <select
                value={parksPerPage}
                onChange={handleParksPerPageChange}
                className="select"
              >
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="9">9</option>
              </select>
            </label> */}
            <div className="pagination">
              <button
                type="button"
                onClick={handleLoadMoreParksClick}
                className="loadMore"
              >
                Load More
              </button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default Content;
