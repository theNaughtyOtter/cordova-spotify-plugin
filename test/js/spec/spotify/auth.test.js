describe('auth', function() {
  describe('#authenticate', function() {
    describe('succesful authentication', function() {
      beforeEach(function() {
        this.callback = sinon.spy();
        this.onRequest = sinon.spy();
        this.result = {username: 'antman', credential: 'Xcd4r234234fdfa_dfsadf3', expirationDate: 234234234};
        mockExec(1, this.result, this.onRequest);
      });

      describe('without scope', function() {
        beforeEach(function() {
          spotify.authenticate('aRandomClientId1234', 'http://tok.en', this.callback);
        });

        it('should send the "streaming" scope to native', function() {
          expect(this.onRequest).to.have.been.calledWith([
            'SpotifyPlugin', 'authenticate', ['aRandomClientId1234', 'http://tok.en', ['streaming']]
          ]);

          expect(this.callback).to.have.been.calledWith(null, this.result);
        });
      });

      describe('with scope', function() {
        beforeEach(function() {
          spotify.authenticate('aRandomClientId1234', 'http://tok.en', ['somescope'], this.callback);
        });

        it('should send the "somescope" scope to native', function() {
          expect(this.onRequest).to.have.been.calledWith([
            'SpotifyPlugin', 'authenticate', ['aRandomClientId1234', 'http://tok.en', ['somescope']]
          ]);

          expect(this.callback).to.have.been.calledWith(null, this.result);
        });
      });
    });

    describe('failed authentication', function() {
      beforeEach(function() {
        this.callback = sinon.spy();
        this.onRequest = sinon.spy();
        mockExec(9, 'failed to authenticate', this.onRequest);
        spotify.authenticate('aRandomClientId1234', 'http://tok.en', this.callback);
      });

      it('should send back an error message', function() {
        expect(this.callback).to.have.been.calledWith('failed to authenticate');
      });
    });
  });
});
