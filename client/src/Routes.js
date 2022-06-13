import {
  Route,
  Routes as Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import App from "./App";
import Papers from "./pages/Papers";
import AddPaper from "./components/AddPaper";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<App />} />
        <Route path="/addPaper" element={<AddPaper />} />
        <Route path="/previousYearPapers" element={<Papers />} />
      </Switch>
    </Router>
  );
};

export default Routes;
