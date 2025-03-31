import Notes from '../components/Notes';
import { TagContainer } from '../components/TagContainer';

export default function Home() {
  return (
    <div className="flex">
      <div className="basis-1/4 dark:bg-slate-800">
        <TagContainer />
      </div>
      <div className="basis-3/4">
        <Notes />
      </div>
    </div>
  );
}
