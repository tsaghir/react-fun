import { css } from 'emotion';

const containerStyle = css({
  display: 'block',
  fontFamily: 'Roboto',
  height: '100%',
  width: '90%',
  position: 'relative',
  margin: 'auto',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
  overflow: 'hidden',
  marginBottom: 100,
});

const containerTitleStyle = css({
  textAlign: 'left !important',
  padding: 15,
  borderBottom: '1px solid lightgrey',
});

const containerContentStyle = css({
  height: '100%',
  margin: 10,
  textAlign: 'center',
});

const containerFooterStyle = css({
  borderTop: '1px solid lightgrey',
  width: '100%',
  textAlign: 'right',
  '& button': {
    margin: 10,
  },
});

export {
  containerStyle,
  containerTitleStyle,
  containerContentStyle,
  containerFooterStyle,
};
