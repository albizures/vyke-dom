type Handler<TEvent> = (event: TEvent) => unknown

type EventMap<TTarget> =
	TTarget extends Window
		? WindowEventMap
		: TTarget extends Document
			? DocumentEventMap
			: TTarget extends SVGElement
				? SVGElementEventMap
				: TTarget extends HTMLElement
					? HTMLElementEventMap
					: never

type Target = Window | Document | SVGElement | HTMLElement

export function on<
	TTarget extends Target,
	TEventName extends keyof EventMap<TTarget>,
	THandler extends Handler<EventMap<TTarget>[TEventName]>,
>(target: TTarget, eventName: TEventName, handler: THandler) {
	target.addEventListener(eventName as string, handler as unknown as Handler<Event>)

	return () => {
		off(target, eventName, handler)
	}
}

export function off<
TTarget extends Target,
TEventName extends keyof EventMap<TTarget>,
THandler extends Handler<EventMap<TTarget>[TEventName]>,
>(target: TTarget, eventName: TEventName, handler: THandler) {
	target.removeEventListener(eventName as string, handler as unknown as Handler<Event>)
}
