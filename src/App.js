import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';

function App() {

  const setPosts = useStoreActions((actions) => actions.setPosts);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts])

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [isDarkMode])

  return (
    <div className="App">
      <Header
        title="React JS Blog"
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode((currentTheme) => !currentTheme)}
      />
        <Nav />
        <Routes>
          <Route 
            path="/" 
            element={<Home isLoading={isLoading} fetchError={fetchError} />} 
          />
          <Route path="post" element={<NewPost />} />
          <Route path="edit/:id" element={<EditPost />} />
          <Route path="post/:id" element={<PostPage />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;