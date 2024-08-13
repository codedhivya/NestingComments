import './App.css';
import NestedComment from './components/NestedComment';

import commentdData from './data/comments.json'

function App() {
  return (
    <div>

      <h1>Nested Comments Application</h1>
      <NestedComment comments={commentdData}
        onSubmit={() => { }}
        onEdit={() => { }}

      />



    </div>
  );
}

export default App;
