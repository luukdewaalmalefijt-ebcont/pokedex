// https://github.com/mslavan/react-loading-screen/blob/master/src/index.js
declare module 'react-loading-screen' {
  interface LoadingScreenProps {
    children: any,
    bgColor: string,
    spinnerColor: string,
    textColor: string,
    loading: boolean,
    logoSrc: string,
    text: string
  }

  function LoadingScreen(props: LoadingScreenProps): any;

  export = LoadingScreen;
}