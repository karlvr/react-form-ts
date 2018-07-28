import { PatchFormState } from '../PatchFormState'
import { expect } from 'chai'
import 'mocha'

interface A {
	name: string
	bs: B[]
	c: C
}

interface B {
	title: string
	count: number
}

interface C {
	contents: string
}

interface AA {
	name?: string
	bs?: BB[]
	c?: CC
}

interface BB {
	title?: string
	count?: number
}

interface CC {
	contents?: string
}

describe('PatchFormState tests', () => {
	const a: A = {
		name: 'My name',
		bs: [{
			title: 'My first title',
			count: 7,
		}],
		c: {
			contents: 'Deep',
		}
	}

	const aa: AA = {}

	it('getValues() should be empty when we\'ve done nothing', () => {
		const fsa = new PatchFormState(a, aa)
		expect(fsa.getValues()).to.deep.equal({})
	})

	it('should not be mutable', () => {
		const fsa = new PatchFormState(a, aa)
		const fsa2 = fsa.set('name', 'Changed')
		expect(fsa.getValues()).to.deep.equal({})
		expect(fsa2.getValues()).to.not.deep.equal({})
		expect(fsa2.getValues().name).to.equal('Changed')
	})

	it('object subs should not be mutable', () => {
		const fsa = new PatchFormState(a, aa)
		const fsa2 = fsa.subProperty('c')
		const fsa3 = fsa2.set('contents', 'Changed')
		expect(fsa.getValues()).to.deep.equal({})
		expect(fsa2.getValues()).to.deep.equal({})
		expect(fsa3.getValues()).to.not.deep.equal({})
		expect(fsa3.getValues().contents).to.equal('Changed')
	})

	it('object sub should merge', () => {
		const fsa = new PatchFormState(a, aa)
		const fsa2 = fsa.subProperty('c')
		const fsa3 = fsa2.set('contents', 'Changed')

		expect(fsa3.getValues().contents).to.equal('Changed')
		const fsa4 = fsa.mergeProperty('c', fsa3.getValues())
		expect(fsa.getValues()).to.deep.equal({})
		expect(fsa4.getValues()).to.not.deep.equal({})
		expect(fsa4.getValues().c.contents).to.equal('Changed')
	})

	it('array subs should not be mutable', () => {
		const fsa = new PatchFormState(a, aa)
		const fsa2 = fsa.subIndexProperty('bs', 0)
		const fsa3 = fsa2.set('title', 'Changed')

		expect(fsa.getValues()).to.deep.equal({})
		expect(fsa2.getValues()).to.deep.equal({})
		expect(fsa3.getValues()).to.not.deep.equal({})
		expect(fsa3.getValues().title).to.equal('Changed')
	})

	it('array sub should merge', () => {
		const fsa = new PatchFormState(a, aa)
		const fsa2 = fsa.subIndexProperty('bs', 0)
		const fsa3 = fsa2.set('title', 'Changed')

		expect(fsa3.getValues().title).to.equal('Changed')
		const fsa4 = fsa.mergeIndexProperty('bs', 0, fsa3.getValues())
		expect(fsa.getValues()).to.deep.equal({})
		expect(fsa4.getValues()).to.not.deep.equal({})
		expect(fsa4.getValues().bs[0].title).to.equal('Changed')
	})

})
