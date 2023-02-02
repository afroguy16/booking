## Introduction
Simple standalone Meeting Booking application built with React and Create React App setup

## Setup
Super easy, run `npm i`, then `npm start`

## Test
Majority of the Application was built in a TDD style. The hook is the part with no test.

To run the test, run `npm test`

## Build
To build, run `npm build`

## Design

### UI/UX
I used a react-datepick, which has its own design. No additional overrides was used, so the color is a bit off from the other components.

### CSS
- Chakra-UI, which is a beautiful and sleek component UI was used to spin up things to run really quickly without having to write much CSS
- Very little CSS was written mostly for layout positioning. The CSS files are small but could definitely be better in terms of structure. But it's really a quick propotype with little thoughts towards styles scalability. But since it's small, it's super easy to modify and maintain
- The page isn't device responsive. But the best experience, use a desktop computer.

### System Architecture

#### Goal and State management
The goal was to use what is needed in the project. That being said, global state is something that is avoided, and should be avoided even in a project in production.

#### "Container" pattern
"Container" pattern was used in the application. The beauty of container pattern is that it's self contained and autonomous. Which means that it's easy to re-use in any React project, and will play nicely in projects with other technologies.

There is no tightly coupled dependencies, and all dependencies can be easily replaced with another Provider without breaking the Container.

There is a single flow of truth, which is:
Service (React Hook) -> Container -> Components

Each component communicate directly with the Container (parent), through events and direct data injection from the parent.

## Tradeoffs
- The functionality is not complete and the UX can be grately improved
- The hook and its utilities weren't tested
- An expensive function was called during data transformation. The right place to do this is on input sanitization so there won't be any loop needed.
- Dummy POST booking was used (in place a real POST endpoint)
- Timezone wasn't considered in the implementation. This is also a good candidate to be done on the server for the sake of consistency