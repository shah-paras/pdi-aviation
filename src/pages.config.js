import { lazy } from 'react';
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AboutUs from "./pages/AboutUs";
import ContactSales from "./pages/ContactSales";
import Layout from "./Layout.jsx";

const AircraftComparison = lazy(() => import("./pages/AircraftComparison"));
const RangeMap = lazy(() => import("./pages/RangeMap"));
const FinanceCalculator = lazy(() => import("./pages/FinanceCalculator"));
const FleetDirectory = lazy(() => import("./pages/FleetDirectory"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Account = lazy(() => import("./pages/Account"));

export const LAZY_PAGES = new Set([
  'AircraftComparison', 'RangeMap', 'FinanceCalculator', 'FleetDirectory',
  'Login', 'Signup', 'Pricing', 'Account',
]);

// Pages requiring an active subscription. Kept as a Set so App.jsx can check membership cheaply.
export const GATED_PAGES = new Set([
  'AircraftComparison', 'RangeMap', 'FinanceCalculator', 'FleetDirectory',
]);

export const PAGES = {
  Home,
  AircraftComparison,
  RangeMap,
  FinanceCalculator,
  FleetDirectory,
  Blog,
  BlogPost,
  AboutUs,
  ContactSales,
  Login,
  Signup,
  Pricing,
  Account,
};

export const pagesConfig = {
  mainPage: "Home",
  Pages: PAGES,
  Layout,
};
