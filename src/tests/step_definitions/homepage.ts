import { Given } from "cucumber";
import { testFunction} from "../../global_methods/helper";

const homePage = require("../page_elements/landingPage.page");
import {UserType} from "../../global_methods/helper";
import cryptoJS from 'crypto-js';

Given(/^user has navigated to '(.*)' login page$/, async function (t, [userType]) {
    if (userType === UserType.CUSTOMER_FRONT_END) {
      await testFunction.isElementDisplayed(t, homePage.elements.link_customerFrontEnd);
      await testFunction.click(t, homePage.elements.link_customerFrontEnd);
    } else if (userType === UserType.AGENT_FRONT_END) {
      await testFunction.click(t, homePage.elements.link_agentFrontEnd);
    }else if (userType === UserType.ADMIN_BACKEND) {
      await testFunction.click(t, homePage.elements.link_adminBackEnd);
    }else if (userType === UserType.SUPPLIER_BACKEND) {
      await testFunction.click(t, homePage.elements.link_supplierBackEnd);
    }
    console.log("user has navigated to " +userType+ " login page");
  });
