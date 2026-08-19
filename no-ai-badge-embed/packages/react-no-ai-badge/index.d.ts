import * as React from 'react';

export interface NoAiBadgeProps {
  /**
   * Where to place the badge. Defaults to 'bottom-right'.
   */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  
  /**
   * The width of the badge in pixels. Defaults to 120.
   */
  width?: number | string;
  
  /**
   * The distance from the corner of the screen in pixels. Defaults to 20.
   */
  margin?: number | string;
  
  /**
   * Make the badge clickable by passing a full URL.
   */
  link?: string;
  
  /**
   * Automatically hide the badge on screens smaller than 768px.
   */
  hideOnMobile?: boolean;
  
  /**
   * Set the transparency level of the badge (0.0 to 1.0).
   */
  opacity?: number;
  
  /**
   * Disable the hover scale effect by passing 'none'.
   */
  animation?: 'scale' | 'none';
  
  /**
   * Pass a URL/Webhook to send a silent POST ping whenever the badge is loaded.
   */
  analyticsEndpoint?: string;
  
  // Advanced Anti-Theft Toggles (All default to true)
  printProtect?: boolean;
  devtoolsProtect?: boolean;
  watermark?: boolean;
  shield?: boolean;
  observer?: boolean;
  rightClick?: boolean;
}

declare const NoAiBadge: React.FC<NoAiBadgeProps>;
export default NoAiBadge;
