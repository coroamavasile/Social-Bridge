import './App.css'
import Login from './Components/Login/Login'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import StartAdmin from './Components/admin/StartAdmin'
import StartUser from './Components/Start/StartUser'
import StartFavorite from './Components/Start/StartFavorite'
import UsersTable from './Components/admin/UsersTable'
import UserEdit from './Components/admin/UserEdit'
import AddUser from './Components/admin/AddUser'
import Map from './Components/Map/Map'
import Register from './Components/Register'
import AddPin from './Components/pins/AddPin'
import AdminMap from './Components/Map/AdminMap'
import EditPin from './Components/pins/EditPin'

function App() {
   const defaultRoute =
      window.location.pathname === '/' ? <Redirect to="/login" /> : undefined

   return (
      <Router>
         <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/admin" component={StartAdmin} />
            <Route exact path="/admin/user" component={UsersTable} />
            <Route exact path="/admin/user/edit/:id" component={UserEdit} />
            <Route exact path="/admin/pin/edit/:id" component={EditPin} />
            <Route exact path="/admin/add/user" component={AddUser} />
            <Route exact path="/admin/map" component={AdminMap} />


            <Route exact path="/admin/add/pin" component={AddPin} />


            <Route exact path="/user" component={StartUser} />
            <Route exact path="/user/map" component={Map} />
            <Route exact path="/user/pins" component={StartFavorite} />

            <Route exact path="/register" component={Register} />

         </Switch>
         {defaultRoute}
      </Router>
   )
}

export default App
