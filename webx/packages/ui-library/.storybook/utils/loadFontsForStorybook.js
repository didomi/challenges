const IBM_PLEX_FONT_URL =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Serif&display=swap';
const FONT_LINK_ID = 'ibm-plex-sans';

export const loadFontsForStorybook = () => {
  if (!document.getElementById(FONT_LINK_ID)) {
    const fontLink = document.createElement('link');

    fontLink.id = FONT_LINK_ID;
    fontLink.href = IBM_PLEX_FONT_URL;
    fontLink.rel = 'stylesheet';

    document.head.appendChild(fontLink);
  }
};
