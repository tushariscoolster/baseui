/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {getSvgStyles} from '../icon/styled-components.js';
import type {SharedStylePropsArgT} from './types.js';

/**
 * Main component container element
 */
export const Root = styled('div', {});

export const PanelContainer = styled('div', {width: '100%'});

export const Header = styled<SharedStylePropsArgT>('div', props => {
  const {
    $disabled,
    $expanded,
    $theme: {colors, sizing, typography},
  } = props;
  return {
    ...typography.font450,
    color: colors.colorPrimary,
    cursor: $disabled ? 'not-allowed' : 'pointer',
    background: colors.listHeaderFill,
    paddingTop: sizing.scale600,
    paddingBottom: sizing.scale600,
    paddingLeft: sizing.scale700,
    paddingRight: sizing.scale700,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    borderBottom: `1px solid ${$expanded ? colors.mono500 : colors.mono400}`,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ':hover': {
      color: colors.primary,
    },
  };
});

export const ToggleIcon = styled<SharedStylePropsArgT>('svg', props => {
  const {$theme, $disabled, $color} = props;
  return {
    ...getSvgStyles(props),
    color: $color || $theme.colors.foreground,
    cursor: $disabled ? 'not-allowed' : 'pointer',
  };
});

export const Content = styled<SharedStylePropsArgT>('div', props => {
  const {
    $theme: {animation, colors, sizing, typography},
    $expanded,
  } = props;
  return {
    ...typography.font300,
    backgroundColor: colors.listBodyFill,
    color: colors.foreground,
    paddingTop: $expanded ? sizing.scale800 : 0,
    paddingBottom: $expanded ? sizing.scale1000 : 0,
    paddingLeft: sizing.scale800,
    paddingRight: sizing.scale800,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    borderBottom: $expanded ? `1px solid ${colors.border}` : 'none',
    boxSizing: 'border-box',
    height: $expanded ? 'auto' : 0,
    maxHeight: $expanded ? '100%' : 0,
    overflow: 'hidden',
    transitionProperty: 'all',
    transitionDuration: animation.timing400,
    transitionTimingFunction: animation.easeInOutCurve,
  };
});
