Feature: Search

  Scenario: Perform Search and Display Results (by click on search button)
    Given user navigate to home page
    And user is focused on "search bar"
    When user click on "search button"
    Then "search results" should be appear
    And results should be displayed in correct format
    # hardcode 'child' here, because api data response is static
    And each search result should have the term "child" highlighted

  Scenario: Perform Search and Display Results (by press Enter on search bar)
    Given user navigate to home page
    And user is focused on "search bar"
    When user press Enter on "search bar"
    Then "search results" should be appear
    And results should be displayed in correct format
    # hardcode 'child' here, because api data response is static
    And each search result should have the term "child" highlighted

  Scenario: Typeahead Suggestion Dropdown
    Given user navigate to home page
    And user is focused on "search bar"
    When user types > 2 character in "search bar"
    Then "suggestion dropdown" should be appear
    And suggestion dropdown should showing top 6 results

  Scenario: Select Suggestion (by click on suggestion)
    When user is focused on "search bar"
    And up or down keyboard button is pressed to select any suggestion
    And user click on "child vaccination" suggestion search term
    Then "suggestion dropdown" should be disappear
    And selected suggestion search term "child vaccination" should appear in "search bar"
    And "search results" should be appear

  Scenario: Select Suggestion (by press Enter on search bar)
    Given user navigate to home page
    And user is focused on "search bar"
    When user types > 2 character in "search bar"
    And up or down keyboard button is pressed to select any suggestion
    And user press Enter on "search bar"
    Then "suggestion dropdown" should be disappear
    And selected suggestion search term "child vaccination" should appear in "search bar"
    And "search results" should be appear

  Scenario: 'X' Button in SearchBar
    Given user navigate to home page
    And user is focused on "search bar"
    When user types >= 1 character is typed in "search bar"
    Then 'search bar X button' should be appear

  Scenario: Click 'X' Button in SearchBar
    Given user navigate to home page
    And user is focused on "search bar"
    When user types >= 1 character is typed in "search bar"
    When user click on 'search bar X button'
    Then "suggestion dropdown" should be disappear
    And "search bar" textfield should be cleared but retain focused
    And 'search bar X button' should be disappear