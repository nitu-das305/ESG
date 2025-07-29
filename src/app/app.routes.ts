import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'environmental-dashboard', loadComponent: () => import('./environmental-dashboard/environmental-dashboard.component').then(m => m.EnvironmentalDashboardComponent), canActivate: [authGuard] },
  { path: 'social-dashboard', loadComponent: () => import('./social-dashboard/social-dashboard.component').then(m => m.SocialDashboardComponent), canActivate: [authGuard] },
  { path: 'goverance-dashboard', loadComponent: () => import('./governance-dashboard/goverance-dashboard.component').then(m => m.GovernanceComponent), canActivate: [authGuard] },
  { path: 'initiatives-dashboard', loadComponent: () => import('./initiatives-dashboard/initiatives-dashboard.component').then(m => m.InitiativesDashboardComponent), canActivate: [authGuard] },
  { path: 'communication-hub', loadComponent: () => import('./communication-hub/communication-hub.component').then(m => m.CommunicationHubComponent), canActivate: [authGuard] },
  { path: 'stakeholder-engagement', loadComponent: () => import('./stakeholder-engagement/stakeholder-engagement.component').then(m => m.StakeholderEngagementComponent), canActivate: [authGuard] },
  { path: 'data-management', loadComponent: () => import('./data-management/data-management.component').then(m => m.DataManagementComponent), canActivate: [authGuard] },
  { path: 'esg-specialist', loadComponent: () => import('./esg-specialist/esg-specialist.component').then(m => m.EsgSpecialistComponent), canActivate: [authGuard] },
  { path: 'reporting', loadComponent: () => import('./reporting/reporting.component').then(m => m.ReportingComponent), canActivate: [authGuard] },
  { path: 'materiality', loadComponent: () => import('./materiality/materiality.component').then(m => m.MaterialityComponent), canActivate: [authGuard] },
  // Placeholder routes for missing components
  { path: 'team', redirectTo: '/environmental-dashboard' },
  { path: 'training', redirectTo: '/environmental-dashboard' },
  { path: 'workspace', redirectTo: '/environmental-dashboard' },
  { path: 'user-role-management', redirectTo: '/environmental-dashboard' },
  { path: 'notifications', redirectTo: '/environmental-dashboard' },
  { path: 'calendar', redirectTo: '/environmental-dashboard' },
];
