import { Given } from "cucumber";
import { testFunction} from "../../global_methods/helper";
const {logindata} = require("../../resources/logindata");
const loginPage = require("../page_elements/loginPage.page");
const cryptoJS = require('crypto-js');

Given(/^user has navigated to '(.*)' login page and provides credentials for '(.*)' login$/, async function (t, [userType, profile]) {
    switch(profile){
      case 'customer':
        //console.log(cryptoJS.AES.encrypt("demouser", "user@phptravels.com").toString());
        await testFunction.clearAndEnterText(t, loginPage.elements.txtfield_userName, logindata.customer.username);
        await testFunction.clearAndEnterText(t, loginPage.elements.txtfield_password, cryptoJS.AES.decrypt(logindata.customer.password, logindata.customer.username).toString(cryptoJS.enc.Utf8));
        await testFunction.click(t, loginPage.elements.btn_signInFrontEnd);
        console.log( "Sign In successful for " +profile);
        break;
      case 'agent':
        //console.log(cryptoJS.AES.encrypt("demoagent", "agent@phptravels.com").toString());
        await testFunction.clearAndEnterText(t, loginPage.elements.txtfield_userName, logindata.agent.username);
        await testFunction.clearAndEnterText(t, loginPage.elements.txtfield_password, cryptoJS.AES.decrypt(logindata.agent.password, logindata.agent.username).toString(cryptoJS.enc.Utf8));
        await testFunction.click(t, loginPage.elements.btn_signInFrontEnd);
        console.log( "Sign In successful for " +profile);
        break;
      case 'admin':
        //console.log(cryptoJS.AES.encrypt("demoadmin", "admin@phptravels.com").toString());
        await testFunction.clearAndEnterText(t, loginPage.elements.txtfield_userName, logindata.admin.username);
        await testFunction.clearAndEnterText(t, loginPage.elements.txtfield_password, cryptoJS.AES.decrypt(logindata.admin.password, logindata.admin.username).toString(cryptoJS.enc.Utf8));
        await testFunction.click(t, loginPage.elements.btn_signInBackEnd);
        console.log( "Sign In successful for " +profile);
        break;
      case 'supplier':
        //console.log(cryptoJS.AES.encrypt("demosupplier", "supplier@phptravels.com").toString());
        await testFunction.clearAndEnterText(t, loginPage.elements.txtfield_userName, logindata.supplier.username);
        await testFunction.clearAndEnterText(t, loginPage.elements.txtfield_password, cryptoJS.AES.decrypt(logindata.supplier.password, logindata.supplier.username).toString(cryptoJS.enc.Utf8));
        await testFunction.click(t, loginPage.elements.btn_signInBackEnd);
        console.log( "Sign In successful for " +profile);
        break;
      default:
        console.log( "wrong" +userType+ "selected");
        break;
    }
  });