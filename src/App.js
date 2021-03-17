import './stastic/css/Font.css'
import './stastic/css/App.css'
import Page from './pages'
import { Reducer } from './redux'
import { Web3Provider } from "@ethersproject/providers"
import { Web3ReactProvider } from "@web3-react/core"

function App() {
  const getLibrary = (provider, _connector) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
  }

  return (
    <div className="App">
      <Web3ReactProvider getLibrary={getLibrary}>
        <Reducer>
          <Page />
        </Reducer>
      </Web3ReactProvider>
    </div>
  );
}

export default App;
