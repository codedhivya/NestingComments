import React, { useState } from 'react'
import "./style.css";
import useCommentTree from '../hooks/use-comment-tree';
import Comment from './Comment';

function NestedComment({ comments }) {
    const [comment, setComment] = useState('')


    const {
        comments: commentsData,
        insertComment,
        editComment,
        deleteComment

    } = useCommentTree(comments);



    const handleEditChange = (e) => {
        setComment(e.target.value);
    };

    const handleReply = (commentId, content) => {

        insertComment(commentId, content)

    };
    const handleEdit = (commentId, content) => {
        editComment(commentId, content)

    }


    const handleDelete = (commentId) => {
        deleteComment(commentId);
    };

    const handleSubmit = () => {
        if (comment) {

            //logic
            handleReply(undefined, comment);

            setComment("");
        }
    };
    return (
        <>
            <div>
                <div className='add-comment'>
                    <textarea
                        value={comment}
                        onChange={handleEditChange}
                        rows={3}
                        cols={50}
                        className="comment-textarea"
                        placeholder="Add a new comment..."
                    />
                    <button onClick={handleSubmit} className="comment-button">
                        Add Comment
                    </button>
                </div>
            </div>

            {commentsData.map((comment) => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    onSubmitComment={handleReply}
                    onEditComment={handleEdit}
                    onDeleteComment={handleDelete}

                />
            ))}
        </>

    )
}

export default NestedComment