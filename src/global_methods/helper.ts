import {ClientFunction, RequestLogger, Selector, t} from 'testcafe';
import { FileUtils } from './FileUtils';
import {fetchBrowser, getDateTime, screenshotFolder, width} from '../tests/step_definitions/hooks';

const fs = require("mz/fs");
//const requestLoggerUtils = new requestLoggerUtilities();
const replace = {replace: true};
const {config} = require('../resources/resource');
const resemble = require("resemblejs");
const screenshot = config.screenshot;
const eaHomePage = config.eaCampaignUrl;
let logger = null;
const deviceScreenSize = config.deviceScreenSize;

export enum UserType {
  CUSTOMER_FRONT_END = 'Customer Front-End',
  AGENT_FRONT_END = 'Agent Front-End',
  ADMIN_BACKEND = 'Admin Back-End',
  SUPPLIER_BACKEND = 'Supplier Back-End'
}

/*export const scrollTo = ClientFunction((selector: Selector, offset?: { x: number; y: number }) => {
  const _window = window;
  return new Promise(resolve => {
    const element: any = selector();
    element.scrollIntoView();

    if (offset) {
      _window.scrollBy(offset.x, offset.y);
    }

    resolve();
  });
});*/

export const setAttribute = ClientFunction((selector, propertyName, propertyValue) => {
  let element = document.querySelector(selector);

  element.setAttribute(propertyName, propertyValue);
});

export const setLocalStorageItem = ClientFunction((prop, value) => {
  localStorage.setItem(prop, value);
});

export const getLocalStorageItem = ClientFunction(prop => {
  return localStorage.getItem(prop);
});

export class testFunction {
  public static async click(t, element) {
    try {
      await this.isElementDisplayed(t, element);
      await t.click(element);
    } catch (error) {
      console.log(error);
      throw Error("Unable to click on the element: " + await element());
    }
  }

  public static async isElementDisplayed(t: any, element: any) {
    try {
      await t.expect((element).exists).ok({timeout: 30000});
    } catch (error) {
      console.log(error);
      throw Error("Unable to find the element: " + await element());
    }
  }

  public static async maximizeWindow(t:any) {
    await t.maximizeWindow();
  }

  public static async sizeOfElement(t, element) {
    let val = await element.count
      .then(result => result);
    return val;
  }

  public static async scrollToElement(t, element) {
    await this.isElementDisplayed(t, element);
    await t.scrollTo(element);
  }

  public static async assertText(t, element, expectedFieldValue: string) {
    const actualFieldValue: string = await this.getElementText(t, element);
    await t.expect(actualFieldValue).contains(expectedFieldValue);
  }

  public static async assertFalseText(t, element, expectedFieldValue: string) {
    const actualFieldValue: string = await this.getElementText(t, element);
    await t.expect(actualFieldValue).notContains(expectedFieldValue);
  }

  public static async assertTextOnPage(t, text) {
    const actualPageContent = await Selector('html').textContent;
    await t.expect(actualPageContent).contains(text);
  }

  public static async assertTextValue(t, actualText, expectedText) {
    await t.expect(actualText).eql(expectedText);
  }

  public static async assertPartialTextValue(t, actualText, expectedText) {
    await t.expect(actualText).contains(expectedText);
  }

  public static async getPageURL() {
    const getURL = ClientFunction(() => window.location.href);
    const url = await getURL();
    return url;
  }

  public static async getPageURLCheckout() {
    const getURL = ClientFunction(() => window.location.href);
    const url = await getURL().then(result => result)
    return url;
  }

  public static async clearAndEnterText(t, element, value) {
    try {
      await this.isElementDisplayed(t, element);
      await t.typeText(element, value, {replace: true, paste: true});
    } catch (error) {
      console.log(error);
    }
  }

  public static async clearTextField(t, element) {
    await this.isElementDisplayed(t, element);
    await t.click(element).pressKey('ctrl+a delete');
  }

  public static async isElementExists(t, element) {
    let count = await this.sizeOfElement(t, element);
    return count > 0;
  }
  public static async isElementNotExists(t, element) {
    await t.expect(Selector(element).exists).notOk();
  }

  public static async enterText(t, element, value) {
    try {
      await this.isElementDisplayed(t, element);
      await t.selectText(element)
        .pressKey('delete');
      await t.typeText(element, value, replace);
    } catch (error) {
      console.log(error);
    }
  }

  public static async getInputText(t, element) {
    return await element.value;
  }

  public static getElementText(t, element) {
    return element.innerText;
  }

  public static isElementVisible(t, element) {
    return element.visible;
  }

  public static getRandomNumber(range) {
    return (parseInt(String(Math.random() * range)) % range + 1).toString();
  }

  public static async clickElementFromList(t, element, value) {
    await t.click(element.withExactText(value));
  }

  public static getElementAttribute(t, element, attribute) {
    return element.getAttribute(attribute);
  }

  public static async navigateTo(t, url) {
    await t.navigateTo(url);
  }

  public static async selectValueFromList(t, element, option) {
    const listItem = element.find('option');
    await t.click(element).click(listItem.withText(option));
  }

