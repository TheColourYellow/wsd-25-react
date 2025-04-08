import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router';
import Layout from './components/Layout';
import Home from './views/Home';
import Profile from './views/Profile';
import Upload from './views/Upload';

const App = () => {
  //function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="upload" element={<Upload />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
