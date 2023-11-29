const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("server/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

// временно украла
server.post("/", (req, res) => {
  const questions = router.db.get("questions").value();
  const answers = req.body.answers;
  let correctAnswers = 0;

  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i];
    let question;

    for (let j = 0; j < questions.length; j++) {
      if (questions[j].id === answer.questionId) {
        question = questions[j];
      }
    }
    if (question.correctAnswerId === answer.answerId) {
      correctAnswers++;
    }
  }

  // answers.forEach((answer) => {
  //   const question = questions.find((q) => q.id === answer.questionId);

  //   if (question.correctAnswerId === answer.answerId) {
  //     correctAnswers++;
  //   }
  // });

  // server.post("/check-answer", (req, res) => {
  //   const questions = router.db.get("questions").value();
  //   const userAnswerId = req.body.answerId;
  //   const userQuestionId = req.body.questionId;

  //   const question = questions.find((q) => q.id === userQuestionId);
  //   const correctQuestionAnswerId = question.answers.find(
  //     (answer) => answer.isCorrect
  //   ).id;

  //   const isCorrect = userAnswerId === correctQuestionAnswerId;

  //   res.json({
  //     isCorrect,
  //     correctAnswerId: correctQuestionAnswerId,
  //   });
  // });

  res.json({
    score: correctAnswers,
  });
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
