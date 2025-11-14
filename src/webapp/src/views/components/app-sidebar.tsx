'use client';

import { Frame, GalleryVerticalEnd, PieChart } from 'lucide-react';
import * as React from 'react';

import { NavProjects } from '@/views/components/nav-projects';
import { TeamSwitcher } from '@/views/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/views/components/ui/sidebar';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'FSPH',
      logo: GalleryVerticalEnd,
      plan: 'Fundação de Saúde Parreiras Horta',
    },
  ],

  projects: [
    {
      name: 'Campanhas',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Comunidade (Moderação)',
      url: '#',
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
    </Sidebar>
  );
}
