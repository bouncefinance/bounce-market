import { createBrowserHistory, createMemoryHistory } from 'history';
import { isWebEnvironment } from './isWebEnvironment';

export const historyInstance = isWebEnvironment()
  ? createBrowserHistory()
  : createMemoryHistory();
