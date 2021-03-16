import { Ref, ssrRef, useFetch } from '@nuxtjs/composition-api'
import { GetUserQuestions, QuestionEntity } from '@modules/questions'
import { PAGINATION_LIMIT } from '@utils/constants'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'

const global = {} as Record<string, {
	questions: Ref<QuestionEntity[]>,
	fetched: Ref<boolean>,
	hasMore: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToQuestionList = (id: string, question: QuestionEntity) => {
	const index = global[id].questions.value.findIndex((q) => q.id === question.id)
	if (index !== -1) global[id].questions.value.splice(index, 1, question)
	else global[id].questions.value.push(question)
}

export const useUserQuestionList = (id: string) => {
	if (global[id] === undefined) global[id] = {
		questions: ssrRef([]),
		fetched: ssrRef(false),
		hasMore: ssrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchQuestions = async () => {
		global[id].setError('')
		try {
			global[id].setLoading(true)
			const lastDate = global[id].questions.value[global[id].questions.value.length - 1]?.createdAt
			const questions = await GetUserQuestions.call(id, lastDate ? new Date(lastDate) : undefined)
			global[id].hasMore.value = questions.length === PAGINATION_LIMIT + 1
			questions.slice(0, PAGINATION_LIMIT).forEach((q) => pushToQuestionList(id, q))
			global[id].fetched.value = true
		} catch (error) { global[id].setError(error) }
		global[id].setLoading(false)
	}

	useFetch(async () => {
		if (!global[id].fetched.value) await fetchQuestions()
	})

	return { ...global[id], fetchOlderQuestions: fetchQuestions }
}
