const createFields = (
  prefix: 'padding' | 'margin',
  offsets: { vertical: string; horizontal: string }
) => [
  {
    side: 'top',
    style: { top: offsets.vertical, left: '50%', transform: 'translateX(-50%)', zIndex: 1000 },
    title: `${prefix}-top`,
  },
  {
    side: 'bottom',
    style: {
      bottom: offsets.vertical,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
    },
    title: `${prefix}-bottom`,
  },
  {
    side: 'left',
    style: {
      left: offsets.horizontal,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1000,
    },
    title: `${prefix}-left`,
  },
  {
    side: 'right',
    style: {
      right: offsets.horizontal,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1000,
    },
    title: `${prefix}-right`,
  },
];

const isValidCssValue = (property: 'margin' | 'padding', value: string) => {
  return CSS.supports(property, value);
};

export { createFields, isValidCssValue };
