## Introduction
Simple standalone Meeting Booking application built with React and (Create React App)[https://reactjs.org/docs/create-a-new-react-app.html] setup

## Setup
Super easy, run `npm i`, then `npm start`

## Test
Majority of the Application was built in a TDD style. The hook is the part with no test.

To unit test the app, run `npm test`

## Build
To build, run `npm build`

## Design

### UI/UX
 - I used a (React Datepicker)[https://reactdatepicker.com/], which has its own design. No additional overrides was used, so the color is a bit off from the other components.
-  (Chakra-UI)[https://chakra-ui.com/], which is a beautiful and sleek component UI library was used to spin up things to run really quickly without having to write much CSS

### CSS
- Very little CSS was written, which was done mostly for layout positioning. The CSS files structure could definitely be improved. But this is done as a quick propotype. However, since they are really small and focused, it's super easy to modify and maintain
- The page isn't device responsive. For the best experience, use a desktop computer.

### System Architecture

#### Goal and State management
The goal was to use only what is needed in the project. That being said, global state is something that was avoided as it should even for a project in production as it is one way to fall into the pit of tight coupling.

#### "Container" pattern
"Container" pattern was used in the application. The beauty of this design style is that containers are self-contained and autonomous. Which means that it's easy to re-use in any React project. All you need to do is to copy and paste the container folder into the React project, then install its dependencies from any node package manager. The containers would also nicely in micro-frontends and even projects with other technologies.

There is no tightly coupled dependency, and all dependencies can be easily replaced with another Provider without breaking the Container.

There is a single flow of truth, which is:
Service (React Hook) -> Container -> Components

The Service can be implemented with any technology, e.g. React Query, Redux saga, etc. that detail isn't important as long as the interface is followed. Also change a Service Provider won't lead to modification of the container.

Each component communicate directly with the Container (parent), through events and direct data injection from the parent.

#### Cached Result
Since the API sends all the data, the call to the endpoint is only made once. In a real scenario, the data would be paginated on the Backend so this won't be needed. Also there would be a call to the backend once booking is successful.

## Tradeoffs
- Mentor ID is hard-coded as a dynamic selection isn't part of the project
- UX can be grately improved. It's not mobile responsive.
- The hook and its utilities weren't tested
- An expensive function was called during data transformation. The right place to do this is on input sanitization so there won't be any loop needed.
- Booking submission was used as a substitute for a real POST booking endpoint
- Timezone wasn't considered in the implementation. The suggested place to do this would be on the backend so it's consistent accross all clients
- Only master branch was used
