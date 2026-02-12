import Home from "./pages/Home";
import AircraftComparison from "./pages/AircraftComparison";
import RangeMap from "./pages/RangeMap";
import FinanceCalculator from "./pages/FinanceCalculator";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AboutUs from "./pages/AboutUs";
import Layout from "./Layout.jsx";

export const PAGES = {
  Home,
  AircraftComparison,
  RangeMap,
  FinanceCalculator,
  Blog,
  BlogPost,
  AboutUs,
};

export const pagesConfig = {
  mainPage: "Home",
  Pages: PAGES,
  Layout,
};
