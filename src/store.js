import { createStore, action, thunk, computed } from "easy-peasy";
import api from './api/posts';

export default createStore({
    posts: [],
    setPosts: action((state, payload) => {
        state.posts = payload;
    }),
    postTitle: '',
    setPostTitle: action((state, payload) => {
        state.postTitle = payload;
    }),
    postBody: '',
    setPostBody: action((state, payload) => {
        state.postBody = payload;
    }),
    editTitle: '',
    setEditTitle: action((state, payload) => {
        state.editTitle = payload;
    }),
    editBody: '',
    setEditBody: action((state, payload) => {
        state.editBody = payload;
    }),
    search: '',
    setSearch: action((state, payload) => {
        state.search = payload;
    }),
    searchResults: [],
    setSearchResults: action((state, payload) => {
        state.searchResults = payload;
    }),
    postCount: computed((state) => state.posts.length),
    getPostById: computed((state) => {
        return (id) => state.posts.find(post => (post.id).toString() === id);
    }),
    savePost: thunk(async (actions, newPost, helpers) => {
        const response = await api.post('/posts', newPost);
        const { posts } = helpers.getState();
        actions.setPosts([...posts, response.data]);
        actions.setPostTitle('');
        actions.setPostBody('');
    }),
    deletePost: thunk(async (actions, id, helpers) => {
        await api.delete(`/posts/${id}`);
        const { posts } = helpers.getState();
        actions.setPosts(posts.filter(post => String(post.id) !== String(id)));
    }),
    editPost: thunk(async (actions, updatedPost, helpers) => {
        const { id } = updatedPost;
        const response = await api.put(`/posts/${id}`, updatedPost);
        const { posts } = helpers.getState();
        actions.setPosts(posts.map(post => String(post.id) === String(id) ? { ...response.data } : post));
        actions.setEditTitle('');
        actions.setEditBody('');
    })
});