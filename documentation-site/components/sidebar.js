/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {withStyle} from 'styletron-react';
import {
  Navigation,
  StyledNavItem as NavItem,
  StyledNavLink,
} from 'baseui/side-navigation';
import {Label2, Label1} from 'baseui/typography';
import Link from 'next/link';

import Routes from '../routes';

const StyledNavItem = withStyle(NavItem, ({$theme, $active}) => {
  const styleOverride = {};

  if ($theme.name.startsWith('dark')) {
    if ($active) {
      styleOverride.background = $theme.colors.backgroundAlt;
    }
  }
  return {
    paddingTop: $theme.sizing.scale200,
    paddingBottom: $theme.sizing.scale200,
    ...styleOverride,
  };
});

const removeSlash = path => {
  if (path) {
    return path.replace(/\/$/, '');
  }
  return path;
};

function CustomNavItem(props) {
  const {item, onSelect, onClick, onKeyDown, ...sharedProps} = props;
  const Label = props.$level === 1 ? Label2 : Label1;

  const NavLink = ({item}) => (
    <Link passHref={true} href={item.itemId} prefetch>
      <StyledNavLink tabIndex={0} {...sharedProps}>
        <StyledNavItem {...sharedProps}>{item.title}</StyledNavItem>
      </StyledNavLink>
    </Link>
  );

  if (item.itemId && props.$level === 1)
    return (
      <Label overrides={{Block: {style: {textTransform: 'uppercase'}}}}>
        <NavLink item={item} />
      </Label>
    );

  if (item.itemId) {
    return <NavLink item={item} />;
  }

  return (
    <Label overrides={{Block: {style: {textTransform: 'uppercase'}}}}>
      <StyledNavItem {...sharedProps}>{item.title}</StyledNavItem>
    </Label>
  );
}

function activePredicate(item, location) {
  return (
    (location && removeSlash(location) === removeSlash(item.itemId)) ||
    (!location && item.itemId === '/')
  );
}

export default ({path}) => {
  return (
    <Navigation
      activeItemId={path}
      activePredicate={activePredicate}
      items={Routes}
      overrides={{
        NavItem: {
          component: CustomNavItem,
        },
      }}
    />
  );
};
