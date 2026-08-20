import * as React from 'react';

export interface NoAiBadgeProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  width?: number | string;
  margin?: number | string;
  hideOnMobile?: boolean;
  opacity?: number;
  animation?: 'scale' | 'none';
  analyticsEndpoint?: string;
  physics?: boolean;
  printProtect?: boolean;
  devtoolsProtect?: boolean;
  watermark?: boolean;
  shield?: boolean;
  observer?: boolean;
  rightClick?: boolean;
}

export const NoAiBadge: React.FC<NoAiBadgeProps>;
