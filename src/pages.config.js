import { lazy } from 'react';
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AboutUs from "./pages/AboutUs";
import Layout from "./Layout.jsx";

const AircraftComparison = lazy(() => import("./pages/AircraftComparison"));
const RangeMap = lazy(() => import("./pages/RangeMap"));
const FinanceCalculator = lazy(() => import("./pages/FinanceCalculator"));
const FleetDirectory = lazy(() => import("./pages/FleetDirectory"));

export const LAZY_PAGES = new Set(['AircraftComparison', 'RangeMap', 'FinanceCalculator', 'FleetDirectory']);

export const PAGES = {
  Home,
  AircraftComparison,
  RangeMap,
  FinanceCalculator,
  FleetDirectory,
  Blog,
  BlogPost,
  AboutUs,
};

export const pagesConfig = {
  mainPage: "Home",
  Pages: PAGES,
  Layout,
};
