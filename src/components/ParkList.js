import ParkItem from './ParkItem';

const ParkList = ({ parks }) => {
  return (
    <div className="row gx-4 gx-lg-5">
      {parks.map((park) => (
          <ParkItem park={park.data} id={park.id} key={park.id} />
      ))}
    </div>
  );
};

export default ParkList;
