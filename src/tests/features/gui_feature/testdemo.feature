@regression
Feature:Testcafe Demo for github

  @test1
  Scenario Outline: Navigating to Customer Front end login page for PHP Travels
    Given user has opened the website link in a browser and creates 'testing' to save evidences
    And user has navigated to 'Customer Front-End' login page
    And user has navigated to 'Customer Front-End' login page and provides credentials for 'customer' login
    @test2
  Scenario Outline: Navigating to Agent Front end login page for PHP Travels
    Given user has opened the website link in a browser and creates 'testing' to save evidences
    And user has navigated to 'Agent Front-End' login page
    And user has navigated to 'Agent Front-End' login page and provides credentials for 'agent' login

    @test3
  Scenario Outline: Navigating to Admin Back end login page for PHP Travels
    Given user has opened the website link in a browser and creates 'testing' to save evidences
    And user has navigated to 'Admin Back-End' login page
    And user has navigated to 'Admin Back-End' login page and provides credentials for 'admin' login

    @test4
  Scenario Outline: Navigating to Supplier Back end login page for PHP Travels
    Given user has opened the website link in a browser and creates 'testing' to save evidences
    And user has navigated to 'Supplier Back-End' login page
    And user has navigated to 'Supplier Back-End' login page and provides credentials for 'supplier' login
    