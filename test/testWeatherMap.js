const request = require('supertest')("https://api.openweathermap.org");
var expecttedSchemajson = require('./weatherschema.json');
const {expect} = require("chai").use(require('chai-json-schema'));

describe('Weather map Api Test', () => {
    it('Verify basic functions of  API', () => {
        return request.get('/data/2.5/onecall').query({
            lat: -33.865143,
            lon: 151.209900,
            exclude:'hourly,minutely,current',
            appid:'e57504c33cd535368579e3b25d74cf00',
            units:'metric'
           }).then((res) => {
            expect(res.statusCode).to.be.eql(200);
            expect(res.body.timezone).to.be.eql('Australia/Sydney');
            expect(res.body.lat).to.be.eql(-33.8651);
            expect(res.body.lon).to.be.eql(151.2099);
            expect(res.body).to.be.jsonSchema(expecttedSchemajson)
    
        });
    });

    it('Verify Temprature', () => {
        return request.get('/data/2.5/onecall').query({
            lat: -33.865143,
            lon: 151.209900,
            exclude:'hourly,minutely,current',
            appid:'e57504c33cd535368579e3b25d74cf00',
            units:'metric'
           }).then((res) => {
            var list =[];   
            var weatheList =[];   

            expect(res.statusCode).to.be.eql(200);
            expect(res.body.timezone).to.be.eql('Australia/Sydney');
            for(i=0;i<res.body.daily.length;i++){
                console.log('.....Weather condition   ...'+res.body.daily[i].weather[0].main)
                if(res.body.daily[i].temp.day>=21){
                    console.log('.....My Day is   ...'+res.body.daily[i].dt)
                    list.push(res.body.daily[i].temp.day);

                }
                if(res.body.daily[i].weather[0].main=='clear'){
                    weatheList.push(res.body.daily[i].weather[0].main)
                }
            }
         //verify temprature is greater than 21 for more than one day   
          expect(list.length).to.be.greaterThan(1)

        //verify weather condition is clear for more than a day
          expect(weatheList.length,'wether condition clear days are not available').to.be.greaterThan(1)

        });
    });

})