<template>
	<div :id="comment.id" class="my-0-5 d-flex align-items-start gap-0-5">
		<NuxtLink :to="`/users/${comment.userId}`">
			<Avatar :src="comment.avatar" :size="35" />
		</NuxtLink>
		<div>
			<NuxtLink :to="`/users/${comment.userId}`" class="d-block fw-bold text-wrap">
				<span>{{ comment.userName }}</span>
			</NuxtLink>
			<p class="mb-0">
				{{ comment.body }}
			</p>
		</div>
		<span class="ms-auto">
			{{ formatTime(comment.createdAt) }}
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { CommentEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'
export default defineComponent({
	name: 'CommentsListCard',
	props: {
		comment: {
			required: true,
			type: Object as PropType<CommentEntity>
		}
	},
	setup () {
		return { formatTime }
	}
})
</script>
