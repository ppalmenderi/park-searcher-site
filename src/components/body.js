// import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { collection, query, where, getDocs } from "firebase/firestore";
import ParkItem from './ParkItem';
import Parks from './Parks';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from './Spinner';

function Body() {
  const [parks, setParks] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchParks = async () => {
      try {
        let parks = [];
        // console.log(parks);
        const parksRef = collection(db, 'nationalParks');

        const q = query(parksRef, where('name', '!=', null));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, ' => ', doc.data());
          // console.log(doc.data());
          // parks.push(doc.data());
          return parks.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setParks(parks);
        setLoader(false);
        console.log(parks);
      } catch (error) {
        toast.error('Could not fetch parks');
      }
    };

    fetchParks();
  }, []);

  return (
    <>
      <p>Filters will go here</p>
      <p>Parks go here</p>

      <ul>
        {parks.map((park) => (
          <>
            <pre>{park.data.location}</pre>
            <pre>{park.data.description}</pre>
            <ParkItem listing={park.data} id={park.id} key={park.id} />
          </>
        ))}
      </ul>
    </>
  );
}

export default Body;
