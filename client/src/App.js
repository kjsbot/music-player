import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

// URLSearchParams: passes in portion of code after ? in URL, gets url param in code
const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return (
    // if user autheticated, that means they will have a code in the URL
    code? <Dashboard code={code}/> : <Login />
  );
}

export default App;
