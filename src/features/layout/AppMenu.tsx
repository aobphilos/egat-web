import React, { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

const AppSubmenu = (props: any) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const _onMenuItemClick = (event: any, item: any, index: number) => {
    //avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    //execute command
    if (item.command) {
      item.command({ originalEvent: event, item: item });
    }

    if (index === activeIndex) setActiveIndex(null);
    else setActiveIndex(index);

    if (props.onMenuItemClick) {
      props.onMenuItemClick({
        originalEvent: event,
        item: item,
      });
    }
  };

  const renderLinkContent = (item: any) => {
    return (
      <React.Fragment>
        <i className={item.icon}></i>
        <span>{item.label}</span>
      </React.Fragment>
    );
  };

  const renderLink = (item: any, i: number) => {
    let content = renderLinkContent(item);

    return (
      <Link href={item.to}>
        <a className="active-route" onClick={(e) => _onMenuItemClick(e, item, i)}>
          {content}
        </a>
      </Link>
    );
  };

  let items =
    props.items &&
    props.items.map((item: any, i: number) => {
      let active = activeIndex === i;
      let styleClass = classNames(item.badgeStyleClass, { 'active-menuitem': active && !item.to });

      return (
        <li className={styleClass} key={i}>
          {item.items && props.root === true && <div className="arrow"></div>}
          {renderLink(item, i)}
        </li>
      );
    });

  return items ? <ul className={props.className}>{items}</ul> : null;
};

export const AppMenu = ({ model, onMenuItemClick }: any) => {
  return (
    <div className="layout-menu-container">
      <AppSubmenu items={model} className="layout-menu" onMenuItemClick={onMenuItemClick} root={true} />
    </div>
  );
};
