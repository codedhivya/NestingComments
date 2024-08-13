/* eslint-disable react/prop-types */
import { useState } from "react";

const Comment = ({
    comment = {},
    onSubmitComment = () => { },
    onEditComment = () => { },
    onDeleteComment = () => { },    

}) => {

    const [expand, setexpand] = useState(false)

    const [replyContent, setReplyContent] = useState("");
    const [editMode, setEditMode] = useState(false)
    const [editedContent, setEditedContent] = useState(comment.content)


    const handleReplySubmit = () => {
        if (replyContent) {
            //logic
            onSubmitComment(comment.id, replyContent)
            setReplyContent("");
        }
    };
    const toggleExpand = () => {
        setexpand(!expand);
    }

    const toggleEditMode = () => {
        setEditMode(!editMode);
        setEditedContent(comment.content); // Reset edited content to current comment content
    };

    const handleChange = (e) => {
        if (editMode) {
            setEditedContent(e.target.value);
        } else {
            setReplyContent(e.target.value);
        }
    };

    const handleEditSubmit = () => {
        onEditComment(comment.id, editedContent);
        setEditMode(false);
    };


    return (
        <div className="comment">

            {!editMode ? (
                <>
                    <p className="comment-content">{comment.content}</p>
                    <p className="comment-info">Votes: {comment.votes}</p>
                    <p className="comment-info">
                        {new Date(comment.timestamp).toLocaleString()}
                    </p>
                </>
            ) : (
                <div className="add-comment">
                    <textarea
                        value={editedContent}
                        onChange={handleChange}
                        rows={3}
                        cols={50}
                        className="comment-textarea"
                    />
                    <button onClick={handleEditSubmit} className="comment-button">
                        Save Edit
                    </button>
                    <button onClick={toggleEditMode} className="comment-button">
                        Cancel Edit
                    </button>
                </div>
            )}


            <div className="comment-actions">
                <button className="comment-button" onClick={toggleExpand}>
                    {expand ? "Hide Replies" : "Reply"}
                </button>
                <button onClick={toggleEditMode} className="comment-button">
                    Edit
                </button>
                <button
                    onClick={() => onDeleteComment(comment.id)}
                    className="comment-button"
                >
                    Delete
                </button>

            </div>

            {expand && <div className="comment-replies">

                <div className='add-comment'>
                    <textarea
                        value={replyContent}
                        onChange={handleChange}
                        rows={3}
                        cols={50}
                        className="comment-textarea"
                        placeholder="Add a new comment..."
                    />
                    <button onClick={handleReplySubmit} className="comment-button">
                        Add Comment
                    </button>
                </div>
                {comment?.replies?.map((reply) => {
                    return (
                        <Comment key={reply.id} comment={reply} onSubmitComment={onSubmitComment} onEditComment={onEditComment}
                            onDeleteComment={onDeleteComment} />
                    )
                })}


            </div>
            }


        </div>
    );
};

export default Comment;