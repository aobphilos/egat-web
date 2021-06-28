import React, { useEffect } from 'react';

import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import menuItems from '../layout/menu-items';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setActiveSidebar, selectLayout } from '../layout/layoutSlice';
import { getFilteredPlantAsync } from '../plant/plantSlice';

import { AppTopBar } from '../layout/AppTopBar';
import { AppFooter } from '../layout/AppFooter';
import { AppMenu } from '../layout/AppMenu';

const Wrapper = ({ children }: any) => {
  const dispatch = useAppDispatch();
  /**
   * Load Plant Data
   */
  dispatch(getFilteredPlantAsync());

  const layout = useAppSelector(selectLayout);

  useEffect(() => {
    if (layout.isActiveSidebar) {
      addClass(document.body, 'body-overflow-hidden');
    } else {
      removeClass(document.body, 'body-overflow-hidden');
    }
  }, [layout.isActiveSidebar]);

  const addClass = (element: HTMLElement, className: string) => {
    if (element.classList) element.classList.add(className);
    else element.className += ' ' + className;
  };

  const removeClass = (element: HTMLElement, className: string) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
        ' '
      );
  };

  const wrapperClass = classNames('layout-wrapper', {
    'layout-overlay': true,
    'layout-active': layout.isActiveSidebar,
  });

  const onSidebarClick = () => {
    dispatch(setActiveSidebar(!layout.isActiveSidebar));
  };

  const onWrapperClick = (event: any) => {
    if (layout.isActiveSidebar) {
      dispatch(setActiveSidebar(false));
    }
  };

  const onToggleMenu = (event: any) => {
    dispatch(setActiveSidebar(!layout.isActiveSidebar));
    event.preventDefault();
  };

  const onMenuItemClick = (event: any) => {
    if (!event.item.items) {
      dispatch(setActiveSidebar(false));
    }
  };

  const isSidebarVisible = () => {
    return layout.isActiveSidebar;
  };

  const sidebarClassName = classNames('layout-sidebar', { 'layout-sidebar-dark': true });

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      <AppTopBar onToggleMenu={onToggleMenu} />

      <CSSTransition
        classNames="layout-sidebar"
        timeout={{ enter: 200, exit: 200 }}
        in={isSidebarVisible()}
        unmountOnExit>
        <div className={sidebarClassName} onClick={onSidebarClick}>
          <div className="layout-logo">
            <img alt="Logo" src="/logo-rain.png" />
          </div>
          <AppMenu model={menuItems} onMenuItemClick={onMenuItemClick} />
        </div>
      </CSSTransition>

      <div className="layout-main">{children}</div>
      <AppFooter />
    </div>
  );
};

export default Wrapper;
