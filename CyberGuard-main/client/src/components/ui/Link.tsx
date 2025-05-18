import React, { AnchorHTMLAttributes } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  activeClass?: string;
  external?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  children,
  href = '#',
  className = '',
  activeClass = '',
  external = false,
  ...props
}) => {
  const isActive = href === window.location.pathname || window.location.hash === href;
  
  return (
    <a
      href={href}
      className={`${className} ${isActive ? activeClass : ''}`}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      {...props}
    >
      {children}
    </a>
  );
};