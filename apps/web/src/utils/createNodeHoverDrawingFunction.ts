import { NodeHoverDrawingFunction, drawDiscNodeLabel } from 'sigma/rendering';
import { Settings } from 'sigma/settings';

export interface CreateNodeHoverRendererOptions {
  hoverBackgroundColor?: string;
  labelColor?: Settings['labelColor'];
}

export function createNodeHoverDrawingFunction(
  options: CreateNodeHoverRendererOptions = {}
): NodeHoverDrawingFunction {
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

      const angleRadian = Math.asin(boxHeight / (2 * radius));
      const xDeltaCoord = Math.sqrt(
        Math.abs(radius ** 2 - (boxHeight / 2) ** 2)
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

    drawDiscNodeLabel(context, data, {
      ...settings,
      labelColor: labelColor || settings.labelColor
    });
  };
}
