/**
 * helper function to handle events
 * @module events
 */

type Handler<TEvent> = (event: TEvent) => unknown

type GetEventMap<TTarget, TOptions> =
	TOptions extends [[infer TType, infer TMap], ...infer TTail]
		? TTarget extends TType
			? TMap
			: GetEventMap<TTarget, TTail>
		: TOptions extends [[infer TType, infer TMap]]
			? TTarget extends TType
				? TMap
				: never
			: never

type Options = [
	[HTMLElement, HTMLElementEventMap],
	[Window, WindowEventMap],
	[Document, DocumentEventMap],
	[SVGElement, SVGElementEventMap],
	[MediaQueryList, MediaQueryListEventMap],
]

type EventMap<TTarget> = GetEventMap<TTarget, Options>

type Target = Options[number][0]

/**
 * Add an event listener to a target
 * @example
 * ```ts
 * const button = document.createElement('button')
 * on(button, 'click', () => console.log('clicked'))
 * ```
 *
 */
export function on<
	TTarget extends Target,
	TEventName extends keyof EventMap<TTarget>,
	THandler extends Handler<EventMap<TTarget>[TEventName]>,
>(target: TTarget, eventName: TEventName, handler: THandler): () => void {
	target.addEventListener(eventName as string, handler as unknown as Handler<Event>)

	return () => {
		off(target, eventName, handler)
	}
}

/**
 * Remove an event listener from a target
 * @example
 * ```ts
 * const button = document.createElement('button')
 * const handler = () => console.log('clicked')
 * on(button, 'click', handler)
 * off(button, 'click', handler)
 * ```
 */
export function off<
	TTarget extends Target,
	TEventName extends keyof EventMap<TTarget>,
	THandler extends Handler<EventMap<TTarget>[TEventName]>,
>(target: TTarget, eventName: TEventName, handler: THandler) {
	target.removeEventListener(eventName as string, handler as unknown as Handler<Event>)
}
