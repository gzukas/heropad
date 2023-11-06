import drawLabel from 'sigma/rendering/canvas/label';
import drawHover from 'sigma/rendering/canvas/hover';
import { Settings } from 'sigma/settings';

export interface CreateNodeHoverRendererOptions {
  hoverBackgroundColor?: string;
  labelColor?: Settings['labelColor'];
}

export function createNodeHoverRenderer(
  options: CreateNodeHoverRendererOptions = {}
): typeof drawHover {
  const { hoverBackgroundColor = '#fff', labelColor } = options;

  return (context, data, settings) => {
    const { labelWeight, labelSize, labelFont } = settings;

    context.font = `${labelWeight} ${labelSize}px ${labelFont}`;
    context.fillStyle = hoverBackgroundColor;

    const PADDING = 2;

    context.beginPath();
    if (data.label) {
      const { width } = context.measureText(data.label);
      const boxWidth = Math.round(width + 6);
      const boxHeight = Math.round(labelSize + 2 * PADDING);
      const radius = Math.max(data.size, labelSize / 2) + PADDING;

      const angleRadian = Math.asin(boxHeight / 2 / radius);
      const xDeltaCoord = Math.sqrt(
        Math.abs(Math.pow(radius, 2) - Math.pow(boxHeight / 2, 2))
      );

      context.moveTo(data.x + xDeltaCoord, data.y + boxHeight / 2);
      context.lineTo(data.x + radius + boxWidth, data.y + boxHeight / 2);
      context.lineTo(data.x + radius + boxWidth, data.y - boxHeight / 2);
      context.lineTo(data.x + xDeltaCoord, data.y - boxHeight / 2);
      context.arc(data.x, data.y, radius, angleRadian, -angleRadian);
    } else {
      context.arc(data.x, data.y, data.size + PADDING, 0, Math.PI * 2);
    }
    context.closePath();
    context.fill();

    drawLabel(context, data, {
      ...settings,
      labelColor: labelColor || settings.labelColor
    });
  };
}
