import { css } from 'emotion';

const buttonStyle = css({
  position: 'relative',
  display: 'inline-block',
  padding: 0,
  overflow: 'hidden',
  borderWidth: 0,
  borderRadius: '2px',
  boxShadow: '0 1px 4px rgba(0, 0, 0, .6)',
  backgroundColor: '#2ecbe3',
  color: '#ecf0f1',
  transition: 'background-color .3s',
  '&:hover': {
    backgroundColor: '#27add4',
  },
  '&:focus': {
    outline: 'none',
  },
});

const textStlye = css({
  display: 'block',
  padding: '12px 24px',
  fontFamily: 'Roboto',
  width: 120,
  fontSize: 15,
});

export { buttonStyle, textStlye };
