import { ssrRef, useFetch, watch } from '@nuxtjs/composition-api'
import { QuestionReportFactory, AddQuestionReport, QuestionReportType, QuestionReportEntity, GetQuestionReports, DeleteQuestionReport } from '@modules/reports'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { useReportModal } from '@app/hooks/core/modals'
import { useAuth } from '@app/hooks/auth/auth'
import { PAGINATION_LIMIT } from '@utils/constants'
import { QuestionEntity } from '@modules/questions'
import { Alert } from '../core/notifications'

let reportedEntity = null as { id: string, reported: QuestionReportType } | null
export const setReportedEntity = (question: QuestionEntity) => {
	reportedEntity = {
		id: question.id,
		reported: {
			body: question.body
		}
	}
}

export const useCreateReport = () => {
	const { id, bio } = useAuth()
	const factory = ssrRef(new QuestionReportFactory())
	const { message, setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	factory.value.reporterBioAndId = { id: id.value!, bio: bio.value! }
	watch(() => id.value, () => factory.value.reporterBioAndId = { id: id.value!, bio: bio.value! })
	watch(() => bio.value, () => factory.value.reporterBioAndId = { id: id.value!, bio: bio.value! })
	factory.value.reported = reportedEntity!

	const createReport = async () => {
		setError('')
		if (factory.value.valid && !loading.value) {
			try {
				setLoading(true)
				await AddQuestionReport.call(factory.value)
				useReportModal().closeReportQuestion()
				factory.value.reset()
				setMessage('Report sent successfully')
			} catch (error) { setError(error) }
			setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		factory, error, loading, message,
		createReport
	}
}

const global = {
	reports: ssrRef([] as QuestionReportEntity[]),
	fetched: ssrRef(false),
	hasMore: ssrRef(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

const pushToReportList = (report: QuestionReportEntity) => {
	const index = global.reports.value.findIndex((r) => r.id === report.id)
	if (index !== -1) global.reports.value.splice(index, 1, report)
	else global.reports.value.push(report)
}

export const useReportsList = () => {
	const fetchReports = async () => {
		global.setError('')
		try {
			global.setLoading(true)
			const lastDate = global.reports.value[global.reports.value.length - 1]?.createdAt
			const reports = await GetQuestionReports.call(lastDate)
			global.hasMore.value = reports.length === PAGINATION_LIMIT + 1
			reports.slice(0, PAGINATION_LIMIT).forEach(pushToReportList)
			global.fetched.value = true
		} catch (error) { global.setError(error) }
		global.setLoading(false)
	}

	useFetch(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchReports()
	})

	return { ...global, fetchOlderReports: fetchReports }
}

export const useDeleteReport = (id: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteReport = async () => {
		setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to remove this report?',
			text: 'This cannot be reversed',
			icon: 'warning',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			setLoading(true)
			try {
				await DeleteQuestionReport.call(id)
				global.reports.value = global.reports.value
					.filter((r) => r.id !== id)
				setMessage('Report deleted successfully')
			} catch (error) { setError(error) }
			setLoading(false)
		}
	}

	return { loading, error, deleteReport }
}
