<template>
	<form class="formStyle d-flex flex-column py-2 px-2" @submit.prevent="createMessage">
		<h3>Contact Us</h3>

		<div class="col-12 py-0 px-0 d-flex flex-row flex-wrap" style="align-items: center;">
			<div class="col-lg-5 col-12 d-flex flex-column mb-1 mb-lg-0">
				<div>
					<sup style="color: red;">*</sup><span class="formLabel">First Name</span>
				</div>
				<div>
					<input
						id="first_name"
						v-model="factory.fName"
						class="form-control"
						placeholder="John"
						:class="{'is-invalid': factory.errors.fName, 'is-valid': factory.isValid('fName')}"
					>
					<small v-if="factory.errors.fName" class="small text-danger d-block">{{ factory.errors.fName }}</small>
				</div>
			</div>
			<div class="col-lg-2 d-none d-lg-block" />
			<div class="col-lg-5 col-12 d-flex flex-row">
				<div class="d-flex flex-column ml-auto" style="width: 100%;">
					<div>
						<sup style="color: red;">*</sup><span class="formLabel">Last Name</span>
					</div>
					<div>
						<input
							id="last_name"
							v-model="factory.lName"
							class="form-control"
							placeholder="Smith"
							:class="{'is-invalid': factory.errors.lName, 'is-valid': factory.isValid('lName')}"
						>
						<small v-if="factory.errors.lName" class="small text-danger d-block">{{ factory.errors.lName }}</small>
					</div>
				</div>
			</div>
		</div>

		<div class="col-12 py-1 px-0 d-flex flex-row" style="align-items: center;">
			<div class="col-12 px-0 py-0 d-flex flex-column">
				<div>
					<sup style="color: red;">*</sup><span class="formLabel">Email</span>
				</div>
				<div>
					<input
						id="email"
						v-model="factory.email"
						class="form-control"
						type="email"
						placeholder="johnsmith@gmail.com"
						:class="{'is-invalid': factory.errors.name, 'is-valid': factory.isValid('email')}"
					>
					<small v-if="factory.errors.email" class="small text-danger d-block">{{ factory.errors.email }}</small>
				</div>
			</div>
		</div>

		<div class="col-12 py-1 px-0 d-flex flex-row" style="align-items: center;">
			<div class="col-12 px-0 py-0 d-flex flex-column">
				<div>
					<sup style="color: red;">*</sup><span class="formLabel">Message</span>
				</div>
				<div>
					<textarea
						id="message"
						v-model="factory.message"
						class="form-control"
						rows="4"
						:class="{'is-invalid': factory.errors.message, 'is-valid': factory.isValid('message')}"
						placeholder="I love Stranerd"
					/>
					<small v-if="factory.errors.message" class="small text-danger d-block">{{ factory.errors.message }}</small>
				</div>
			</div>
		</div>

		<div class="col-12">
			<button class="btn btn btn-lg btn-custom" style="width: 100%;" type="submit" :disabled="loading || !factory.valid">
				<PageLoading v-if="loading" />
				<span>Send Message</span>
			</button>
		</div>

		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateMessage } from '@app/hooks/forms/messages'
export default defineComponent({
	name: 'MessageForm',
	setup () {
		const { factory, loading, error, createMessage } = useCreateMessage()
		return { factory, loading, error, createMessage }
	}
})
</script>

<style lang="scss" scoped>
	h3 {
		margin-bottom: 1.5rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid $color-line;
	}

	input, textarea {
		border: 2px solid $color-sub;
		border-radius: 6px;
		font-size: 14px;
		color: $color-sub;
	}

	.formStyle {
		border: 2px solid $color-sub;
		border-radius: 10px;
	}

	.formLabel {
		font-size: 15px;
		font-weight: bold;
	}

	.btn-custom {
		background-color: $color-primary-dark;
		color: $color-white;
		border: 2px solid $color-primary-dark;
		border-radius: 6px;
		font-size: 15px;
		font-weight: bold;
	}
</style>
