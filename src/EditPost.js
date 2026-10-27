import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { useStoreState, useStoreActions } from 'easy-peasy';

const EditPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);

    const editPost = useStoreActions((actions) => actions.editPost);
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);

    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])

    const handleEdit = async (e) => {
        e.preventDefault();
        if (!post) return;

        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { ...post, title: editTitle, datetime, body: editBody };

        setError('');
        setIsSaving(true);
        try {
            await editPost(updatedPost);
            navigate(`/post/${post.id}`);
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Unable to update the post.');
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <main className="NewPost">
            {post &&
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={handleEdit}>
                        {error && <p className="statusMsg" role="alert">{error}</p>}
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit" disabled={isSaving}>
                            {isSaving ? 'Saving...' : 'Submit'}
                        </button>
                    </form>
                </>
            }
            {!post &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost