import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginView from "../pages/login";
import SignUpView from "../pages/sign_up";

const AppRouter = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />}></Route>
        <Route path="/login" element={<LoginView />}></Route>
        <Route path="/sign-up" element={<SignUpView />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;