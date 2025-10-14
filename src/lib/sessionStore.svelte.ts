export function createSessionStore<T>(key: string, initialValue: T) {
	let value = $state<T>(
		typeof window !== "undefined" && sessionStorage.getItem(key)
			? JSON.parse(sessionStorage.getItem(key)!)
			: initialValue,
	)

	$effect(() => {
		sessionStorage.setItem(key, JSON.stringify(value))
	})

	return {
		get value() {
			return value
		},
		set value(newValue: T) {
			value = newValue
		},
	}
}
