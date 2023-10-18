import "./styles.scss"
import icon from "../assets/icon.png"
import { deleteComment, updateComment } from "../../api/api"
import CommentForm from "./CommentForm"

/**
 * Comment component that renders one comment on the screen
 * @param comment - the particular comment (used to recursively create more comments)
 * @param replies - the current array of replies for a particular comment 
 * @param deleteComment - delete comment function to delete comment from backend comments 
 * @param addComment - add comment function to add comment to backend comments 
 * @param updateComment - update comment function to edit particular comment 
 * @param activeComment - current active comment to reply/edit/delete 
 * @param setActiveComment - setter of useState to set new active comment 
 * @param parentId - the iD of the parent comment which is initially set to null
 * @returns - Comment component 
 */
const Comment = ({comment,
    replies,
    currentUserId, 
    deleteComment, 
    addComment, 
    updateComment,
    activeComment, 
    setActiveComment, 
    parentId = null}) => {

    // give five minutes to edit comment
    const fiveMinutes = 300000
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes
    const canReply = Boolean(currentUserId)
    const canEdit = currentUserId === comment.userId && !timePassed
    const canDelete = currentUserId === comment.userId && !timePassed
    const createdAt = new Date(comment.createdAt).toLocaleDateString()

    // check if we are currently replying 
    const isReplying = 
        activeComment &&
        activeComment.type === "replying" &&
        activeComment.id === comment.id

    // check if we are currently editing 
    const isEditing = 
        activeComment &&
        activeComment.type === "editing" &&
        activeComment.id === comment.id

    // check the current replyId; if parentId is null then just revert to comment.id
    const replyId = parentId ? parentId : comment.id
    return (
        <div className="comment">
            <div className="comment-image-container">
                <img src={icon} alt="prof-pic" className="profile-pic"></img>
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.username}</div>
                    <div>{createdAt}</div>
                </div>

                {/* if not editing, then just output the text of the comment */}
                {!isEditing && <div className="comment-text">{comment.body}</div>}

                {/* if editing, then insert a new Comment Form component*/}
                {isEditing && (
                    <CommentForm 
                    submitLabel="Update"
                    hasCancelButton
                    initialText={comment.body}
                    handleSubmit={(text) => updateComment(text, comment.id)}
                    handleCancel={() => setActiveComment(null)}/>
                )}
                <div className="comment-actions">
                    {canReply && <div className="comment-action" onClick={() => setActiveComment({
                        id: comment.id, type: "replying"
                    })}>Reply</div>}
                    {canEdit && <div className="comment-action" onClick={() => setActiveComment({
                        id: comment.id, type: "editing"
                    })}>Edit</div>}
                    {canDelete && <div className="comment-action" onClick={() => deleteComment(comment.id)}>Delete</div>}

                </div>
                
                {isReplying && (
                    <CommentForm submitLabel="Reply" handleSubmit={(text) => addComment(text, replyId)}/>
                )}
                {replies.length > 0 && (
                    <div className="replies">
                        {replies.map(reply => {
                            return <Comment
                            comment={reply}
                            key={reply.id}
                            setActiveComment={setActiveComment}
                            activeComment={activeComment}
                            deleteComment={deleteComment}
                            addComment={addComment}
                            updateComment={updateComment}
                            parentId={comment.id}
                            replies={[]}
                            currentUserId={currentUserId}
                          />
                        })}
                    </div>
                )}
            </div>
            
        </div>
    )
}

export default Comment
