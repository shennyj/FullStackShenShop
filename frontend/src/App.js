import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import { HashRouter as Router, Route} from 'react-router-dom'
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Shipping from './pages/Shipping/Shipping';
import Payment from './pages/Payment/Payment';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import OrderScreen from './pages/OrderScreen/OrderScreen';
import UserPage from './pages/UserPage';
import UserEditPage from './pages/UserEditPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';
function App() {
  return (
    <Router>
      <Header />
      <main>
          <Route exact path='/' component={HomePage}  />
          <Route path='/login' component={Login}  />
          <Route path='/register' component={Register}  />
          <Route path='/profile' component={Profile}  />
          <Route path='/order/:id' component={OrderScreen}  />
          <Route path='/payment' component={Payment}  />
          <Route path='/shipping' component={Shipping}  />
          <Route path='/placeorder' component={PlaceOrder}  />
          <Route path='/admin/orderlist' component={OrderListPage}  />
          <Route path="/product/:id" component={ProductPage}/>
          <Route path="/admin/user/:id/edit" component={UserEditPage}/>
          <Route path="/admin/userlist" component={UserPage}/>
          <Route path="/admin/productlist" component={ProductListPage}/>
          <Route path="/admin/product/:id/edit" component={ProductEditPage}/>
          <Route path="/cart/:id?" component={CartPage}/>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
