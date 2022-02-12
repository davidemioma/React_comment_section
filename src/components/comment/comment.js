import classes from "./comment.module.css";
import { useSelector } from "react-redux";
import { commentActions } from "../../store/index-redux";
import { useDispatch } from "react-redux";
import Form from "../form/Form";

function Comment(props) {
  const currentUser = useSelector((state) => state.comments.currentUser);

  const activeComment = useSelector((state) => state.comments.activeComment);

  const isReplying =
    activeComment &&
    activeComment.id === props.id &&
    activeComment.type === "replying";

  const isEditing =
    activeComment &&
    activeComment.id === props.id &&
    activeComment.type === "editing";

  const timePassed = new Date() - new Date(props.createdAt) > 300000;

  const createdAt = new Date(props.createdAt).toLocaleDateString();

  const dispatch = useDispatch();

  const onDeleteHandler = () => {
    dispatch(commentActions.deleteComment(props.id));

    dispatch(commentActions.setCommentToActive(null));
  };

  const onReplyHandler = () => {
    dispatch(
      commentActions.setCommentToActive({ id: props.id, type: "replying" })
    );
  };

  const onEditHandler = () => {
    dispatch(
      commentActions.setCommentToActive({ id: props.id, type: "editing" })
    );
  };

  const onHandleReply = (text) => {
    const reply = {
      id: Math.random().toString(36).substr(9),
      content: text,
      createdAt: new Date().toISOString(),
      score: Math.floor(Math.random() * 101).toString(),
      parentId: props.parentId ? props.parentId : props.id,
      replyingTo: props.username,
      user: {
        image: {
          png: currentUser.image.png,
          webp: currentUser.image.webp,
        },
        username: currentUser.username,
      },
    };

    dispatch(commentActions.addComment(reply));

    dispatch(commentActions.setCommentToActive(null));
  };

  const onHandleEdit = (text) => {
    const update = {
      id: props.id,
      content: text,
      createdAt: props.createdAt,
      score: props.score,
      parentId: props.parentId ? props.parentId : props.id,
      replyingTo: props.username,
      user: {
        image: {
          png: currentUser.image.png,
          webp: currentUser.image.webp,
        },
        username: currentUser.username,
      },
    };

    dispatch(commentActions.editComment(update));

    dispatch(commentActions.setCommentToActive(null));
  };

  return (
    <li>
      <div className={classes.comment}>
        <div className={classes.body}>
          <div className={classes.content}>
            <div className={classes.profile}>
              <img src={props.image} alt="" />
              <span>{props.username}</span>
              {currentUser.username === props.username ? (
                <span className={classes.you}>You</span>
              ) : (
                ""
              )}
              <p>{createdAt}</p>
            </div>

            <div className={classes.desktop}>
              <button onClick={onReplyHandler} className={classes.reply}>
                <img src="/static/assets/icon-reply.svg" alt="" /> Reply
              </button>

              {currentUser.username === props.username && !timePassed && (
                <button onClick={onDeleteHandler} className={classes.delete}>
                  <img src="/static/assets/icon-delete.svg" alt="" />
                  Delete
                </button>
              )}

              {currentUser.username === props.username && !timePassed && (
                <button onClick={onEditHandler} className={classes.edit}>
                  <img src="/static/assets/icon-edit.svg" alt="" />
                  Edit
                </button>
              )}
            </div>
          </div>
          <p>
            {props.replyingTo && <span>@{props.replyingTo}</span>}
            {props.content}
          </p>
        </div>

        <div className={classes.btm}>
          <div className={classes.scores}>
            <button>+</button>
            <p>{props.score}</p>
            <button>-</button>
          </div>

          <div className={classes.mobile}>
            <button onClick={onReplyHandler} className={classes.reply}>
              <img src="/static/assets/icon-reply.svg" alt="" /> Reply
            </button>

            {currentUser.username === props.username && !timePassed && (
              <button onClick={onDeleteHandler} className={classes.delete}>
                <img src="/static/assets/icon-delete.svg" alt="" />
                Delete
              </button>
            )}

            {currentUser.username === props.username && !timePassed && (
              <button onClick={onEditHandler} className={classes.edit}>
                <img src="/static/assets/icon-edit.svg" alt="" />
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

      {isReplying && (
        <Form task={"reply"} handleSubmit={onHandleReply} default="" />
      )}

      {isEditing && (
        <Form
          task={"update"}
          handleSubmit={onHandleEdit}
          default={props.content}
        />
      )}

      {props.replies.length > 0 && (
        <div className={classes.replies}>
          <ul className={classes.replyList}>
            {props.replies.map((reply) => (
              <Comment
                key={reply.id}
                id={reply.id}
                image={reply.user.image.png}
                username={reply.user.username}
                createdAt={reply.createdAt}
                replyingTo={reply.replyingTo || ""}
                content={reply.content}
                score={reply.score}
                parentId={reply.parentId}
                replies={[]}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default Comment;
