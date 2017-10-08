/**
 * Created by 23tl on 2017/4/9.
 */
/*var expect = require('chai').expect;
describe('webdriver.io api page', function() {
    it('should be able to filter for commands', function () {
        browser.url('http://webdriver.io/api.html');
        // filtering property commands
        $('.searchbar input').setValue('getT');
        // get all results that are displayed
        var results = $$('.commands.property a').filter(function (link) {
            return link.isVisible();
        });
        // assert number of results
        expect(results.length).to.be.equal(3);
        // check out second result
        results[1].click();
        expect($('.doc h1').getText()).to.be.equal('GETTEXT');
    });
});*/

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

driver.get('http://www.google.com/ncr');
driver.findElement(By.name('q')).sendKeys('webdriver');
driver.findElement(By.name('btnG')).click();
driver.wait(until.titleIs('webdriver - Google Search'), 1000);
driver.quit();