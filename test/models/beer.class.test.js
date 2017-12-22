const { expect, knex, _ } = require('../common.test');

const Beer = require('../../api/models/beer.model');
const BeerSeeder = require('../seeders/beer.seeder');

let beer;
let beers;
let rows;

before(async function () {
    try {
        beer = new Beer();
        expect(beer).to.be.a('object');

        expect(Beer.getPrimaryKey).to.exist;
        expect(Beer.getTableName).to.exist;
        expect(Beer.getDbProperties).to.exist;
        expect(Beer.getOne).to.exist;
        expect(beer._init).to.exist;
        expect(beer.save).to.exist;
        expect(beer.delete).to.exist;
        expect(beer.update).to.exist;
        expect(beer.getAll).to.exist;

        expect(BeerSeeder.getTableName).to.exist;
        expect(BeerSeeder.generateCategoryObject).to.exist;
        expect(BeerSeeder.generateCategoryData).to.exist;
        expect(BeerSeeder.upData).to.exist;
        expect(BeerSeeder.downData).to.exist;

        await BeerSeeder.upData();
    } catch (e) {
        expect(e).to.be.empty;
    }
});