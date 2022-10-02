import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((questions) => setQuestions(questions));
  }, []);
  const list = questions.map((quiz) => (
    <QuestionItem key={quiz.id} question={quiz} onDelete={handleDelete} />
  ));

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  return (
    <div>
      <section>
        <h1>Quiz Questions</h1>
        <ul>
          <ul>
            {list}
          </ul>
        </ul>
      </section>
    </div>
  );
}

export default QuestionList;
