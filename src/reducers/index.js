import {combineReducers} from "redux";
import UrlBoxReducer from 'components/Form/reducer';
import LinkBoxReducer from 'components/LinkBox/reducer';
import LinkerReducer from 'components/Linker/reducer';
import TimerReducer from 'components/Timer/reducer';
import ResultReducer from 'controller/Result/reducer';

export default combineReducers({
  ShortenerForm: UrlBoxReducer,
  LongUrlField: LinkBoxReducer('LongUrlField'),
  ShortUrlField: LinkBoxReducer('ShortUrlField'),
  Linker: LinkerReducer,
  Timer: TimerReducer,
  Result: ResultReducer,
});