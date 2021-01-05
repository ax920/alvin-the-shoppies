import './App.css';
import CenteredGrid from './CenteredGrid';

function App() {
  return (
    <div className="App">
      <div class="background">
        <div class="main-content-container">
          <CenteredGrid></CenteredGrid>
        </div>
      </div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
