import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useStoreState, useStoreActions } from 'easy-peasy';

const NewPost = () => {
    const posts = useStoreState((state) => state.posts);
    const postTitle = useStoreState((state) => state.postTitle);
    const postBody = useStoreState((state) => state.postBody);

    const savePost = useStoreActions((actions) => actions.savePost);
    const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
    const setPostBody = useStoreActions((actions) => actions.setPostBody);

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const numericIds = posts
            .map((post) => Number(post.id))
            .filter((id) => Number.isSafeInteger(id) && id > 0);
        const id = String(Math.max(0, ...numericIds) + 1);
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id, title: postTitle, datetime, body: postBody };

        setError('');
        setIsSaving(true);
        try {
            await savePost(newPost);
            navigate('/');
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Unable to save the post.');
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                {error && <p className="statusMsg" role="alert">{error}</p>}
                <label htmlFor="postTitle">Title:</label>
                <input
                    id="postTitle"
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea
                    id="postBody"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button type="submit" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Submit'}
                </button>
            </form>
        </main>
    )
}

export default NewPost