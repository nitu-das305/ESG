import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-initiatives-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <style>
      .esg-root {
        min-height: 100vh;
        background: #f8fafc;
        color: #222;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        display: flex;
        flex-direction: row;
      }
      .esg-sidenav {
        width: 260px;
        background: #fff;
        border-right: 1px solid #ececec;
        box-shadow: 2px 0 8px rgba(0,0,0,0.03);
        display: flex;
        flex-direction: column;
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        z-index: 1000;
        overflow-y: auto;
        overflow-x: hidden;
        transition: background 0.3s, color 0.3s, width 0.3s;
      }
      .esg-sidenav.collapsed {
        width: 70px;
      }
      .esg-root > .esg-main {
        margin-left: 260px;
        width: 100%;
        padding-left: 2.5rem;
        transition: margin-left 0.3s, padding-left 0.3s;
      }
      .esg-sidenav.collapsed ~ .esg-main {
        margin-left: 70px;
        padding-left: 1rem;
      }
      .esg-sidenav-header {
        padding: 2rem 1rem 1rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      .esg-logo {
        width: 48px;
        height: 48px;
        margin-bottom: 0.5rem;
      }
      .esg-title {
        font-size: 1.2rem;
        font-weight: 700;
        color: #2563eb;
        transition: opacity 0.3s;
      }
      .esg-sidenav.collapsed .esg-title {
        opacity: 0;
      }
      .esg-nav {
        display: flex;
        flex-direction: column;
        padding: 1rem 0;
        flex: 1 1 auto;
      }
      .esg-nav-link {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1.5rem;
        color: #333;
        text-decoration: none;
        font-weight: 500;
        font-size: 1rem;
        border-right: 3px solid transparent;
        transition: background 0.2s, color 0.2s;
      }
      .esg-nav-link.active {
        background: #e6f0ff;
        color: #2563eb;
        border-right: 3px solid #2563eb;
      }
      .esg-nav-link:hover {
        background: #f3f4f6;
        color: #2563eb;
      }
      .esg-sidenav.collapsed .esg-nav-link span:not(.esg-nav-icon) {
        display: none;
      }
      .esg-nav-actions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 2rem;
      }
      .esg-nav-actions button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
        padding: 0.5rem 1.5rem;
        border-radius: 6px;
        border: none;
        background: none;
        cursor: pointer;
        transition: background 0.2s, color 0.2s;
        color: #333;
      }
      .esg-nav-actions button:focus {
        outline: 2px solid #2563eb;
        outline-offset: 2px;
      }
      .esg-nav-actions button:hover {
        background: #f3f4f6;
        color: #2563eb;
      }
      .esg-nav-actions .icon {
        font-size: 1.2rem;
        display: inline-block;
      }
      .esg-nav-actions .esg-logout {
        color: #dc3545;
        font-weight: 600;
      }
      .esg-nav-actions .esg-logout:hover {
        background: #ffe6e6;
        color: #a71d2a;
      }
      .esg-summary-row {
        display: flex;
        gap: 2rem;
        margin: 2rem 0 2.5rem 0;
        flex-wrap: wrap;
      }
      .esg-summary-card {
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        border: 1px solid #ececec;
        padding: 1.5rem 2rem 1.5rem 1.5rem;
        min-width: 220px;
        flex: 1 1 220px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: relative;
        transition: background 0.3s, color 0.3s;
      }
      .esg-summary-label {
        font-size: 1rem;
        color: #666;
        margin-bottom: 0.5rem;
        transition: color 0.3s;
      }
      .esg-summary-value {
        font-size: 2rem;
        font-weight: 700;
        color: #111827;
        margin-bottom: 0.25rem;
        transition: color 0.3s;
      }
      .esg-summary-change {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        color: #22c55e;
        font-weight: 600;
        font-size: 1rem;
      }
      .esg-summary-actions {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1.5rem;
      }
      .esg-summary-actions button {
        background: #f3f4f6;
        border: none;
        border-radius: 8px;
        color: #222;
        font-weight: 600;
        padding: 0.75rem 1.5rem;
        cursor: pointer;
        transition: background 0.2s;
      }
      .esg-summary-actions button:hover {
        background: #e6f0ff;
      }
      .esg-root.dark-mode {
        background: #181828;
        color: #e0e0e0;
      }
      .esg-root.dark-mode .esg-main {
        background: #181828;
        color: #e0e0e0;
      }
      .esg-root.dark-mode .esg-summary-card {
        background: #23284a;
        color: #e0e0e0;
        border: 1px solid #333;
      }
      .esg-root.dark-mode .esg-summary-label {
        color: #b0b0b0;
      }
      .esg-root.dark-mode .esg-summary-value {
        color: #fff;
      }
      .esg-sidenav.dark-mode {
        background: #1a1a2e;
        color: #e0e0e0;
        border-right: 1px solid #333;
      }
      .esg-sidenav.dark-mode .esg-title {
        color: #7eaaff;
      }
      .esg-sidenav.dark-mode .esg-nav-link {
        color: #e0e0e0;
      }
      .esg-sidenav.dark-mode .esg-nav-link.active {
        background: #223c2c;
        color: #7eaaff;
        border-right: 3px solid #7eaaff;
      }
      .esg-sidenav.dark-mode .esg-nav-link:hover {
        background: #22223c;
        color: #7eaaff;
      }
      .esg-sidenav.dark-mode .esg-nav-actions button {
        color: #e0e0e0;
      }
      .esg-sidenav.dark-mode .esg-nav-actions button:hover {
        background: #23284a;
        color: #7eaaff;
      }
      .esg-sidenav.dark-mode .esg-nav-actions .esg-logout {
        color: #ffb3b3;
      }
      .esg-sidenav.dark-mode .esg-nav-actions .esg-logout:hover {
        background: #3a1a1a;
        color: #ff4d4d;
      }
      .initiatives-dashboard-root {
        max-width: 1200px;
        margin: 2rem auto;
        padding: 2rem;
        background: #fff;
        border-radius: 18px;
        box-shadow: 0 6px 32px rgba(0,0,0,0.07);
        color: #222;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      .initiatives-header {
        font-size: 2rem;
        font-weight: 700;
        color: #2563eb;
        margin-bottom: 2rem;
      }
      .initiatives-section {
        margin-bottom: 2.5rem;
      }
      .initiatives-section h2 {
        font-size: 1.3rem;
        font-weight: 600;
        color: #2563eb;
        margin-bottom: 1rem;
      }
      .initiatives-table, .initiatives-table th, .initiatives-table td {
        border: 1px solid #ececec;
        border-collapse: collapse;
      }
      .initiatives-table {
        width: 100%;
        margin-bottom: 1rem;
      }
      .initiatives-table th, .initiatives-table td {
        padding: 0.75rem 1rem;
        text-align: left;
      }
      .initiatives-table th {
        background: #f3f4f6;
      }
      .milestone-progress {
        width: 100%;
        background: #e6f0ff;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 0.5rem;
      }
      .milestone-bar {
        height: 18px;
        background: #2563eb;
        color: #fff;
        text-align: center;
        font-size: 0.9rem;
        line-height: 18px;
        border-radius: 8px 0 0 8px;
      }
      .proposal-form input, .proposal-form textarea {
        width: 100%;
        margin-bottom: 0.75rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
      .proposal-form button {
        background: #2563eb;
        color: #fff;
        border: none;
        border-radius: 6px;
        padding: 0.75rem 1.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
      }
      .proposal-form button:hover {
        background: #1746a2;
      }
      @media (max-width: 900px) {
        .esg-sidenav {
          position: static;
          width: 100%;
          height: auto;
        }
        .esg-root > .esg-main {
          margin-left: 0;
          padding-left: 0.5rem;
        }
      }
      .modal-backdrop {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.4);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .modal {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        padding: 2rem;
        min-width: 320px;
        max-width: 95vw;
        color: #222;
        position: relative;
      }
      .modal.dark-mode {
        background: #23284a;
        color: #e0e0e0;
      }
      .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #888;
      }
      .modal-close:hover {
        color: #2563eb;
      }
      .modal label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }
      .modal input, .modal select {
        width: 100%;
        margin-bottom: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
      .modal.dark-mode input, .modal.dark-mode select {
        background: #181828;
        color: #e0e0e0;
        border: 1px solid #333;
      }
      .modal-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
      }
      .modal-actions button {
        background: #2563eb;
        color: #fff;
        border: none;
        border-radius: 6px;
        padding: 0.75rem 1.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
      }
      .modal-actions button:hover {
        background: #1746a2;
      }
      .monitor-section {
        margin-top: 1rem;
      }
      .monitor-label {
        font-weight: 600;
        margin-bottom: 0.5rem;
        display: block;
      }
      .monitor-progress {
        width: 100%;
        background: #e6f0ff;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 0.5rem;
      }
      .monitor-bar {
        height: 18px;
        background: #2563eb;
        color: #fff;
        text-align: center;
        font-size: 0.9rem;
        line-height: 18px;
        border-radius: 8px 0 0 8px;
      }
      .modal.dark-mode .monitor-progress {
        background: #23284a;
      }
      .modal.dark-mode .monitor-bar {
        background: #7eaaff;
        color: #23284a;
      }
      .esg-root.dark-mode .initiatives-dashboard-root {
        background: #23284a;
        color: #e0e0e0;
        border: 1px solid #333;
      }
      .esg-root.dark-mode .initiatives-header {
        color: #7eaaff;
      }
      .esg-root.dark-mode .initiatives-section h2 {
        color: #7eaaff;
      }
      .esg-root.dark-mode .initiatives-table th {
        background: #23284a;
        color: #b0b0b0;
      }
      .esg-root.dark-mode .initiatives-table td {
        background: #23284a;
        color: #e0e0e0;
      }
      .esg-root.dark-mode .proposal-form input,
      .esg-root.dark-mode .proposal-form textarea {
        background: #181828;
        color: #e0e0e0;
        border: 1px solid #333;
      }
      .esg-root.dark-mode .proposal-form button,
      .esg-root.dark-mode .esg-summary-actions button {
        background: #223c2c;
        color: #e0e0e0;
      }
      .esg-root.dark-mode .proposal-form button:hover,
      .esg-root.dark-mode .esg-summary-actions button:hover {
        background: #2563eb;
        color: #fff;
      }
    </style>
    <div class="esg-root" [class.dark-mode]="darkMode">
      <aside class="esg-sidenav" [class.collapsed]="sidebarCollapsed" [class.dark-mode]="darkMode">
        <div class="esg-sidenav-header">
          <img src="assets/logo.png" alt="Logo" class="esg-logo" />
          <span class="esg-title" *ngIf="!sidebarCollapsed">ESG Initiative Dashboard</span>
        </div>
        <nav class="esg-nav">
          <a routerLink="/environmental-dashboard" routerLinkActive="active" class="esg-nav-link"><span class="esg-nav-icon">🌱</span><span *ngIf="!sidebarCollapsed">Sustainability Dashboard</span></a>
          <a routerLink="/materiality" routerLinkActive="active" class="esg-nav-link"><span class="esg-nav-icon">📊</span><span *ngIf="!sidebarCollapsed">Materiality Assessment</span></a>
          <a routerLink="/team" routerLinkActive="active" class="esg-nav-link"><span class="esg-nav-icon">🧑‍🤝‍🧑</span><span *ngIf="!sidebarCollapsed">Manage Team</span></a>
          <a routerLink="/initiatives-dashboard" routerLinkActive="active" class="esg-nav-link"><span class="esg-nav-icon">📣</span><span *ngIf="!sidebarCollapsed">ESG Initiative</span></a>
          <a routerLink="/reporting" routerLinkActive="active" class="esg-nav-link"><span class="esg-nav-icon">📊</span><span *ngIf="!sidebarCollapsed">Reporting & Analysis</span></a>
          <a routerLink="/communication" routerLinkActive="active" class="esg-nav-link"><span class="esg-nav-icon">💬</span><span *ngIf="!sidebarCollapsed">Communication Hub</span></a>
          <a routerLink="/training" routerLinkActive="active" class="esg-nav-link"><span class="esg-nav-icon">🎓</span><span *ngIf="!sidebarCollapsed">Training & Development</span></a>
          <a routerLink="/workspace" routerLinkActive="active" class="esg-nav-link"><span class="esg-nav-icon">📁</span><span *ngIf="!sidebarCollapsed">Workspace</span></a>
          <a routerLink="/stakeholder-engagement" routerLinkActive="active" class="esg-nav-link"><span class="esg-nav-icon">🤝</span><span *ngIf="!sidebarCollapsed">Stakeholder Engagement</span></a>
          <a routerLink="/data-management" routerLinkActive="active" class="esg-nav-link"><span class="esg-nav-icon">🗄️</span><span *ngIf="!sidebarCollapsed">Data Management</span></a>
          <a routerLink="/user-role-management" routerLinkActive="active" class="esg-nav-link"><span class="esg-nav-icon">👤</span><span *ngIf="!sidebarCollapsed">User & Role Management</span></a>
          <a routerLink="/notifications" routerLinkActive="active" class="esg-nav-link"><span class="esg-nav-icon">🔔</span><span *ngIf="!sidebarCollapsed">Notifications & Alerts</span></a>
          <a routerLink="/calendar" routerLinkActive="active" class="esg-nav-link"><span class="esg-nav-icon">📅</span><span *ngIf="!sidebarCollapsed">Calendar & Events</span></a>
          <div class="esg-nav-actions">
            <button class="esg-sidenav-toggle" (click)="sidebarCollapsed=!sidebarCollapsed" aria-label="Toggle sidenav">
              <span class="icon">{{ sidebarCollapsed ? '➡️' : '⬅️' }}</span>
              <span *ngIf="!sidebarCollapsed">Collapse</span>
            </button>
            <button class="esg-dark-toggle" (click)="toggleDarkMode()" aria-label="Toggle dark mode">
              <span class="icon">{{ darkMode ? '☀️' : '🌙' }}</span>
              <span *ngIf="!sidebarCollapsed">{{ darkMode ? 'Light' : 'Dark' }} Mode</span>
            </button>
            <button class="esg-logout" (click)="logout()" aria-label="Logout">
              <span class="icon">🚪</span>
              <span *ngIf="!sidebarCollapsed">Logout</span>
            </button>
          </div>
        </nav>
      </aside>
      <main class="esg-main">
        <div class="esg-summary-actions">
          <button>Export Report</button>
        </div>
        <div class="esg-summary-row">
          <div class="esg-summary-card">
            <div class="esg-summary-label">Total Budget</div>
            <div class="esg-summary-value">$155,000</div>
            <div class="esg-summary-change">+15%</div>
          </div>
          <div class="esg-summary-card">
            <div class="esg-summary-label">Total Spent</div>
            <div class="esg-summary-value">$100,000</div>
            <div class="esg-summary-change">+8%</div>
          </div>
          <div class="esg-summary-card">
            <div class="esg-summary-label">Total Leads</div>
            <div class="esg-summary-value">750</div>
            <div class="esg-summary-change">+25%</div>
          </div>
          <div class="esg-summary-card">
            <div class="esg-summary-label">Total Conversions</div>
            <div class="esg-summary-value">165</div>
            <div class="esg-summary-change">+18%</div>
          </div>
        </div>
        <div class="initiatives-dashboard-root">
          <div class="initiatives-header">ESG Initiatives Dashboard</div>
          <div class="initiatives-section">
            <h2>Active Projects</h2>
            <table class="initiatives-table">
              <thead>
                <tr><th>Project</th><th>Status</th><th>Owner</th><th>Actions</th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let project of activeProjects; let i = index">
                  <td>{{ project.name }}</td>
                  <td>{{ project.status }}</td>
                  <td>{{ project.owner }}</td>
                  <td>
                    <button (click)="openEditProject(i)">Edit</button>
                    <button (click)="openMonitorProject(i)">Monitor</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="initiatives-section">
            <h2>Proposals & Approvals</h2>
            <form class="proposal-form" (ngSubmit)="submitProposal()">
              <input [(ngModel)]="newProposal.title" name="title" placeholder="Project Title" required />
              <textarea [(ngModel)]="newProposal.description" name="description" placeholder="Project Description" required></textarea>
              <button type="submit">Submit Proposal</button>
            </form>
            <table class="initiatives-table">
              <thead>
                <tr><th>Title</th><th>Description</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let proposal of proposals">
                  <td>{{ proposal.title }}</td>
                  <td>{{ proposal.description }}</td>
                  <td>{{ proposal.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="initiatives-section">
            <h2>Budget Tracking & Impact Forecasts</h2>
            <table class="initiatives-table">
              <thead>
                <tr><th>Project</th><th>Budget</th><th>Spent</th><th>Forecast Impact</th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let budget of budgets">
                  <td>{{ budget.project }}</td>
                  <td>{{ budget.budget | currency }}</td>
                  <td>{{ budget.spent | currency }}</td>
                  <td>{{ budget.impact }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="initiatives-section">
            <h2>Milestone Tracker</h2>
            <div *ngFor="let milestone of milestones">
              <div>{{ milestone.name }} ({{ milestone.progress }}%)</div>
              <div class="milestone-progress">
                <div class="milestone-bar" [style.width.%]="milestone.progress">{{ milestone.progress }}%</div>
              </div>
              <div>Target Date: {{ milestone.targetDate }}</div>
            </div>
          </div>
        </div>
        <!-- Edit Project Modal -->
        <div *ngIf="editProjectIndex !== null" class="modal-backdrop">
          <div class="modal" [class.dark-mode]="darkMode">
            <button class="modal-close" (click)="closeEditProject()">&times;</button>
            <h3>Edit Project</h3>
            <form (ngSubmit)="saveEditProject()">
              <label>Project Name
                <input [(ngModel)]="editProjectData.name" name="editName" required />
              </label>
              <label>Status
                <select [(ngModel)]="editProjectData.status" name="editStatus">
                  <option>Ongoing</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </select>
              </label>
              <label>Owner
                <input [(ngModel)]="editProjectData.owner" name="editOwner" required />
              </label>
              <label>Progress (%)
                <input type="number" [(ngModel)]="editProjectData.progress" name="editProgress" min="0" max="100" required />
              </label>
              <div class="modal-actions">
                <button type="submit">Save</button>
                <button type="button" (click)="closeEditProject()">Cancel</button>
              </div>
            </form>
          </div>
        </div>
        <!-- Monitor Project Modal -->
        <div *ngIf="monitorProjectIndex !== null" class="modal-backdrop">
          <div class="modal" [class.dark-mode]="darkMode">
            <button class="modal-close" (click)="closeMonitorProject()">&times;</button>
            <h3>Monitor Project</h3>
            <div class="monitor-section">
              <div class="monitor-label">Project: {{ activeProjects[monitorProjectIndex!].name }}</div>
              <div class="monitor-label">Status: {{ activeProjects[monitorProjectIndex!].status }}</div>
              <div class="monitor-label">Owner: {{ activeProjects[monitorProjectIndex!].owner }}</div>
              <div class="monitor-label">Progress:</div>
              <div class="monitor-progress">
                <div class="monitor-bar" [style.width.%]="getMonitorProgress(monitorProjectIndex!)">{{ getMonitorProgress(monitorProjectIndex!) }}%</div>
              </div>
              <div class="modal-actions">
                <button type="button" (click)="closeMonitorProject()">Close</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
})

export class InitiativesDashboardComponent {
  sidebarCollapsed = false;
  darkMode = false;
  logout() { alert('Logged out!'); }
  toggleDarkMode() { this.darkMode = !this.darkMode; }

  activeProjects = [
    { name: 'Renewable Energy Adoption', status: 'Ongoing', owner: 'Alice', progress: 60 },
    { name: 'Reforestation Program', status: 'Ongoing', owner: 'Bob', progress: 40 },
  ];

  // Edit Project Modal State
  editProjectIndex: number | null = null;
  editProjectData = { name: '', status: '', owner: '', progress: 0 };

  openEditProject(i: number) {
    this.editProjectIndex = i;
    this.editProjectData = { ...this.activeProjects[i] };
  }
  closeEditProject() {
    this.editProjectIndex = null;
  }
  saveEditProject() {
    if (this.editProjectIndex !== null) {
      this.activeProjects[this.editProjectIndex] = { ...this.editProjectData };
      this.closeEditProject();
    }
  }

  // Monitor Project Modal State
  monitorProjectIndex: number | null = null;
  openMonitorProject(i: number) {
    this.monitorProjectIndex = i;
  }
  closeMonitorProject() {
    this.monitorProjectIndex = null;
  }
  getMonitorProgress(i: number) {
    return this.activeProjects[i].progress || 0;
  }

  proposals = [
    { title: 'Solar Panel Expansion', description: 'Expand solar panel installation to new sites.', status: 'Pending' },
    { title: 'Water Conservation', description: 'Implement water-saving technologies.', status: 'Approved' },
  ];

  newProposal = { title: '', description: '', status: 'Pending' };

  budgets = [
    { project: 'Renewable Energy Adoption', budget: 100000, spent: 45000, impact: 'Reduce CO₂ by 20%' },
    { project: 'Reforestation Program', budget: 50000, spent: 12000, impact: 'Plant 10,000 trees' },
  ];

  milestones = [
    { name: 'Net Zero Target', progress: 60, targetDate: '2030-12-31' },
    { name: '50% Renewable Energy', progress: 40, targetDate: '2027-06-30' },
  ];

  submitProposal() {
    if (this.newProposal.title && this.newProposal.description) {
      this.proposals.push({ ...this.newProposal });
      this.newProposal = { title: '', description: '', status: 'Pending' };
    }
  }
} 