"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleFormState_1 = require("../SimpleFormState");
var chai_1 = require("chai");
require("mocha");
describe('SimpleFormState undefined tests', function () {
    var a = {};
    it('getValues() should be the initial state if we do nothing', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        chai_1.expect(fsa.getValues()).to.deep.equal(a);
    });
    it('should not be mutable', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.set('name', 'Changed');
        chai_1.expect(fsa.getValues()).to.deep.equal(a);
        chai_1.expect(fsa2.getValues()).to.not.deep.equal(a);
        chai_1.expect(fsa2.getValues().name).to.equal('Changed');
    });
    it('object subs', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.subProperty('c');
        chai_1.expect(fsa2).to.be.undefined;
        var fsa3 = fsa.set('c', {
            contents: 'Created'
        });
        chai_1.expect(fsa.getValues()).to.deep.equal(a);
        chai_1.expect(fsa3.getValues().c).to.not.be.undefined;
        chai_1.expect(fsa3.getValues().c).to.deep.equal({ contents: 'Created' });
        var fsa4 = fsa3.subProperty('c');
        chai_1.expect(fsa4).to.not.be.undefined;
        var fsa5 = fsa4.set('contents', 'Changed');
        chai_1.expect(fsa5.getValues()).to.deep.equal({ contents: 'Changed' });
    });
    it('object subs with default value', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.subProperty('c', { contents: 'Original' });
        chai_1.expect(fsa2).to.not.be.undefined;
        chai_1.expect(fsa2.get('contents')).to.equal('Original');
    });
    it('object sub should merge', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = new SimpleFormState_1.SimpleFormState({ contents: 'Original' });
        var fsa3 = fsa2.set('contents', 'Changed');
        chai_1.expect(fsa3.getValues().contents).to.equal('Changed');
        var fsa4 = fsa.mergeProperty('c', fsa3.getValues());
        chai_1.expect(fsa.getValues()).to.deep.equal(a);
        chai_1.expect(fsa4.getValues()).to.not.deep.equal(a);
        chai_1.expect(fsa4.getValues().c.contents).to.equal('Changed');
    });
    it('array subs', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.subIndexProperty('bs', 0);
        chai_1.expect(fsa2).to.be.undefined;
    });
    it('array subs empty array', function () {
        var a = {
            bs: []
        };
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.subIndexProperty('bs', 0);
        chai_1.expect(fsa2).to.be.undefined;
    });
    it('array subs undefined array push', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        chai_1.expect(fsa.subIndexProperty('bs', 0)).to.be.undefined;
        var fsa2 = fsa.push('bs', {
            title: 'Created',
            count: 9,
        });
        chai_1.expect(fsa.getValues()).to.deep.equal(a);
        chai_1.expect(fsa2.getValues().bs).to.deep.equal([{ title: 'Created', count: 9 }]);
        var fsa3 = fsa2.subIndexProperty('bs', 0);
        chai_1.expect(fsa3).to.not.be.undefined;
    });
    it('array subs empty array push', function () {
        var a = {
            bs: []
        };
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        chai_1.expect(fsa.subIndexProperty('bs', 0)).to.be.undefined;
        var fsa2 = fsa.push('bs', {
            title: 'Created',
            count: 9,
        });
        chai_1.expect(fsa.getValues()).to.deep.equal(a);
        chai_1.expect(fsa2.getValues().bs).to.deep.equal([{ title: 'Created', count: 9 }]);
        var fsa3 = fsa2.subIndexProperty('bs', 0);
        chai_1.expect(fsa3).to.not.be.undefined;
    });
    it('array sub should merge', function () {
        var fsa = new SimpleFormState_1.SimpleFormState(a);
        var fsa2 = fsa.push('bs', {
            title: 'Created',
            count: 9,
        });
        var fsa3 = fsa2.subIndexProperty('bs', 0);
        var fsa4 = fsa3.set('title', 'Changed');
        var fsa5 = fsa.mergeIndexProperty('bs', 0, fsa4.getValues());
        chai_1.expect(fsa5.getValues()).to.deep.equal({
            bs: [{
                    title: 'Changed',
                    count: 9,
                }]
        });
    });
});
