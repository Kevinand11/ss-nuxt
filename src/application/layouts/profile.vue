<template>
	<div class="layout-page">
		<TopNavigation />
		<section class="layout-body">
			<section class="layout-side-left">
				<ProfileLeftSidebar />
			</section>
			<main class="layout-main">
				<Nuxt />
			</main>
			<section class="layout-side-right">
				<ProfileRightSidebar />
			</section>
			<ModalBase />
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ProfileLeftSidebar from '@app/components/layouts/sidebars/ProfileLeftSidebar.vue'
import ProfileRightSidebar from '@app/components/layouts/sidebars/ProfileRightSidebar.vue'
import TopNavigation from '@app/components/layouts/topNavigations/DefaultTopNavigation.vue'
export default defineComponent({
	name: 'ProfileLayout',
	components: { TopNavigation, ProfileRightSidebar, ProfileLeftSidebar }
})
</script>

<style lang="scss" scoped>
	.layout-side-left {
		width: 27.5% !important;
		border: none !important;
		padding-left: 3rem;
	}

	.layout-side-right {
		width: 25% !important;
	}
</style>
