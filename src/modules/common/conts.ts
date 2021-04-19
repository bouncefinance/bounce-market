const host = window.location.host;

export const BASE_URL = host.includes('market.bounce.finance')
  ? 'https://bounce-market.bounce.finance' // BSC Main
  : host.includes('market-stage.bounce.finance')
  ? 'https://market-test.bounce.finance' // BSC Test https
  : host.includes('127.0.0.1')
  ? 'https://bounce-market.bounce.finance' // BSC Main
  : 'https://market-test.bounce.finance'; // BSC Test http
