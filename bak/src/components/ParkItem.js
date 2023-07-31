import { useState } from 'react';
import Modal from 'react-modal';
import Icon from './Icon';

// const customStyles = {
//   content: {
//     width: '90%',
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     position: 'relative',
//     // height: '90%',
//     // overflow: 'scroll'
//   },
// };

Modal.setAppElement('#root');

function ParkItem({ park }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [noteText, setNoteText] = useState('');

  //Open / close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const customStyles = {
    content: {
      width: '90%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
      height: '80%',
    },
  };

  let activitiesArray = [];

  park.activities?.map((activity) => activitiesArray.push(activity));

  activitiesArray.sort();

  return (
    // <h1>Test</h1>
    <div
      className="col-md-6 col-lg-4 col-sm-3 mb-3"
      style={{ height: '600px' }}
    >
      <div className="card h-100 border">
        <div className="card-body h-25 p-0 fill rounded-top">
          <img
            src={park.imgUrls[0]}
            alt={park.name}
            // className="card-img scale-down"
          />
        </div>
        <div className="card-footer h-75  d-flex align-items-start flex-column" style={{height: "200px"}}>
          <h2 className="card-title text-center mb-auto">{park.name}</h2>
          <pre className="card-text card-description mb-5">
            {/* {park.description.substring(0, 360) + '...'}{' '} */}
            {park.description}
          </pre>
          <div className="position-absolute bottom-0 start-50 translate-middle-x pb-2">
            <button onClick={openModal} className="btn btn-primary btn-sm">
              More Info
            </button>
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <img
                    src={park.imgUrls[0]}
                    alt={park.name}
                    className="img-fluid"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <h2 className="card-title">{park.name}</h2>
                  <pre className="card-text">{park.description}</pre>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <h2>Activities</h2>
                  {activitiesArray.map((activity) => (
                    <p key={activity.label}>
                      <Icon activity={activity.label} />
                      {activity.label}
                    </p>
                  ))}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <h3>Address</h3>
                  <pre>{park.location}</pre>
                </div>
              </div>
            </div>

            <button className="btn-close" onClick={closeModal}></button>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ParkItem;
