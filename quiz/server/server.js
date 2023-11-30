const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.post('/', (req, res) => {
  const questions = router.db.get('questions').value();
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

  res.json({
    score: correctAnswers,
  });
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
