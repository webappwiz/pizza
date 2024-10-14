import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminScreen } from './screens/index';

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;



      
