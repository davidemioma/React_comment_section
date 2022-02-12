import classes from "./Form.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";

function Form(props) {
  const currentUser = useSelector((state) => state.comments.currentUser);

  const [text, setText] = useState(props.default);

  const onChangeHandler = (e) => {
    setText(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (text === "") return;

    props.handleSubmit(text);

    setText("");
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.form}>
      <div className={classes.top}>
        <textarea
          value={text}
          rows="5"
          placeholder={"Add a comment..."}
          onChange={onChangeHandler}
        ></textarea>
      </div>

      <div className={classes.btm}>
        <img src={currentUser.image.png} alt="" />
        <button disabled={text.length === 0}>{props.task}</button>
      </div>
    </form>
  );
}

export default Form;
