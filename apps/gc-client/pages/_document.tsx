/* eslint-disable react/display-name */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class GiftCoachDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>{this.props.styles}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

GiftCoachDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const sheet = new ServerStyleSheet();

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      enhanceComponent: (Component) => Component,
    });

  const intialProps = await Document.getInitialProps(ctx);
  const styles = sheet.getStyleElement();

  return { ...intialProps, styles };
};
