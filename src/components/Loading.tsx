import { CircularProgress } from 'react-cssfx-loading/lib';
import Transition from './Transition';

function Loading() {
  return (
    <Transition className="Loading">
      <CircularProgress
        height="100px"
        width="100px"
        color="#9922ff"
      />
    </Transition>
  );
}

export default Loading;
