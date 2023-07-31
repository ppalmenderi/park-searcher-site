import HeaderNavbar from './components/HeaderNavbar';
import Content from './components/Content';
import News from './pages/News';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';

import './App.css';

function App() {
  // let Component
  // switch (window.location.pathname) {
  //   case '/':
  //     Component = Content
  //     break;
  //   case '/news':
  //     Component = News
  //     break;
  //   default:
  //     break;
  // }

  return (
    <div className="container">
      <HeaderNavbar />
      {/* <Content /> */}
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/news" element={<News />} />
      </Routes>
      {/* <Component /> */}
      <Footer />
    </div>
  );
}

export default App;
