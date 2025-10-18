const getIconFilter = (color) => {
  if (color === 'green') {
    return `
      brightness(0) 
      saturate(100%) 
      invert(67%) 
      sepia(48%) 
      saturate(718%) 
      hue-rotate(123deg) 
      brightness(95%) 
      contrast(101%)
    `;
    // This filter converts black to #00b894 green
  }

  if (color === 'yellow') {
    return `
      brightness(0)
      saturate(100%)
      invert(66%)
      sepia(94%)
      saturate(600%)
      hue-rotate(2deg)
      brightness(94%)
      contrast(92%)
    `;
  }

  if (color === 'black') {
    return `
      brightness(0)
      saturate(100%)
      invert(10%)
      sepia(3%)
      saturate(210%)
      hue-rotate(180deg)
      brightness(100%)
      contrast(95%)
    `;
  }

  return 'none'; // default: no filter
};


const RenderColoredIcon = (IconComponent, color) => (
    <img
      src={IconComponent}
      alt=""
      className="w-5 h-5"
      style={{
        filter: getIconFilter(color),
      }}
    />
  );

  export default RenderColoredIcon;