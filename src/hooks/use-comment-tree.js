import { useState } from "react";

const useCommentTree = (initialComments) => {
    const [comments, setComments] = useState(initialComments);


    const insertNode = (tree, id, content) => {
        return tree.map((comment) => {
            if (comment.id === id) {

                return {
                    ...comment,
                    replies: [...comment.replies, content]
                }
            }
            else if (comment.replies && comment.replies.length > 0) {

                return {
                    ...comment,
                    replies: insertNode(comment.replies, id, content)
                }
            }
            return comment;

        })
    }
    const insertComment = (id, content) => {

        const newComment = {
            id: Date.now(),
            content,
            votes: 0,
            timestamp: new Date().toISOString(),
            replies: []
        }
        if (id) {
            setComments((prev) => insertNode(prev, id, newComment))
        }
        else {
            setComments((prev) => [...prev, newComment])
        }
    }


    const editNode = (tree, nodeId, content) => {
        return tree.map((node) => {
            if (node.id === nodeId) {
                return {
                    ...node,
                    content: content,
                    timestamp: new Date().toISOString(),
                };
            } else if (node.replies && node.replies.length > 0) {
                return {
                    ...node,
                    replies: editNode(node.replies, nodeId, content),
                };
            }
            return node;
        });
    };

    const editComment = (commentId, content) => {
        setComments((prevComments) => editNode(prevComments, commentId, content));
    };


    const deleteNode = (tree, nodeId) => {
        return tree.reduce((acc, node) => {
            if (node.id === nodeId) {
                return acc;
            } else if (node.replies && node.replies.length > 0) {
                node.replies = deleteNode(node.replies, nodeId);
            }
            return [...acc, node];
        }, []);
    };

    const deleteComment = (commentId) => {
        setComments((prevComments) => deleteNode(prevComments, commentId));
    };

    return {
        comments,
        insertComment,
        editComment,
        deleteComment

    };
};

export default useCommentTree;