import NavBar from './components/NavBar/NavBar';
import AppRoutes from './Routes/AppRoutes';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import './App.scss';
import { CommentsProvider } from './contexts/CommentsContext';
function App() {
  return (
    <div className='App'>
      <NavBar />
      <CommentsProvider>
        <AppRoutes />
      </CommentsProvider>
    </div>
  );
}

export default App;
library.add(fas, far);
