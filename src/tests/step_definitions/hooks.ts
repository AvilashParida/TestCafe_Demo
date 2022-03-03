import {After, Before, Given} from 'cucumber';
import {testFunction} from '../../global_methods/helper';
import {ClientFunction} from 'testcafe';
import {FileUtils} from '../../global_methods/FileUtils';
import * as fs from 'fs';

let log4js = require('log4js');
const USERAGENT = ClientFunction(() => navigator.userAgent);
let logger = log4js.getLogger();
const homePage = require('../page_elements/landingPage.page');
logger.level = 'debug';
export let screenshotFolder = null;
export let getTestCafeRC = null;
export let getPackage = null;
export let height = null;
export let width = null;

Before(async t => {
  const doc = fs.readFileSync('.testcaferc.json', 'utf8');
  const packageDoc = fs.readFileSync('../package.json', 'utf8');
  getPackage = JSON.parse(packageDoc);
  getTestCafeRC = JSON.parse(doc);
  logger.info(`Executing ${t.testRun.test.testFile.currentFixture.name}`);
  logger.info(`Executing ${t.testRun.test.name}`);
});

Given(/^user has opened the website link in a browser and creates '(.*)' to save evidences$/, async function (t, [folderName]) {
  await testFunction.maximizeWindow(t);
  screenshotFolder = folderName;
  let screenshotFolderPath = "screenshots/Current/" + await fetchBrowser() + "/" + screenshotFolder;
  await FileUtils.deleteFiles(screenshotFolderPath);
  //await testFunction.cleanBaselineImageDir();
  //await testFunction.cleanDiffImageDir();
  await t.navigateTo(homePage.pageUrl);
  //height = await ClientFunction(() => window.innerHeight)();
  //width = await ClientFunction(() => window.innerWidth)();
});

After(async t => {
  await testFunction.reportUIFailures(t);
  await t.takeScreenshot({
    path: `../Current/${await fetchBrowser()}/${await screenshotFolder}/${await getDateTime()}.png`,
    fullPage: true
  });
  logger.info(`Execution Completed ${t.testRun.test.name}`);
});

export async function fetchBrowser() {
  const useragent = await USERAGENT().then(result => result);
  let browser;
  if (useragent.indexOf("Firefox") > -1) {
    browser = "Firefox";
  } else if (useragent.indexOf("Trident") > -1) {
    browser = "Internet Explorer";
  } else if (useragent.indexOf("Chrome") > -1) {
    browser = "Chrome";
  } else if (useragent.indexOf("Safari") > -1) {
    browser = "Safari";
  } else {
    browser = "unknown";
  }
  return browser;
}

export async function getDateTime() {
  let now = new Date();
  let year = now.getFullYear();
  let month = String(now.getMonth() + 1);
  let day = String(now.getDate());
  let hour = String(now.getHours());
  let minute = String(now.getMinutes());
  let second = String(now.getSeconds());
  if (month.length === 1) {
    month = `0${month}`;
  }
  if (day.length === 1) {
    day = `0${day}`;
  }
  if (hour.length === 1) {
    hour = `0${hour}`;
  }
  if (minute.length === 1) {
    minute = `0${minute}`;
  }
  if (second.length === 1) {
    second = `0${second}`;
  }
  return `${year}_${month}_${day}_${hour}_${minute}_${second}`;
}

