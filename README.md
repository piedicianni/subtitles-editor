# Subtitles editor

## Functionality overview

This React.js application allow you to modify and create video subtitles.

**General functionality:**

- Subtitle preview
- Modify the range time and body text of subtitle
- Play video controls ex. play, pause and seekbar
- Displays current subtitle overlay
- Create new one subtitle
- Save changes in the LocalStorage

## Application Structure

- `src/App.js` - The entry point of application.
- `src/components/` - This folder contains stateless components.
- `src/constants/` - This folder contains constants declaration.
- `src/containers/` - This folder contains containers components.
- `src/hoc/` - This folder contains the higher order components of subtitle item.
- `src/services/` - This folder contains the requests about video informations and default subtitles list.
- `src/utils/` - This folder contains utils functions.

## Dependencies and libraries used

- [React bootstrap](https://react-bootstrap.github.io)
- [React player](https://www.npmjs.com/package/react-player)
- [Nouislider react](https://www.npmjs.com/package/nouislider-react)
