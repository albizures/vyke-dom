// @vitest-environment jsdom
import { assertType, expect, it } from 'vitest'
import { on } from '.'

it('should return the off function', () => {
	on(window, 'mousemove', (event) => {
		assertType<MouseEvent>(event)
	})

	const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

	const blurOff = on(path, 'blur', (event) => {
		assertType<FocusEvent>(event)
	})

	expect(typeof blurOff).toBe('function')
})
