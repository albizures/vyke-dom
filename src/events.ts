type Target = Window | Element

type EventName<TElement extends Target> = TElement['addEventListener'] extends
{
	(type: infer TName, listener: (this: TElement, event: infer TEvent) => void): any
	(type: string, listener: (this: TElement, event: unknown) => void): any
} ? [TName, TEvent] : never

export function on<TElement extends Target>(element: TElement, eventName: EventName<TElement>[0], fn: (event: EventName<TElement>[1]) => void) {
	element.addEventListener(eventName as string, fn)

	return () => {
		off(element, eventName as string, fn)
	}
}

export function off<TElement extends Target>(element: TElement, eventName: EventName<TElement>[0], fn: (event: EventName<TElement>[1]) => void) {
	element.removeEventListener(eventName as string, fn)
}
