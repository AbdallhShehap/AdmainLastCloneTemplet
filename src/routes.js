
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import AddProduct from 'views/AddProduct.js'
import UsersCRUD from "views/UsersCRUD";
import Orders from "views/Orders";
import Login from 'views/Login'
import Home from "views/Home";
import TopSelling from "views/TopSelling";
import Colors from 'views/Colors'
import JoinTeam from 'views/JoinTeam'
import TradeIn from "views/TradeIn"
import Subscribe from "views/Subscribe";
import Test from "views/Test";
import Navbar from "views/Navbar";
import Footer from "views/Footer";
import Case from "views/Case";
import Partner from "views/Partner";
import Services from "views/Services";
import TypeOfServices from "views/TypeOfServices";
import Banners from "views/Home";
import Slider from "views/HomeSlider";
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-diamond",
    component: <Home />,
    layout: "/admin",
  },
  {
    path: "/navbar",
    name: "Navbar menu",
    icon: "nc-icon nc-diamond",
    component: <Navbar/>,
    layout: "/admin",
  },
 
  {
    path: "/footer",
    name: "Footer",
    icon: "nc-icon nc-diamond",
    component: <Footer/>,
    layout: "/admin",
  },

  // {
  //   path: "/test",
  //   name: "Test ",
  //   icon: "nc-icon nc-diamond",
  //   component: <Test />,
  //   layout: "/admin",
  // },

  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/usercrud",
  //   name: "Users",
  //   icon: "nc-icon nc-single-02",
  //   component: <UsersCRUD />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "nc-icon nc-single-02",
  //   component: <Login/>,
  //   layout: "/admin",
  // },


 
 
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: <TableList />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: <UpgradeToPro />,
  //   layout: "/admin",
  // },
];
export default routes;
