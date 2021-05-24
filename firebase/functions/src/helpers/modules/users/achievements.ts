import * as admin from 'firebase-admin'
import { addUserCoins, addUserXp } from '../payments/transactions'
import { createNotification } from './notifications'

type IAchievement = {
	id: string
	name: string
	description: string
	limit: number
	price: {
		bronze: number
		xp: number
	}
}

const Achievements = {
	ASK_QUESTIONS: {
		id: 'ASK_QUESTIONS',
		name: 'Scholar',
		description: 'Ask 100 questions',
		limit: 100,
		price: {
			bronze: 40,
			xp: 50
		}
	},
	STREAK_7_DAYS: {
		id: 'STREAK_7_DAYS',
		name: '7 Day Streak',
		description: 'Complete a 7 day streak',
		limit: 7,
		price: {
			bronze: 35,
			xp: 25
		}
	},
	BUY_GOLD: {
		id: 'BUY_GOLD',
		name: 'Deep Pockets',
		description: 'Buy 100 gold coins',
		limit: 100,
		price: {
			bronze: 20,
			xp: 100
		}
	},
	BUY_BRONZE: {
		id: 'BUY_BRONZE',
		name: 'Entrepreneur',
		description: 'Buy 100 bronze coins',
		limit: 100,
		price: {
			bronze: 20,
			xp: 50
		}
	},
	ATTEND_SESSIONS: {
		id: 'ATTEND_SESSIONS',
		name: 'Nerd Indeed',
		description: 'Attend 25 sessions',
		limit: 25,
		price: {
			bronze: 25,
			xp: 100
		}
	},
	TIP_NERDS: {
		id: 'TIP_NERDS',
		name: 'Cheerful Giver',
		description: 'Tip nerds 15 times',
		limit: 15,
		price: {
			bronze: 50,
			xp: 50
		}
	},
	DAILY_FINISH: {
		id: 'DAILY_FINISH',
		name: 'Legendary',
		description: 'Finish #1 in daily rankings',
		limit: 1,
		price: {
			bronze: 5,
			xp: 50
		}
	},
	WEEKLY_FINISH: {
		id: 'WEEKLY_FINISH',
		name: 'Weekend Warrior',
		description: 'Finish #1 in weekly rankings',
		limit: 1,
		price: {
			bronze: 25,
			xp: 100
		}
	}
} as const

const getAchievementProgress = async (userId: string, id: string) => {
	const ref = admin.database().ref('profiles')
		.child(userId)
		.child('achievements')
		.child(id)
	const data = await ref.once('value')
	const { progress = 0, completed = false } = data.val() ?? {}
	return { progress, completed, ref }
}
const sendNotification = async (userId: string, achievement: IAchievement) => {
	await createNotification(userId, {
		body: `Congratulations, you just gained progress for the achievement: ${achievement.name}`,
		action: '/account'
	})
}

const runAfterAchievement = async (userId: string, achievement: IAchievement) => {
	const { name, price: { bronze, xp } } = achievement
	await addUserXp(userId, xp)
	await addUserCoins(userId, { bronze, gold: 0 },
		`You earned coins for completing the achievement: ${name}`
	)
}

const checkAskQuestionsAchievement = async (userId: string) => {
	const { ref, progress, completed } = await getAchievementProgress(userId, Achievements.ASK_QUESTIONS.id)

	if (!completed && progress + 1 >= Achievements.ASK_QUESTIONS.limit) {
		await ref.update({ completed: true, progress: admin.database.ServerValue.increment(1) })
		await runAfterAchievement(userId, Achievements.ASK_QUESTIONS)
	} else if (!completed) {
		await ref.update({ progress: admin.database.ServerValue.increment(1) })
		await sendNotification(userId, Achievements.ASK_QUESTIONS)
	}
}

const checkStreak7Day = async (userId: string, streak: number) => {
	const { ref, progress, completed } = await getAchievementProgress(userId, Achievements.STREAK_7_DAYS.id)

	if (!completed) {
		if (streak >= Achievements.STREAK_7_DAYS.limit && streak >= progress) {
			await ref.update({ completed: true, progress: streak })
			await runAfterAchievement(userId, Achievements.STREAK_7_DAYS)
		} else {
			await ref.update({ progress: streak })
			await sendNotification(userId, Achievements.STREAK_7_DAYS)
		}
	}
}

