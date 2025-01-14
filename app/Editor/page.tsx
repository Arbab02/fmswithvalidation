import { Room } from "./Room";
import {Editor} from "./Editor";


export default function Page() {
  return (
    <div>
    <div className='mt-9'>
      <Room>
        <Editor/>
      </Room>
      </div>
      </div>
  );
}