const {config} = require('../../resources/resource');
import {Selector} from 'testcafe';

const loginPage = {
  elements: {
    txtfield_userName: Selector("input").withAttribute("name","email"),
    txtfield_password: Selector("input").withAttribute("name","password"),
    btn_signInFrontEnd: Selector("[class*='ladda-label']").withText("Login"),
    btn_signInBackEnd: Selector("form [class*='ladda-button'] [class*='ladda-label']")
  }
};

module.exports = loginPage;