const checkBuyGoldAchievement = async (userId: string, coins: number) => {
	const { ref, progress, completed } = await getAchievementProgress(userId, Achievements.BUY_GOLD.id)

	if (!completed && progress + coins >= Achievements.BUY_GOLD.limit) {
		await ref.update({ completed: true, progress: admin.database.ServerValue.increment(coins) })
		await runAfterAchievement(userId, Achievements.BUY_GOLD)
	} else if (!completed) {
		await ref.update({ progress: admin.database.ServerValue.increment(coins) })
		await sendNotification(userId, Achievements.BUY_GOLD)
	}
}

const checkBuyBronzeAchievement = async (userId: string, coins: number) => {
	const { ref, progress, completed } = await getAchievementProgress(userId, Achievements.BUY_BRONZE.id)

	if (!completed && progress + coins >= Achievements.BUY_BRONZE.limit) {
		await ref.update({ completed: true, progress: admin.database.ServerValue.increment(coins) })
		await runAfterAchievement(userId, Achievements.BUY_BRONZE)
	} else if (!completed) {
		await ref.update({ progress: admin.database.ServerValue.increment(coins) })
		await sendNotification(userId, Achievements.BUY_BRONZE)
	}
}

const checkAttendSessionsAchievement = async (userId: string) => {
	const { ref, progress, completed } = await getAchievementProgress(userId, Achievements.ATTEND_SESSIONS.id)

	if (!completed && progress + 1 >= Achievements.ATTEND_SESSIONS.limit) {
		await ref.update({ completed: true, progress: admin.database.ServerValue.increment(1) })
		await runAfterAchievement(userId, Achievements.ATTEND_SESSIONS)
	} else if (!completed) {
		await ref.update({ progress: admin.database.ServerValue.increment(1) })
		await sendNotification(userId, Achievements.ATTEND_SESSIONS)
	}
}

const checkTipNerdsAchievement = async (userId: string) => {
	const { ref, progress, completed } = await getAchievementProgress(userId, Achievements.TIP_NERDS.id)

	if (!completed && progress + 1 >= Achievements.TIP_NERDS.limit) {
		await ref.update({ completed: true, progress: admin.database.ServerValue.increment(1) })
		await runAfterAchievement(userId, Achievements.TIP_NERDS)
	} else if (!completed) {
		await ref.update({ progress: admin.database.ServerValue.increment(1) })
		await sendNotification(userId, Achievements.TIP_NERDS)
	}
}

const checkDailyFinishAchievement = async (userId: string, rank: number) => {
	const { ref, progress, completed } = await getAchievementProgress(userId, Achievements.DAILY_FINISH.id)
	const oldRank = progress === 0 ? Infinity : progress

	if (!completed && rank < oldRank) {
		if (rank <= Achievements.DAILY_FINISH.limit) {
			await ref.update({ completed: true, progress: rank })
			await runAfterAchievement(userId, Achievements.DAILY_FINISH)
		} else {
			await ref.update({ progress: rank })
			await sendNotification(userId, Achievements.DAILY_FINISH)
		}
	}
}

const checkWeeklyFinishAchievement = async (userId: string, rank: number) => {
	const { ref, progress, completed } = await getAchievementProgress(userId, Achievements.WEEKLY_FINISH.id)
	const oldRank = progress === 0 ? Infinity : progress

	if (!completed && rank < oldRank) {
		if (rank <= Achievements.WEEKLY_FINISH.limit) {
			await ref.update({ completed: true, progress: rank })
			await runAfterAchievement(userId, Achievements.WEEKLY_FINISH)
		} else {
			await ref.update({ progress: rank })
			await sendNotification(userId, Achievements.WEEKLY_FINISH)
		}
	}
}

export const Achievement = {
	checkAskQuestionsAchievement,
	checkStreak7Day,
	checkBuyGoldAchievement,
	checkBuyBronzeAchievement,
	checkAttendSessionsAchievement,
	checkTipNerdsAchievement,
	checkDailyFinishAchievement,
	checkWeeklyFinishAchievement
} as const
