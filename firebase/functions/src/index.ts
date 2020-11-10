import * as admin from 'firebase-admin'
import { authUserCreated, authUserDeleted } from './auth'
import { makeSuperAdmin } from './requests/makeSuperAdmin'
import { toggleAdmin } from './onCall/roles/admins'
import { makeTutor, removeTutor } from './onCall/roles/tutors'
import { subscribeToMailingList } from './onCall/roles/mailing'
import { subjectIconUpdated, subjectDeleted } from './database/subjects'
import { userNotificationCreated } from './database/notifications'
import { userProfileUpdated, userCreditsUpdated } from './database/users'
import { answerCreated } from './database/answers'
import { questionCreated } from './firestore/questions'
import { tutorUpdated } from './firestore/tutors'

admin.initializeApp()

// Auth Triggers
export { authUserCreated, authUserDeleted }


// Request Triggers
export { makeSuperAdmin }


// Database Triggers
// Subjects
export { subjectIconUpdated, subjectDeleted }
// Notifications
export { userNotificationCreated }
// Users
export { userProfileUpdated, userCreditsUpdated }
// Answers
export { answerCreated }


// Firestore Triggers
// Tutors
export { tutorUpdated }
// Questions
export { questionCreated }


// On Call
// Roles
export { toggleAdmin, makeTutor, removeTutor, subscribeToMailingList }
