export function create_local_store<T>(key: string, initial_value: T) {
	let value = $state<T>(
		typeof window !== "undefined" && localStorage.getItem(key)
			? JSON.parse(localStorage.getItem(key)!)
			: initial_value,
	)

	$effect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	})

	return {
		get value() {
			return value
		},
		set value(new_value: T) {
			value = new_value
		},
	}
}

export function clear_local_store(key: string) {
	if (typeof window !== undefined) {
		localStorage.removeItem(key)
	}
}
