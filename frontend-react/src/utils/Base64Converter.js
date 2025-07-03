import ReactDOMServer from 'react-dom/server';

const renderIconToBase64 = (IconComponent, color = '#ff0000') => {
  const svgString = ReactDOMServer.renderToStaticMarkup(
    <IconComponent color={color} size={48} />
  );

  const svgBase64 = `${btoa(unescape(encodeURIComponent(svgString)))}`;
  return svgBase64;
};

export default renderIconToBase64;