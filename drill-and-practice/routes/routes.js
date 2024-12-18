import { Router } from "../deps.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as optionController from "./controllers/optionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as quizApi from "./apis/quizApi.js";
import * as mainController from "./controllers/mainController.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);
router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);
router.get("/logout", loginController.logout);


router.get("/topics", topicController.listTopics);
router.post("/topics", topicController.addTopic);
router.get("/topics/:id", topicController.showTopic);
router.post("/topics/:id/delete", topicController.deleteTopicById);
router.post("/topics/:id/questions", questionController.addQuestion);
router.get("/topics/:id/questions/:qid", questionController.showQuestionById);
router.post("/topics/:id/questions/:qid/delete", questionController.deleteQuestionById);
router.post("/topics/:id/questions/:qid/options", optionController.addOption);
router.post("/topics/:id/questions/:qid/options/:oid/delete", optionController.deleteOptionById);

router.get("/quiz", quizController.showQuizMain);
router.get("/quiz/:tId", quizController.getRandomQuestion);
router.get("/quiz/:tId/questions/:qId", quizController.showQuizQuestion);
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.answer);
router.get("/quiz/:tId/questions/:qId/correct", quizController.processCorrect);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.processIncorrect);

router.get("/api/questions/random", quizApi.getRandomQuestion);
router.post("/api/questions/answer", quizApi.checkAnswer)

export { router };