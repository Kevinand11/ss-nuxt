import * as admin from 'firebase-admin'
import { authUserCreated, authUserDeleted } from './auth'
import { makeSuperAdmin } from './requests/makeSuperAdmin'
import { toggleAdmin } from './onCall/roles/admins'
import { makeTutor, removeTutor } from './onCall/roles/tutors'
import { subscribeToMailingList } from './onCall/roles/mailing'
import { subjectIconUpdated, subjectDeleted } from './database/subjects'
import { userNotificationCreated } from './database/notifications'
import { tutorUpdated } from './database/tutors'
import { userProfileUpdated } from './database/users'

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
// Tutors
export { tutorUpdated }
// Users
export { userProfileUpdated }


// On Call
// Roles
export { toggleAdmin, makeTutor, removeTutor, subscribeToMailingList }
