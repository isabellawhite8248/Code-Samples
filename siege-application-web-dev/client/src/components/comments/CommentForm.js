import { useState } from "react"
import "./styles.scss"

/**
 * Comment Form component that is in charge of the textarea to submit new comments 
 * @param handleSubmit - function to handle the submit of a new comment 
 * @param submitLabel - "Write" - writing a new comment || "Reply" - replying to a comment || "Update" - editing a comment
 * @param hasCancelButton - whether or not cancel button will show - initially set to false 
 * @param initialText - initialText of the comment - initially set to empty string
 * @param handleCancel - function that handles cancel of an edit 
 * @returns - new Comment Form component 
 */
const CommentForm = ({handleSubmit, submitLabel, hasCancelButton = false, initialText = "", handleCancel}) => {
    const [text, setText] = useState(initialText)

    // checking to see if text is written in comment form 
    const isTextAreaDisabled = text.length === 0

    // handles submit of new comment 
    const onSubmit = (e) => {
        e.preventDefault()
        handleSubmit(text)
        
        // set text back to empty string
        setText("")
    }
    return (
        <form onSubmit={onSubmit}>
            <textarea 
            className="comment-form-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment!"/>
            <button className="comment-form-button" disabled={isTextAreaDisabled}>{submitLabel}</button>
            {hasCancelButton && (
                <button type="button"
                className="comment-form-button comment-form-cancel-button"
                onClick={handleCancel}>Cancel</button>
            )}
        </form>
    ) 
}

export default CommentForm
