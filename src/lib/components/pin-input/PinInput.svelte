<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements"
	import styles from "./PinInput.module.css"
	import classMapUtil from "../../utils/classMapUtil.js"

	interface Props extends HTMLInputAttributes {}

	let {
		class: className = "",
		children,
		type,
		value,
		...rest
	}: Props = $props()

	const KEYBOARD = {
		CONTROL: "Control",
		COMMAND: "Meta",
		V: "v",
		TAB: "Tab",
		BACKSPACE: "Backspace",
		LEFT: "ArrowLeft",
		RIGHT: "ArrowRight"
	}

	let el: HTMLInputElement

	function handleKeyDown(event: KeyboardEvent) {
		const isMeta = event.ctrlKey || event.metaKey

		switch (event.key) {
			case KEYBOARD.BACKSPACE:
				if (
					!el.value &&
					el.previousElementSibling instanceof HTMLInputElement
				) {
					el.previousElementSibling.focus()
				}
				break

			case KEYBOARD.LEFT:
				event.preventDefault()
				if (el.previousElementSibling instanceof HTMLInputElement) {
					el.previousElementSibling.focus()
				}
				break

			case KEYBOARD.RIGHT:
				event.preventDefault()
				if (el.nextElementSibling instanceof HTMLInputElement) {
					el.nextElementSibling.focus()
				}
				break

			case KEYBOARD.V:
				if (isMeta) {
					return
				}
				break

			default:
				if (event.key.length > 1 || !el.validity.valid) {
					event.preventDefault()
				}
				break
		}
	}

	function handleInput(event: Event) {
		const input = event.target as HTMLInputElement
		if (input.value && input.nextElementSibling instanceof HTMLInputElement) {
			input.nextElementSibling.focus()
		}
	}
</script>

<input
	class={classMapUtil(className, [className, styles], styles.pinInput)}
	bind:this={el}
	type={type === "numeric" ? "number" : "text"}
	inputmode={type === "numeric" ? "numeric" : "text"}
	pattern={type === "numeric" ? "[0-9]{1}" : "^[a-zA-Z0-9]$"}
	maxlength="1"
	onkeydown={handleKeyDown}
	oninput={handleInput}
	placeholder="○"
	{...rest}
/>
