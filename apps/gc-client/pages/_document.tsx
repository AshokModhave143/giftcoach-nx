/* eslint-disable react/display-name */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../theme/createEmotionCache';
import { fontHref } from '../theme/font';
import theme from '../theme/theme';

export default class GiftCoachDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="stylesheet" href={fontHref} />
          <meta name="emotion-insertion-point" content="" />
          {(this.props as any).emotionStyleTags}
        </Head>
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

  // create emotion cache for styles
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
      enhanceComponent: (Component) => Component,
    });

  const intialProps = await Document.getInitialProps(ctx);
  // This is important. Prevents emotion to render invalid HTML
  const emotionStyles = extractCriticalToChunks(intialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return { ...intialProps, emotionStyleTags };
};
