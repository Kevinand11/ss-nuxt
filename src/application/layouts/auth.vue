<template>
	<section class="layout-page">
		<HomeTopNavigation />
		<section class="layout-body">
			<main class="layout-main">
				<Nuxt />
			</main>
			<ModalBase />
		</section>
	</section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import HomeTopNavigation from '@app/components/layouts/topNavigations/HomeTopNavigation.vue'
export default defineComponent({
	name: 'AuthLayout',
	components: { HomeTopNavigation }
})
</script>

<style lang="scss" scoped>
	.layout-body {
		max-width: 1440px;
	}
</style>
