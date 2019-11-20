import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Tests for SpaceX Odyssey', () => {
  describe('Customer funds wallet', () => {
    it('#customer should be able to fund wallet', (done) => {
      chai.request(app)
        .post('/api/v1/funding')
        .send({ customer_id: 1, amount: 3000 })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('balance').that.is.a('number');
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
          expect(res.status).to.equal(400);
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
          expect(res.status).to.equal(400);
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
          to: 'ISS',
          rocket: 'falcon 9',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('bill').that.is.a('number').that.equals(700);
          expect(res.body).to.have.property('status').that.equals('success');
          done();
        });
    });
  });
});
