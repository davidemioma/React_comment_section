import classes from "./comments.module.css";
import Comment from "../comment/comment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { commentActions } from "../../store/index-redux";
import Form from "../form/Form";

function Comments() {
  const comments = useSelector((state) => state.comments.comments);

  console.log(comments);

  const currentUser = useSelector((state) => state.comments.currentUser);

  const dispatch = useDispatch();

  const filteredComments = comments.filter(
    (comment) => comment.parentId === null
  );

  const getReplies = (commentId) => {
    return comments
      .filter((reply) => reply.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  const handleSubmitHandler = (text) => {
    const comment = {
      id: Math.random().toString(36).substr(9),
      content: text,
      createdAt: new Date().toISOString(),
      score: Math.floor(Math.random() * 101).toString(),
      parentId: null,
      user: {
        image: {
          png: currentUser.image.png,
          webp: currentUser.image.webp,
        },
        username: currentUser.username,
      },
    };

    dispatch(commentActions.addComment(comment));

    dispatch(commentActions.setCommentToActive(null));
  };

  return (
    <div className="container">
      <ul className={classes.comments}>
        {filteredComments.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            image={comment.user.image.png}
            username={comment.user.username}
            createdAt={comment.createdAt}
            replyingTo={comment.replyingTo || ""}
            content={comment.content}
            score={comment.score}
            parentId={comment.parentId}
            replies={getReplies(comment.id)}
          />
        ))}
      </ul>

      <Form task="send" handleSubmit={handleSubmitHandler} default="" />
    </div>
  );
}

export default Comments;
