import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where,
} from 'firebase/firestore';
// import { orderByChild } from 'firebase/database';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import ContentHeader from './ContentHeader';
import ParkItem from './ParkItem';
import ParkTypeSelect from './ParkTypeSelect';
import StateSelect from './StateSelect';
import ParkList from './ParkList';

function Content() {
  const parksRef = collection(db, 'nationalParks');
  const [parks, setParks] = useState([]);
  const [loader, setLoader] = useState(true);
  const [lastFetchedPark, setLastFetchedPark] = useState(null);
  const [selectedParkType, setSelectedParkType] = useState('Any');
  const [selectedState, setSelectedState] = useState('Any');
  const [parkQuery, setParkQuery] = useState(
    query(parksRef, orderBy('name'), startAfter(lastFetchedPark), limit(9))
  );

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const q = parkQuery;

        const querySnapshot = await getDocs(q);

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        // console.log(lastVisible)

        if (lastFetchedPark === null) {
          console.log('null');
        } else console.log('not null');
        let temp = lastFetchedPark;
        setLastFetchedPark(lastVisible);

        if (temp === lastFetchedPark) {
          console.log(true);
        } else console.log(false);

        let parks = [];

        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          return parks.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setParks(parks);
        setLoader(false);
      } catch (error) {
        toast.error('Could not fetch parks');
      }
    };

    fetchParks();
  }, [parkQuery]);

  //Load More
  const onFetchMoreParks = async () => {
    try {
      const q = parkQuery;

      const querySnapshot = await getDocs(q);

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      setLastFetchedPark(lastVisible);

      let parks = [];

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        return parks.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setParks((prevState) => [...prevState, ...parks]);
      setLoader(false);
    } catch (error) {
      toast.error('Could not fetch parks');
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'park-type') setSelectedParkType(e.target.value);
    if (e.target.name === 'selected-state') setSelectedState(e.target.value);

    setLastFetchedPark(null);

    if (selectedParkType === 'Any' && selectedState === 'Any') {
      console.log(selectedParkType, selectedState);
      setParkQuery(
        query(parksRef, orderBy('name'), startAfter(lastFetchedPark), limit(9))
      );
    } else if (selectedParkType !== 'Any' && selectedState === 'Any') {
      console.log(selectedParkType, selectedState);
      setParkQuery(
        query(
          parksRef,
          where('parkType', '==', selectedParkType),
          orderBy('name'),
          startAfter(lastFetchedPark),
          limit(9)
        )
      );
    } else if (selectedParkType === 'Any' && selectedState !== 'Any') {
      console.log(selectedParkType, selectedState);
      setParkQuery(
        query(
          parksRef,
          where('state', '==', selectedState),
          orderBy('name'),
          startAfter(lastFetchedPark),
          limit(9)
        )
      );
    } else if (selectedParkType !== 'Any' && selectedState !== 'Any') {
      console.log(selectedParkType, selectedState);
      setParkQuery(
        query(
          parksRef,
          where('parkType', '==', selectedParkType),
          where('state', '==', selectedState),
          orderBy('name'),
          startAfter(lastFetchedPark),
          limit(9)
        )
      );
    }
  };

  return (
    <>
      <div className="container px-4 px-lg-5">
        {/* <!-- Heading Row--> */}
        <ContentHeader />
        {/* <!-- Call to Action--> */}

        {/* <!-- Content Row--> */}
        <div className="row mb-5">
          <div className="col-sm-6">
            <div className="form-group">
              <ParkTypeSelect
                className="form-control"
                label="Park Type"
                options={[
                  { label: 'Any', value: 'any' },
                  { label: 'National Park', value: 'National Park' },
                  { label: 'National Forest', value: 'National Forest' },
                  { label: 'State Park', value: 'State Park' },
                ]}
                value={selectedParkType}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <StateSelect onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* <div className="row gx-4 gx-lg-5">
          {parks.map((park) => (
            <ParkItem park={park.data} id={park.id} key={park.id} />
          ))}

        </div> */}

        <ParkList parks={parks} />

        {lastFetchedPark && (
          <p className="loadMore" onClick={onFetchMoreParks}>
            Load More
          </p>
        )}
      </div>
    </>
  );
}

export default Content;
