import { css } from 'emotion';

const titleStyle = textSize =>
  css({
    position: 'relative',
    textAlign: 'center',
    fontFamily: 'Roboto thin',
    fontSize: textSize,
  });

export { titleStyle };
