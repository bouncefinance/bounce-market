import Test from './test'
import { Reducer } from './redux'
import { Web3Provider } from "@ethersproject/providers"
import { Web3ReactProvider } from "@web3-react/core"

function App() {
  const getLibrary = (provider, connector) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Reducer>
        <div className="App">
          <Test />
        </div>
      </Reducer>
    </Web3ReactProvider>
  );
}

export default App;
