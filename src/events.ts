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

type AnyHandler = (event: Event) => void
type Off = () => void

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
	THandler extends Handler<EventMap<TTarget>[TEventName]>
>(target: TTarget, eventName: TEventName, handler: THandler): Off
export function on<TTarget extends Target>(target: TTarget, eventName: string, handler: AnyHandler): Off
export function on(target: Target, eventName: string, handler: AnyHandler): Off {
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
	THandler extends Handler<EventMap<TTarget>[TEventName]>
>(target: TTarget, eventName: TEventName, handler: THandler): void
export function off<TTarget extends Target>(target: TTarget, eventName: string, handler: AnyHandler): void
export function off(target: Target, eventName: string, handler: AnyHandler): void {
	target.removeEventListener(eventName as string, handler as unknown as Handler<Event>)
}
