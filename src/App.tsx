import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import Home from './Pages/Home/Home';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import About from './Pages/About/About';
import Training from './Pages/Training/Training';
import { CreateTraining } from './Pages/CreateTraining/CreateTraining';
import RunExercices from './Pages/RunExercices/RunExercices';

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="" index element={<Home />} />
    //     <Route path="/about" element={<About />} />
    //     <Route path="/training" element={<Training />} />
    //     <Route path="/runExercices/:id" element={<RunExercices />} />
    //     <Route path="/training/createTraining" element={<CreateTraining />} />
    //     <Route path="*" element={<ErrorPage />} />
    //   </Routes>
    // </BrowserRouter>
    <HashRouter>
      <Routes>
        <Route path="" index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/training" element={<Training />} />
        <Route path="/runExercices/:id" element={<RunExercices />} />
        <Route path="/training/createTraining" element={<CreateTraining />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
