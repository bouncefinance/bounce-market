import Test from './test'
// import Page from './pages'
import './stastic/css/Font.css'
import './stastic/css/App.css'
import { Reducer } from './redux'
import { Web3Provider } from "@ethersproject/providers"
import { Web3ReactProvider } from "@web3-react/core"
import { BrowserRouter } from 'react-router-dom'

function App() {
  const getLibrary = (provider, connector) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
  }

  return (
    <div className="App">
      <Web3ReactProvider getLibrary={getLibrary}>
        <Reducer>
          <BrowserRouter>
            <Test />
            {/* <Page /> */}
          </BrowserRouter>
        </Reducer>
      </Web3ReactProvider>
    </div>
  );
}

export default App;
