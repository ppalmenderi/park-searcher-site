import firebase from './FirebaseConfig';

const firestore = firebase.firestore();

const readDocument = (collection, id) => {
  return firestore.collection(collection).doc(id).get();
};


const readDocuments = async ({
  collection,
  queries,
  orderByField,
  orderByDirection,
  perPage,
  cursorId,
}) => {
  let collectionRef = firestore.collection(collection);

  if (queries && queries.length > 0) {
    for (const query of queries) {
      collectionRef = collectionRef.where(
        query.field,
        query.condition,
        query.value
      );
    }
  }

  if (orderByField && orderByDirection) {
  // if (orderByField) {
    collectionRef = collectionRef.orderBy(orderByField, orderByDirection);
    // collectionRef = collectionRef.orderBy(orderByField);
    
  };

  if (perPage) {
    collectionRef = collectionRef.limit(perPage);
  }

  if (cursorId) {
    const document = await readDocument(collection, cursorId);

    collectionRef = collectionRef.startAfter(document);
  }
  return collectionRef.get();

};

const FirebaseFirestoreService = {
  readDocuments,
};

export default FirebaseFirestoreService;
