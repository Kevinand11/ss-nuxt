import { SubjectFirebaseDataSource } from './data/datasources/subject-firebase'
import { QuestionFirebaseDataSource } from './data/datasources/question-firebase'
import { AnswerFirebaseDataSource } from './data/datasources/answer-firebase'
import { QuestionCommentFirebaseDataSource, AnswerCommentFirebaseDataSource } from './data/datasources/comment-firebase'
import { TagFirebaseDataSource } from './data/datasources/tag-firebase'
import { SubjectTransformer } from './data/transformers/subject'
import { QuestionTransformer } from './data/transformers/question'
import { AnswerTransformer } from './data/transformers/answer'
import { CommentTransformer } from './data/transformers/comment'
import { TagTransformer } from './data/transformers/tag'
import { SubjectRepository } from './data/repositories/subject'
import { QuestionRepository } from './data/repositories/question'
import { AnswerRepository } from './data/repositories/answer'
import { CommentRepository } from './data/repositories/comment'
import { TagRepository } from './data/repositories/tag'
import { GetSubjectsUseCase } from './domain/usecases/subjects/getSubjects'
import { DeleteSubjectUseCase } from './domain/usecases/subjects/deleteSubject'
import { AddSubjectUseCase } from './domain/usecases/subjects/addSubject'
import { FindSubjectUseCase } from './domain/usecases/subjects/findSubject'
import { FindQuestionUseCase } from './domain/usecases/questions/findQuestion'
import { GetQuestionsUseCase } from './domain/usecases/questions/getQuestions'
import { GetSimilarQuestionsUseCase } from './domain/usecases/questions/getSimilarQuestions'
import { GetUserQuestionsUseCase } from './domain/usecases/questions/getUserQuestions'
import { AddQuestionUseCase } from './domain/usecases/questions/addQuestion'
import { MarkAsBestAnswerUseCase } from './domain/usecases/answers/markAsBestAnswer'
import { ListenToQuestionUseCase } from './domain/usecases/questions/listenToQuestion'
import { ListenToQuestionsUseCase } from './domain/usecases/questions/listenToQuestions'
import { ListenToSimilarQuestionsUseCase } from './domain/usecases/questions/listenToSimilarQuestions'
import { GetAnswersUseCase } from './domain/usecases/answers/getAnswers'
import { GetUserAnswersUseCase } from './domain/usecases/answers/getUserAnswers'
import { AddAnswerUseCase } from './domain/usecases/answers/addAnswer'
import { RateAnswerUseCase } from './domain/usecases/answers/rateAnswer'
import { ListenToAnswersUseCase } from './domain/usecases/answers/listenToAnswers'
import { AddQuestionCommentUseCase, AddAnswerCommentUseCase } from './domain/usecases/comments/addComment'
import { GetQuestionCommentsUseCase, GetAnswerCommentsUseCase } from './domain/usecases/comments/getComments'
import { ListenToQuestionCommentsUseCase, ListenToAnswerCommentsUseCase } from './domain/usecases/comments/listenToComments'
import { GetTagsUseCase } from './domain/usecases/tags/getTags'
import { ListenToTagsUseCase } from './domain/usecases/tags/listenToTags'
import { SubjectEntity } from './domain/entities/subject'
import { SubjectFactory } from './domain/factories/subject'
import { QuestionEntity } from './domain/entities/question'
import { QuestionFactory } from './domain/factories/question'
import { AnswerEntity } from './domain/entities/answer'
import { AnswerFactory } from './domain/factories/answer'
import { CommentEntity } from './domain/entities/comment'
import { CommentFactory } from './domain/factories/comment'
import { TagEntity } from './domain/entities/tag'

const subjectDataSource = new SubjectFirebaseDataSource()
const questionDataSource = new QuestionFirebaseDataSource()
const answerDataSource = new AnswerFirebaseDataSource()
const questionCommentDataSource = new QuestionCommentFirebaseDataSource()
const answerCommentDataSource = new AnswerCommentFirebaseDataSource()
const tagDataSource = new TagFirebaseDataSource()

const subjectTransformer = new SubjectTransformer()
const questionTransformer = new QuestionTransformer()
const answerTransformer = new AnswerTransformer()
const commentTransformer = new CommentTransformer()
const tagTransformer = new TagTransformer()

const subjectRepository = new SubjectRepository(subjectDataSource, subjectTransformer)
const questionRepository = new QuestionRepository(questionDataSource, questionTransformer)
const answerRepository = new AnswerRepository(answerDataSource, answerTransformer)
const questionCommentRepository = new CommentRepository(questionCommentDataSource, commentTransformer)
const answerCommentRepository = new CommentRepository(answerCommentDataSource, commentTransformer)
const tagRepository = new TagRepository(tagDataSource, tagTransformer)

export const GetSubjects = new GetSubjectsUseCase(subjectRepository)
export const DeleteSubject = new DeleteSubjectUseCase(subjectRepository)
export const AddSubject = new AddSubjectUseCase(subjectRepository)
export const FindSubject = new FindSubjectUseCase(subjectRepository)

export const GetQuestions = new GetQuestionsUseCase(questionRepository)
export const GetSimilarQuestions = new GetSimilarQuestionsUseCase(questionRepository)
export const GetUserQuestions = new GetUserQuestionsUseCase(questionRepository)
export const ListenToQuestion = new ListenToQuestionUseCase(questionRepository)
export const ListenToQuestions = new ListenToQuestionsUseCase(questionRepository)
export const ListenToSimilarQuestions = new ListenToSimilarQuestionsUseCase(questionRepository)
export const AddQuestion = new AddQuestionUseCase(questionRepository)
export const FindQuestion = new FindQuestionUseCase(questionRepository)

export const GetAnswers = new GetAnswersUseCase(answerRepository)
export const GetUserAnswers = new GetUserAnswersUseCase(answerRepository)
export const ListenToAnswers = new ListenToAnswersUseCase(answerRepository)
export const AddAnswer = new AddAnswerUseCase(answerRepository)
export const RateAnswer = new RateAnswerUseCase(answerRepository)
export const MarkAsBestAnswer = new MarkAsBestAnswerUseCase(answerRepository)

export const AddQuestionComment = new AddQuestionCommentUseCase(questionCommentRepository)
export const AddAnswerComment = new AddAnswerCommentUseCase(answerCommentRepository)
export const GetQuestionComments = new GetQuestionCommentsUseCase(questionCommentRepository)
export const GetAnswerComments = new GetAnswerCommentsUseCase(answerCommentRepository)
export const ListenToQuestionComments = new ListenToQuestionCommentsUseCase(questionCommentRepository)
export const ListenToAnswerComments = new ListenToAnswerCommentsUseCase(answerCommentRepository)

export const GetTags = new GetTagsUseCase(tagRepository)
export const ListenToTags = new ListenToTagsUseCase(tagRepository)

export { SubjectEntity, SubjectFactory }
export { QuestionEntity, QuestionFactory }
export { AnswerEntity, AnswerFactory }
export { CommentEntity, CommentFactory }
export { TagEntity }
