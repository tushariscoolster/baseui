/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {SIZE, SIZE_WIDTHS} from './constants.js';
import type {SharedStylePropsArgT, SizePropT} from './types.js';

function getSizeStyles($size: SizePropT) {
  const styles: {
    maxWidth: string | number,
    width?: ?(string | number),
    alignSelf?: string,
  } = {
    maxWidth: '100%',
    width: null,
  };

  if (typeof $size === 'number') {
    styles.width = `${$size}px`;
  } else if (SIZE.hasOwnProperty($size)) {
    styles.width = SIZE_WIDTHS[$size];
  } else if (typeof $size === 'string') {
    styles.width = $size;
  }
  if ($size === SIZE.full) {
    styles.alignSelf = 'stretch';
  }

  return styles;
}

export const Root = styled<SharedStylePropsArgT>('div', props => {
  const {$isOpen} = props;
  return {
    position: 'fixed',
    overflow: 'auto',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    pointerEvents: $isOpen ? 'auto' : 'none',
  };
});

export const Backdrop = styled<SharedStylePropsArgT>('div', props => {
  const {$animate, $isOpen, $isVisible, $theme} = props;
  return {
    position: 'fixed',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    // Disable scroll capabilities.
    touchAction: 'none',
    opacity: $isVisible && $isOpen ? 1 : 0,
    ...($animate
      ? {
          transitionProperty: 'opacity',
          transitionDuration: $theme.animation.timing400,
          transitionTimingFunction: $theme.animation.easeOutCurve,
        }
      : null),
  };
});

export const DialogContainer = styled<SharedStylePropsArgT>('div', props => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '100%',
    pointerEvents: 'none',
    userSelect: 'none',
  };
});

export const Dialog = styled<SharedStylePropsArgT>('div', props => {
  const {$animate, $isOpen, $isVisible, $size, $theme} = props;
  return ({
    position: 'relative',
    backgroundColor: $theme.colors.backgroundAlt,
    borderTopLeftRadius: $theme.borders.surfaceBorderRadius,
    borderTopRightRadius: $theme.borders.surfaceBorderRadius,
    borderBottomRightRadius: $theme.borders.surfaceBorderRadius,
    borderBottomLeftRadius: $theme.borders.surfaceBorderRadius,
    marginLeft: $theme.sizing.scale600,
    marginTop: $theme.sizing.scale600,
    marginRight: $theme.sizing.scale600,
    marginBottom: $theme.sizing.scale600,
    textAlign: 'left',
    ...getSizeStyles($size),

    // Animation
    opacity: $isVisible && $isOpen ? 1 : 0,
    transform: $isVisible ? 'translateY(0)' : 'translateY(20px)',
    ...($animate
      ? {
          transitionProperty: 'opacity, transform',
          transitionDuration: $theme.animation.timing400,
          transitionTimingFunction: $theme.animation.easeOutCurve,
        }
      : null),
    // Reset interactivity properties set by container
    userSelect: 'text',
    pointerEvents: $isOpen ? 'all' : 'none',

    // We move focus to the modal, but we don't want the blue outline style
    ':focus': {
      outline: 'none',
    },
  }: {});
});

export const Close = styled<SharedStylePropsArgT>('button', props => {
  const {$theme} = props;
  return {
    // Reset button styles
    border: 0,
    background: 'transparent',
    outline: 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,

    // Positioning
    position: 'absolute',
    top: $theme.sizing.scale500,
    right: $theme.sizing.scale500,
    width: $theme.sizing.scale800,
    height: $theme.sizing.scale800,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    color: $theme.colors.mono700,
    transitionProperty: 'color',
    transitionDuration: $theme.animation.timing100,
    ':hover': {
      color: $theme.colors.mono800,
    },
  };
});

export const ModalHeader = styled<{}>('div', ({$theme}) => ({
  ...$theme.typography.font500,
  color: $theme.colors.foreground,
  marginTop: $theme.sizing.scale900,
  marginBottom: $theme.sizing.scale600,
  marginLeft: $theme.sizing.scale800,
  // Slightly more margin than left side to leave room for close button
  marginRight: $theme.sizing.scale900,
}));

export const ModalBody = styled<{}>('div', ({$theme}) => ({
  ...$theme.typography.font300,
  color: $theme.colors.foregroundAlt,
  marginTop: $theme.sizing.scale600,
  marginLeft: $theme.sizing.scale800,
  marginRight: $theme.sizing.scale800,
  marginBottom: $theme.sizing.scale700,
}));

export const ModalFooter = styled<{}>('div', ({$theme}) => ({
  ...$theme.typography.font300,
  marginTop: $theme.sizing.scale700,
  marginLeft: $theme.sizing.scale800,
  marginRight: $theme.sizing.scale800,
  paddingTop: $theme.sizing.scale500,
  paddingBottom: $theme.sizing.scale500,
  textAlign: 'right',
  borderTopWidth: '1px',
  borderTopStyle: 'solid',
  borderTopColor: $theme.colors.mono400,
}));
