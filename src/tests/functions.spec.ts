import { mergeObjects, deepMergeObjects } from '../functions'
import { expect } from 'chai'
import 'mocha'

interface A {
	a?: number,
	b: {
		c: string
		d?: string
	}
	c?: string
}

describe('functions', () => {
	
	it('mergeObjects', () => {
		const a: A = {
			a: 1,
			b: {
				c: 'horse',
				d: 'donkey',
			},
			c: 'house',
		}
		const b: A = {
			b: {
				c: 'cat',
			}
		}

		const c = mergeObjects(a, b)
		expect(c).to.not.deep.equal(a)
		expect(c).to.not.deep.equal(b)
		expect(c).to.deep.equal({
			a: 1,
			b: {
				c: 'cat',
			},
			c: 'house',
		})
	})

	it('deepMergeObjects', () => {
		const a: A = {
			a: 1,
			b: {
				c: 'horse',
				d: 'donkey',
			},
			c: 'house',
		}
		const b: A = {
			b: {
				c: 'cat',
			}
		}

		const c = deepMergeObjects(a, b)
		expect(c).to.not.deep.equal(a)
		expect(c).to.not.deep.equal(b)
		expect(c).to.deep.equal({
			a: 1,
			b: {
				c: 'cat',
				d: 'donkey',
			},
			c: 'house',
		})
	})

})
