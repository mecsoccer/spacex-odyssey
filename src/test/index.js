import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Tests for SpaceX Odyssey', () => {
  describe('Customer funds wallet', () => {
    it('#should return balance of 3000BTC', (done) => {
      chai.request(app)
        .patch('/api/v1/funds')
        .send({ customer_id: 1, amount: 3000 })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('balance').that.is.a('number').that.equals(3000);
          expect(res.body).to.have.property('status').that.equals('success');
          done();
        });
    });
  });

  describe('Customer makes a trip', () => {
    it('#should return a bill of 100BTC for a trip on falcon 9 from abuja to the moon', (done) => {
      chai.request(app)
        .post('/api/v1/transportation')
        .send({
          customer_id: 1,
          from: 'abuja',
          to: 'moon',
          rocket: 'falcon 9',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('bill').that.is.a('number').that.equals(100);
          expect(res.body).to.have.property('status').that.equals('success');
          done();
        });
    });
    it('#should return a bill of 250BTC for a trip on falcon 1 from the moon to spock(mars)', (done) => {
      chai.request(app)
        .post('/api/v1/transportation')
        .send({
          customer_id: 1,
          from: 'moon',
          to: 'spock',
          rocket: 'falcon 1',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('bill').that.is.a('number').that.equals(250);
          expect(res.body).to.have.property('status').that.equals('success');
          done();
        });
    });
    it('#should return a bill of 700BTC for a trip on falcon 9 from Mars to the ISS', (done) => {
      chai.request(app)
        .post('/api/v1/transportation')
        .send({
          customer_id: 1,
          from: 'spock',
          to: 'iss',
          rocket: 'falcon 9',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('bill').that.is.a('number').that.equals(700);
          expect(res.body).to.have.property('status').that.equals('success');
          done();
        });
    });
  });
  describe('Customer requests account balance', () => {
    it('should return a balance of 1950BTC', () => {
      chai.request(app)
        .get('/api/v1/funds/1')
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('balance').that.is.a('number').that.equals(1950);
          expect(res.body).to.have.property('status').that.equals('success');
        });
    });
  });
});
