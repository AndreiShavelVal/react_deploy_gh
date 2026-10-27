import { useParams, Link, useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useState } from 'react';

const PostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const deletePost = useStoreActions((actions) => actions.deletePost);
    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);
    const [error, setError] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!post) return;

        setError('');
        setIsDeleting(true);
        try {
            await deletePost(post.id);
            navigate('/');
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : 'Unable to delete the post.');
        } finally {
            setIsDeleting(false);
        }
    }    

    return (
        <main className="PostPage">
            <article className="post">
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        {error && <p className="statusMsg" role="alert">{error}</p>}
                        <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
                        <button className="deleteButton" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? 'Deleting...' : 'Delete Post'}
                        </button>
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
            </article>
        </main>
    )
}

export default PostPage