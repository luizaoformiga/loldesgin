import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

if (process.env.NODE_ENV === 'development') {
  let result: any;

  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .use(reactotronSaga(result))
    .connect();
  tron.clear();

  console.tron = tron;
}
