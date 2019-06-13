"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PatchFormState_1 = require("../PatchFormState");
var chai_1 = require("chai");
require("mocha");
describe('PatchFormState tests', function () {
    var a = {
        name: 'My name',
        bs: [{
                title: 'My first title',
                count: 7,
            }],
        c: {
            contents: 'Deep',
        }
    };
    var aa = {};
    it('getValues() should be empty when we\'ve done nothing', function () {
        var fsa = new PatchFormState_1.PatchFormState(a, aa);
        chai_1.expect(fsa.getValues()).to.deep.equal({});
    });
    it('should not be mutable', function () {
        var fsa = new PatchFormState_1.PatchFormState(a, aa);
        var fsa2 = fsa.set('name', 'Changed');
        chai_1.expect(fsa.getValues()).to.deep.equal({});
        chai_1.expect(fsa2.getValues()).to.not.deep.equal({});
        chai_1.expect(fsa2.getValues().name).to.equal('Changed');
    });
    it('object subs should not be mutable', function () {
        var fsa = new PatchFormState_1.PatchFormState(a, aa);
        var fsa2 = fsa.subProperty('c');
        var fsa3 = fsa2.set('contents', 'Changed');
        chai_1.expect(fsa.getValues()).to.deep.equal({});
        chai_1.expect(fsa2.getValues()).to.deep.equal({});
        chai_1.expect(fsa3.getValues()).to.not.deep.equal({});
        chai_1.expect(fsa3.getValues().contents).to.equal('Changed');
    });
    it('object sub should merge', function () {
        var fsa = new PatchFormState_1.PatchFormState(a, aa);
        var fsa2 = fsa.subProperty('c');
        var fsa3 = fsa2.set('contents', 'Changed');
        chai_1.expect(fsa3.getValues().contents).to.equal('Changed');
        var fsa4 = fsa.mergeProperty('c', fsa3.getValues());
        chai_1.expect(fsa.getValues()).to.deep.equal({});
        chai_1.expect(fsa4.getValues()).to.not.deep.equal({});
        chai_1.expect(fsa4.getValues().c.contents).to.equal('Changed');
    });
    it('array subs should not be mutable', function () {
        var fsa = new PatchFormState_1.PatchFormState(a, aa);
        var fsa2 = fsa.subIndexProperty('bs', 0);
        var fsa3 = fsa2.set('title', 'Changed');
        chai_1.expect(fsa.getValues()).to.deep.equal({});
        chai_1.expect(fsa2.getValues()).to.deep.equal({});
        chai_1.expect(fsa3.getValues()).to.not.deep.equal({});
        chai_1.expect(fsa3.getValues().title).to.equal('Changed');
    });
    it('array sub should merge', function () {
        var fsa = new PatchFormState_1.PatchFormState(a, aa);
        var fsa2 = fsa.subIndexProperty('bs', 0);
        var fsa3 = fsa2.set('title', 'Changed');
        chai_1.expect(fsa3.getValues().title).to.equal('Changed');
        var fsa4 = fsa.mergeIndexProperty('bs', 0, fsa3.getValues());
        chai_1.expect(fsa.getValues()).to.deep.equal({});
        chai_1.expect(fsa4.getValues()).to.not.deep.equal({});
        chai_1.expect(fsa4.getValues().bs[0].title).to.equal('Changed');
    });
    it('set patch same as source should leave patch undefined', function () {
        var fsa = new PatchFormState_1.PatchFormState(a, aa);
        var fsa2 = fsa.set('name', 'Changed');
        chai_1.expect(fsa2.getValues()).to.deep.equal({ name: 'Changed' });
        var fsa3 = fsa2.set('name', a.name);
        chai_1.expect(fsa3.getValues()).to.deep.equal({});
    });
});
