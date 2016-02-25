const utils=require('../module/utils');

var assert = require('assert');
describe('TBot', function() {
  describe('#handleBotMessage', function () {
    it('Should handle each message received from Telegram Bot', function () {
        //setup
        const msg={};
        //exercise
        utils.handle(msg,bot);
        //verify
      assert.equal(true,false);
    });
  });
});
