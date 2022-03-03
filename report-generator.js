const report = require('multiple-cucumber-html-reporter');
//import { basename } from 'path';
//const projectName = basename(__dirname);
const projectVersion = process.env.npm_package_version;
const reportGenerationTime = new Date().toISOString();
report.generate({
  reportName: 'TestCafe Report',
  jsonDir: 'src/cucumber-json-reports',
  reportPath: 'src/results/html-reports',
  openReportInBrowser:false,
  disableLog:false,
  displayDuration: true,
  durationInMS: true,
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: `TestCafe Demo` },
      { label: 'Release', value: `test` }
    ],
  },
});