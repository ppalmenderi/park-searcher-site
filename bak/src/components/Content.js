import { startTransition, useEffect, useState } from 'react';
import FirebaseFirestoreService from '../FirebaseFirestoreService';
import ContentHeader from './ContentHeader';
import ParkItem from './ParkItem';

function Content() {
  // const [currentPark, setCurrentPark] = useState(null);
  const [parks, setParks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [parkTypeFilter, setParkTypeFilter] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [parksPerPage, setParksPerPage] = useState(9);

  const setParkTypeFilterHandler = (parkType) => {
    startTransition(() => {
      setParkTypeFilter(parkType);
    });
  };

  // const setOrderByHandler = (order) => {
  //   startTransition(() => {
  //     setOrderBy(order);
  //   });
  // };

  const setParksPerPageHandler = (parks) => {
    startTransition(() => {
      setParksPerPage(parks);
    });
  };

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
  }, [parkTypeFilter, orderBy, parksPerPage]);

  async function fetchParks(cursorId = '') {
    const queries = [];

    if (parkTypeFilter) {
      queries.push({
        field: 'parkType',
        condition: '==',
        value: parkTypeFilter,
      });
    }

    const orderByField = 'name';
    let orderByDirection = 'asc'
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
  function handleParksPerPageChange(e) {
    const parksPerPage = e.target.value;

    setParksHandler([]);
    setParksPerPageHandler(parksPerPage);
  }

  function handleLoadMoreParksClick() {
    const lastPark = parks[parks.length - 1];
    const cursorId = lastPark.id;

    handleFetchParks(cursorId);
  }

  async function handleFetchParks(cursorId = '') {
    try {
      const fetchedRecipes = await fetchParks(cursorId);

      setParksHandler(fetchedRecipes);
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
            <div className="form-group">
              Park Type:
              <select
                value={parkTypeFilter}
                onChange={(e) => setParkTypeFilterHandler(e.target.value)}
                className="form-control"
                required
              >
                <option value=""></option>
                <option value="National Park">National Parks</option>
                <option value="National Forest">National Forests</option>
                <option value="State Park">State Parks</option>
                <option value="County Park">County Parks</option>
              </select>
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
            </div>
          </div>
        </div>
      </div>

      <div className="row gx-4 gx-lg-5">
        {isLoading ? <h5>Loading...</h5> : null}
        {!isLoading && parks && parks.length === 0 ? (
          <h5 className="">No parks found</h5>
        ) : null}
        {!isLoading && parks && parks.length > 0 ? (
          <div className="row gx-4 gx-lg-5">
            {parks.map((park) => {
              return(<ParkItem park={park} key={park.id}/>)
            })}
          </div>
        ) : null}

        {isLoading || (parks && parks.length > 0) ? (
          <>
            <label className="input-label">
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
            </label>
            <div className="pagination">
              <button
                type="button"
                onClick={handleLoadMoreParksClick}
                className="primary-button"
              >
                LOAD MORE Parks
              </button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default Content;
