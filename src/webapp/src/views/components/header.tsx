import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../components/ui/breadcrumb';

import { DatabaseIcon, UserIcon } from '@phosphor-icons/react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';

export function Header() {
  const location = useLocation();

  // map routes to friendly names
  const nameMap: Record<string, string> = {
    '/': 'Campanhas',
    '/campaigns/new': 'Nova campanha',
    '/community': 'Comunidade',
    '/posts/new': 'Novo post',
  };

  const segments = location.pathname.split('/').filter(Boolean);
  const crumbs: { to: string; label: string }[] = [];
  if (segments.length === 0) {
    crumbs.push({ to: '/', label: nameMap['/'] || 'Home' });
  } else {
    let acc = '';
    crumbs.push({ to: '/', label: nameMap['/'] || 'Home' });
    segments.forEach((seg) => {
      acc += `/${seg}`;
      crumbs.push({ to: acc, label: nameMap[acc] || seg });
    });
  }

  return (
    <header className="w-full bg-white flex items-center justify-between">
      <div className="flex items-center justify-between gap-2 px-4 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            {crumbs.map((c, idx) => (
              <React.Fragment key={c.to}>
                <BreadcrumbItem>
                  {idx < crumbs.length - 1 ? (
                    <BreadcrumbLink asChild>
                      <Link to={c.to}>{c.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{c.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {idx < crumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline">
          <DatabaseIcon weight="bold" />
        </Button>

        <Button size="icon" variant="outline">
          <UserIcon weight="bold" />
        </Button>
      </div>
    </header>
  );
}
