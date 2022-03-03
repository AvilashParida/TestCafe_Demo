const {config} = require('../../resources/resource');
import {Selector} from 'testcafe';

const homePage = {
  pageUrl: config.baseUrl,
  elements: {
    //link_customerFrontEnd: Selector("a[href*='//www.phptravels.net/login']").withText(" Customer - Front-End "),
    link_customerFrontEnd: Selector("a[href*='//www.phptravels.net/login']").nth(0),
    link_agentFrontEnd: Selector("a[href*='//www.phptravels.net/login']").nth(1),
    link_adminBackEnd: Selector("a[href*='//www.phptravels.net/admin']").nth(0),
    link_supplierBackEnd: Selector("a[href*='//www.phptravels.net/supplier']").nth(0),
  }
};

module.exports = homePage;
