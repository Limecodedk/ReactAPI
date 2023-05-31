import logo from './logo.svg';
import './App.scss';
import '@picocss/pico'
//routing
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './layout/Layout';
import LayoutAdmin from './layout/admin/LayoutAdmin'
import Home from './views/Home'
import HomeAdmin from './views/admin/HomeAdmin'
import NotFound from './views/NotFound';
import Posts from './views/jsonplaceholder/Posts'
import Post from './views/jsonplaceholder/Post'
import People from './views/swapi/People';
import Starships from './views/swapi/Starships'
import Species from './views/swapi/Species';
import Person from './views/swapi/Person';
import News1 from './views/newsapi/News1';
import News2 from './views/newsapi/News2';
import Facts from './views/rapidAPI/Facts';
import Hobbies from './views/rapidAPI/Hobbies';
import LoveCalculator from './views/rapidAPI/LoveCalculator';
import Jokes from './views/rapidAPI/Jokes';
import CoinFlip from './views/rapidAPI/CoinFlip';
import AarhusBycykel from './views/opendatadk/AarhusBycykel';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* PUBLIC */}

        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/post/:id' element={<Post />} />
          <Route path='/person' element={<Person />} />
          <Route path='/people' element={<People />} />
          <Route path='/starships' element={<Starships />} />
          <Route path='/species' element={<Species />} />
          <Route path='/news1' element={<News1 />} />
          <Route path='/news2' element={<News2 />} />
          <Route path='/facts' element={<Facts />} />
          <Route path='/hobbies' element={<Hobbies />} />
          <Route path='/lovecalculator' element={<LoveCalculator />} />
          <Route path='/joke' element={<Jokes />} />
          <Route path='/coinflip' element={<CoinFlip />} />
          <Route path='/bycykler' element={<AarhusBycykel />} />
          <Route path='*' element={<NotFound />} />
        </Route>

        {/* ADMIN */}

        <Route path='/admin' element={<LayoutAdmin />}>
          <Route index element={<HomeAdmin />} />
          <Route path='*' element={<NotFound />} />
        </Route>

      </>
    )
  )

  return (
    <main className='container'>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
