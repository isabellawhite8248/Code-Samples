import { useState, useEffect } from "react"
import {getComments as getCommentsApi, 
    createComment as createCommentApi, 
    deleteComment as deleteCommentApi,
    updateComment as updateCommentApi} from "../../api/api"
import Comment from "./Comment"
import CommentForm from "./CommentForm"
import "./styles.scss"

/**
 * Comments component that is in charge of rendering all comment components as well as the comment form to make new comments 
 * @param currentUserId - the current Id of the user making the comment 
 * @returns - Comments components that contains all comments 
 */
const Comments = ({currentUserId}) => {

    // useState variables 
    const [backendComments, setBackendComments] = useState([])
    const [activeComment, setActiveComment] = useState(null)
    // function that gets the root (top) comments of the comments
    const rootComments = backendComments.filter(
        (backendComment) => backendComment.parentId === null
    )

    /**
     * function that gets the replies for a particular comment based off the parent ID of the comment 
     * @param commentId - the id of the particular comment
     * @returns - the replies of the comment
     */
    const getReplies = (commentId) => {
        return backendComments.filter(backendComment => backendComment.parentId === commentId).sort((a, b) => 
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            )
    }

    /**
     * function that adds comment to the backend comments through a mock api call to the backend 
     * @param text - the text of the comment 
     * @param parentId - the parentId of the writer of the comment 
     */
    const addComment = (text, parentId) => {
        // get the comment wrapped in promise 
        createCommentApi(text, parentId).then(comment => {

            // update backend comments
            setBackendComments([comment, ...backendComments])

            // close the comment form after adding new comment
            setActiveComment(null)
        })
    }

    /**
     * function that deletes an existing comment through a mock api call to the backend 
     * @param commentId - the id of the particular comment 
     */
    const deleteComment = (commentId) => {
        if(window.confirm("Are you sure you want to delete comment? ")) {
            deleteCommentApi(commentId).then(() => {
                // filter comments without including the comment id 
                const updatedBackendComents = backendComments.filter(
                    (backendComment) => backendComment.id !== commentId
                )

                // update the new backend comments 
                setBackendComments(updatedBackendComents)
            })
        }
    }

    /**
     * function that updates an existing comment through a mock api call to the backend 
     * @param text - the new text of the updated comment 
     * @param commentId - the particular id of the comment to edit 
     */
    const updateComment = (text, commentId) => {
        updateCommentApi(text, commentId).then(() => {
            const updatedBackendComents = backendComments.map(backendComment => {
                // map the new updated text
                if (backendComment.id === commentId) {
                    return {...backendComment, body: text}
                }
                return backendComment
            })

            // update the new backend comments
            setBackendComments(updatedBackendComents)

            // close the comment form after adding new comment 
            setActiveComment(null)
        })
    }
    // fetch comments on the mockbackend for comments when screen is rendered 
    useEffect(() => {
        getCommentsApi().then(data => {
            setBackendComments(data)

        })
    },[])

     return (
         <>
        <div className="comments">
            <h3 className="comments-title">Comments</h3>
            <div className="comment-form-title">Write comment</div>
            <CommentForm submitLabel="Write" handleSubmit={addComment}/>
            <div className="comments-container">
                {rootComments.map((rootComment) => {
                    return <Comment 
                    key={rootComment.id}
                    comment={rootComment}
                    replies={getReplies(rootComment.id)}
                    currentUserId={currentUserId}
                    deleteComment={deleteComment}
                    addComment={addComment}
                    updateComment={updateComment}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}/>
                })}
            </div>
        </div>
        </>
    )
}

export default Comments
