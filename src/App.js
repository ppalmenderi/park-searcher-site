import Navbar from './components/Navbar';
import Content from './components/Content';
// import Header from './components/header';
// import Body from './components/body';
import Footer from './components/Footer';
import './App.css'
// import Posts from './components/Posts';

function App() {
  return (
    <div className="container">
      <Navbar />
      {/* <Header />
      <Body /> */}
      <Content />
      {/* <Posts /> */}

      <Footer />
    </div>
  );
}

export default App;
