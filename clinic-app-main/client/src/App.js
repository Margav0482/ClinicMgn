import { Route, Switch } from 'react-router-dom'
import Admin from './Admin/Admin';
import User from './User/User';

function App() {
  return (
    <Switch>
      <Route path='/admin' component={Admin} />
      <Route path='/' component={User} />
    </Switch>
  );
}

export default App;
