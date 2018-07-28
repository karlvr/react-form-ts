import { SimpleFormState } from '../SimpleFormState'
import { expect } from 'chai'
import 'mocha'
import { ArrayProperties, ArrayKeys } from '../types';

interface A {
	name?: string
	bs?: B[]
	c?: C
}

interface B {
	title: string
	count: number
}

interface C {
	contents: string
}

type X = ArrayProperties<A>
type X2 = ArrayKeys<A>

type XX = keyof X
type Y = Required<A>
type XXX = ArrayProperties<A>[keyof A]

describe('SimpleFormState undefined tests', () => {
	const a: A = {
		
	}

	it('getValues() should be the initial state if we do nothing', () => {
		const fsa = new SimpleFormState(a)
		expect(fsa.getValues()).to.deep.equal(a)
	})

	it('should not be mutable', () => {
		const fsa = new SimpleFormState(a)
		const fsa2 = fsa.set('name', 'Changed')
		expect(fsa.getValues()).to.deep.equal(a)
		expect(fsa2.getValues()).to.not.deep.equal(a)
		expect(fsa2.getValues().name).to.equal('Changed')
	})

	it('object subs', () => {
		const fsa = new SimpleFormState(a)
		const fsa2 = fsa.subProperty('c')
		expect(fsa2).to.be.undefined

		const fsa3 = fsa.set('c', {
			contents: 'Created'
		})
		expect(fsa.getValues()).to.deep.equal(a)
		expect(fsa3.getValues().c).to.not.be.undefined;
		expect(fsa3.getValues().c).to.deep.equal({ contents: 'Created' });

		const fsa4 = fsa3.subProperty('c')
		expect(fsa4).to.not.be.undefined

		const fsa5 = fsa4!.set('contents', 'Changed')
		expect(fsa5.getValues()).to.deep.equal({ contents: 'Changed' })
	})

	it('object sub should merge', () => {
		const fsa = new SimpleFormState(a)
		const fsa2 = new SimpleFormState<C>({ contents: 'Original' })
		const fsa3 = fsa2.set('contents', 'Changed')

		expect(fsa3.getValues().contents).to.equal('Changed')
		const fsa4 = fsa.mergeProperty('c', fsa3.getValues())
		expect(fsa.getValues()).to.deep.equal(a)
		expect(fsa4.getValues()).to.not.deep.equal(a)
		expect(fsa4.getValues().c!.contents).to.equal('Changed')
	})

	it('array subs', () => {
		const fsa = new SimpleFormState(a)
		const fsa2 = fsa.subIndexProperty('bs', 0)
		expect(fsa2).to.be.undefined
	})

	it('array subs empty array', () => {
		const a: A = {
			bs: []
		}
		const fsa = new SimpleFormState(a)
		const fsa2 = fsa.subIndexProperty('bs', 0)
		expect(fsa2).to.be.undefined
	})

	it('array subs undefined array push', () => {
		const fsa = new SimpleFormState(a)
		expect(fsa.subIndexProperty('bs', 0)).to.be.undefined
		const fsa2 = fsa.push('bs', {
			title: 'Created',
			count: 9,
		})

		expect(fsa.getValues()).to.deep.equal(a)
		expect(fsa2.getValues().bs).to.deep.equal([{title: 'Created', count: 9}])

		const fsa3 = fsa2.subIndexProperty('bs', 0)!
		expect(fsa3).to.not.be.undefined
	})

	it('array subs empty array push', () => {
		const a: A = {
			bs: []
		}
		const fsa = new SimpleFormState(a)
		expect(fsa.subIndexProperty('bs', 0)).to.be.undefined
		const fsa2 = fsa.push('bs', {
			title: 'Created',
			count: 9,
		})

		expect(fsa.getValues()).to.deep.equal(a)
		expect(fsa2.getValues().bs).to.deep.equal([{title: 'Created', count: 9}])

		const fsa3 = fsa2.subIndexProperty('bs', 0)!
		expect(fsa3).to.not.be.undefined
	})

	it('array sub should merge', () => {
		const fsa = new SimpleFormState(a)
		const fsa2 = fsa.push('bs', {
			title: 'Created',
			count: 9,
		})

		const fsa3 = fsa2.subIndexProperty('bs', 0)!
		const fsa4 = fsa3.set('title', 'Changed')
		const fsa5 = fsa.mergeIndexProperty('bs', 0, fsa4.getValues())

		expect(fsa5.getValues()).to.deep.equal({
			bs: [{
				title: 'Changed',
				count: 9,
			}]
		})
	})

})
