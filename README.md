<div align="center">
	<h1>
		@vyke/dom
	</h1>
</div>
Functional and tiny (<1kb) functions to query dom in a safe and easy way TypeScript friendly.

## Installation
```sh
# @vyke/results is a peer dependency
npm i @vyke/dom @vyke/results
```

## Examples
```ts
import { r } from '@vyke/results/r'
import { query, select } from '@vyke/dom'

const [app] = r.unwrap(select(
	query<HTMLDivElement>('#app'),
))

console.log(app)
//           ^? HTMLDivElement
```

Querying inside an specific element
```ts
import { r } from '@vyke/results/r'
import { query, selectIn } from '@vyke/dom'

const [submitBtn] = r.unwrap(selectIn(
	form,
	query<HTMLButtonElement>('#submit'),
))

console.log(submitBtn)
//             ^? HTMLButtonElement
```

## API


# Inspiration and Credits
 -