  public static generateRandomText(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public static async isElementAbsent(t, element) {
    await t.expect((element).exists).notOk();
  }

  public static async waitForElementToBeInvisible(t, element, value, expectedText) {
    for (let i = 0; i < 10; i++) {
      const strVal = await testFunction.getElementAttribute(t, element, value);
      if (strVal.includes(expectedText)) {
        await t.wait(2000);
      } else {
        break;
      }
    }
  }

  public static async waitForElementPropertyToBeChanged(t, element, value, expectedText?) {
    for (let i = 0; i < 10; i++) {
      if (testFunction.isElementVisible(t, element)) {
        const strVal = await testFunction.getElementAttribute(t, element, value);
        if (strVal.includes(expectedText)) {
          break;
        } else {
          await t.wait(2000);
        }
      }
    }
  }


  public static async waitForElementToBeDisappeared(t, element) {
    if (await this.sizeOfElement(t, element) > 0) {
      await t.expect(element.exists).notOk({timeout: 60000});
    }
  }

  public static async waitForElementToBeAppeared(t, element) {
    let i = 0;
    while ((await this.sizeOfElement(t, element)) === 0) {
      await t.wait(1000);
      i++;
      if (i === 60) {
        break;
      }
    }
  }

  public static async selectDateFromCalendar(t, element) {
    const table = element;
    const tableElement = await element();
    const rowCount = tableElement.childElementCount;
    let dateValue;
    let flag = false;
    for (let i = 0; i < rowCount; i++) {
      const rows = table.child(i);
      const row = await rows();
      const colCount = row.childElementCount;
      for (let j = 1; j < colCount; j++) {
        const cols = rows.child(j);
        const dateBtn = cols.child(0);
        const dateCount = await dateBtn.childElementCount.then(result => result);
        if(dateCount===1) {
          const date=dateBtn.child(0);
          if (!(await date.hasAttribute("disabled"))) {
            dateValue = await testFunction.getElementText(t, cols);
            await testFunction.click(t, cols);
            flag = true;
            break;
          }
        }
      }
      if (flag) {
        break;
      }
    }
    return dateValue;
  }


  public static async takeScreenshot(t, fileName) {
    let UIValidation = this.isValidatingUI();
    if (screenshot === 'Y' && !UIValidation) {
      await t.takeScreenshot({
        path: `../Current/${await fetchBrowser()}/${await screenshotFolder}/` + fileName + `_${await getDateTime()}.png`,
        fullPage: true
      });
    }
  }

  public static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /////placeholder method to define output settings for specific page validations
  public static async setResembleOutputSettings(pageName = "default") {
    pageName = pageName.toLowerCase();
    switch (pageName) {
      case "checkoutreview":
        break;
      case "checkoutcomplete":
        break;
      default:
    }
  }

  public static async cleanBaselineImageDir() {
    if (config.visualValidation.rebaseline === 'Y') {
      let rootFolderPath = `${config.visualValidation.baseDir}/${await fetchBrowser()}`;
      if (!fs.existsSync(rootFolderPath)) {
        fs.mkdirSync(rootFolderPath);
      }
      let folderPath = `${config.visualValidation.baseDir}/${await fetchBrowser()}/${screenshotFolder}`;
      if (fs.existsSync(folderPath)) {
        await FileUtils.deleteFiles(folderPath);
      }
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
    }
  }

  public static async cleanDiffImageDir() {
    let rootFolderPath = `${config.visualValidation.diffDir}/${await fetchBrowser()}`;
    if (!fs.existsSync(rootFolderPath)) {
      fs.mkdirSync(rootFolderPath);
    }
    let folderPath = `${config.visualValidation.diffDir}/${await fetchBrowser()}/${screenshotFolder}`;
    if (fs.existsSync(folderPath)) {
      await FileUtils.deleteFiles(folderPath);
    }
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  //----The test will fail if there is even a single diff file generated in a scenario----//
  public static async reportUIFailures(t) {
    if (await testFunction.isValidatingUI()) {
      let folderPath = `${config.visualValidation.diffDir}/${await fetchBrowser()}/${screenshotFolder}`;
      fs.readdir(folderPath, function (err, files) {
        testFunction.assertTextValue(t, files.length, 0);
      });
    }
  }

  public static async captureNetworkCall(t: any, endpoint) {
    logger = RequestLogger(config.eaBaseUrl + endpoint, {
      logRequestHeaders: true,
      logRequestBody: true,
      logResponseHeaders: true,
      stringifyResponseBody: false,
      logResponseBody: true
    });
    await t.addRequestHooks(logger);
  }

  public static async captureAnalyticsNetworkCall(t: any) {
    logger = RequestLogger({
      url: /b\/ss/,
      method: 'POST'
    }, {
      logRequestHeaders: true,
      logRequestBody: true,
      stringifyRequestBody: true,
    });
    await t.addRequestHooks(logger);
  }

  public static isValidatingUI() {
    const doc = fs.readFileSync('../package.json', 'utf8');
    let packageJson = JSON.parse(doc);
    return packageJson.config.e2e_tags.toString().includes("@UIValidation");
  }
}


