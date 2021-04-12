import './stastic/css/Font.css'
import './stastic/css/App.css'
import Page from './pages'
import { IntlProvider } from 'react-intl';
import { Reducer } from './redux'
import { Web3Provider } from "@ethersproject/providers"
import { Web3ReactProvider } from "@web3-react/core"
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo'
import zh_CN from './locales/zh_CN';
import en_US from './locales/en_US';

const compile = function loop(msgs, pids) {
  let results = {}
  for (const [id, msg] of Object.entries(msgs)) {
    if (typeof msg === 'object') {
      results = {
        ...results,
        ...loop(msg, pids ? [pids, id] : id)
      }
    } else {
      results[pids ? [...(typeof (pids) === 'string' ? [pids] : pids), id].join('.') : id] = msg
    }

  }
  return results
}


let messages = {};
messages["en-US"] = compile(en_US);
messages["zh-CN"] = compile(zh_CN);
// console.log(compile(en_US))

// const languages = navigator.languages;
let Language = window.localStorage.getItem('Language')
const host = window.location.host
if (host.includes('cnmarket.bounce.finance')) {
  Language = 'zh-CN'
}
const currentLang = Language;     // en-US
// const currentLang = 'en-US'      // en-US

function App() {
  const getLibrary = (provider, _connector) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
  }


  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Reducer>
            <IntlProvider locale={currentLang} messages={messages[currentLang]}>
              <Page />
            </IntlProvider>
          </Reducer>
        </Web3ReactProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
