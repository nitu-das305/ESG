import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stakeholder-engagement',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <style>
      .stake-root {
        min-height: 100vh;
        background: #f8fafc;
        color: #222;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        display: flex;
        flex-direction: row;
      }
      .stake-sidenav {
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
      .stake-root > .stake-main {
        margin-left: 260px;
        width: 100%;
        padding: 2.5rem 2.5rem 2.5rem 2.5rem;
        transition: margin-left 0.3s, padding-left 0.3s;
        background: #f4f6fb;
        min-height: 100vh;
      }
      .stake-sidenav-header {
        padding: 2rem 1rem 1rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      .stake-logo {
        width: 48px;
        height: 48px;
        margin-bottom: 0.5rem;
      }
      .stake-title {
        font-size: 1.2rem;
        font-weight: 700;
        color: #2563eb;
      }
      .stake-nav {
        display: flex;
        flex-direction: column;
        padding: 1rem 0;
        flex: 1 1 auto;
      }
      .stake-nav-link {
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
      .stake-nav-link.active {
        background: #e6f0ff;
        color: #2563eb;
        border-right: 3px solid #2563eb;
      }
      .stake-nav-link:hover {
        background: #f3f4f6;
        color: #2563eb;
      }
      .stake-nav-actions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 2rem;
      }
      .stake-nav-actions button {
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
      .stake-nav-actions button:focus {
        outline: 2px solid #2563eb;
        outline-offset: 2px;
      }
      .stake-nav-actions button:hover {
        background: #f3f4f6;
        color: #2563eb;
      }
      .stake-nav-actions .icon {
        font-size: 1.2rem;
        display: inline-block;
      }
      .stake-nav-actions .stake-logout {
        color: #dc3545;
        font-weight: 600;
      }
      .stake-nav-actions .stake-logout:hover {
        background: #ffe6e6;
        color: #a71d2a;
      }
      .stake-main-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2.5rem;
        align-items: flex-start;
      }
      .stake-section-panel {
        background: #fff;
        border-radius: 18px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.07);
        padding: 2rem 1.5rem 1.5rem 1.5rem;
        margin-bottom: 0;
        display: flex;
        flex-direction: column;
        min-height: 350px;
      }
      .stake-section-panel h2 {
        font-size: 1.3rem;
        font-weight: 700;
        color: #2563eb;
        margin-bottom: 1.2rem;
      }
      .stake-btn {
        background: #2563eb;
        color: #fff;
        border: none;
        border-radius: 6px;
        padding: 0.5rem 1.2rem;
        font-weight: 600;
        cursor: pointer;
        margin-left: 0.5rem;
        transition: background 0.2s;
      }
      .stake-btn:hover {
        background: #1746a2;
      }
      .stake-input, .stake-textarea {
        width: 100%;
        margin-bottom: 0.5rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
      .stake-textarea { min-height: 60px; }
      .stake-list {
        list-style: none;
        padding: 0;
        margin: 0 0 1rem 0;
      }
      .stake-list-item {
        background: #f3f4f6;
        margin-bottom: 0.5rem;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .stake-analytics {
        background: #e6f0ff;
        border-radius: 10px;
        padding: 1rem 1.5rem;
        margin-top: 1.5rem;
        color: #2563eb;
        font-weight: 600;
        font-size: 1.1rem;
      }
      .stake-root.dark-mode > .stake-main {
        background: #181828;
      }
      .stake-root.dark-mode .stake-section-panel {
        background: #23284a;
        color: #e0e0e0;
        border: 1px solid #333;
      }
      .stake-root.dark-mode .stake-section-panel h2 {
        color: #7eaaff;
      }
      .stake-root.dark-mode .stake-list-item {
        background: #23284a;
        color: #e0e0e0;
      }
      .stake-root.dark-mode .stake-input, .stake-root.dark-mode .stake-textarea {
        background: #181828;
        color: #e0e0e0;
        border: 1px solid #333;
      }
      .stake-root.dark-mode .stake-analytics {
        background: #223c2c;
        color: #7eaaff;
      }
      @media (max-width: 1100px) {
        .stake-main-content {
          grid-template-columns: 1fr;
        }
      }
    </style>
    <div class="stake-root" [class.dark-mode]="darkMode">
      <aside class="stake-sidenav" [class.collapsed]="sidebarCollapsed" [class.dark-mode]="darkMode">
        <div class="stake-sidenav-header">
          <img src="assets/logo.png" alt="Logo" class="stake-logo" />
          <span class="stake-title" *ngIf="!sidebarCollapsed">Stakeholder Engagement</span>
        </div>
        <nav class="stake-nav">
          <a routerLink="/environmental-dashboard" routerLinkActive="active" class="stake-nav-link"><span class="stake-nav-icon">🌱</span><span *ngIf="!sidebarCollapsed">Sustainability Dashboard</span></a>
          <a routerLink="/materiality" routerLinkActive="active" class="stake-nav-link"><span class="stake-nav-icon">📊</span><span *ngIf="!sidebarCollapsed">Materiality Assessment</span></a>
          <a routerLink="/team" routerLinkActive="active" class="stake-nav-link"><span class="stake-nav-icon">🧑‍🤝‍🧑</span><span *ngIf="!sidebarCollapsed">Manage Team</span></a>
          <a routerLink="/initiatives-dashboard" routerLinkActive="active" class="stake-nav-link"><span class="stake-nav-icon">📣</span><span *ngIf="!sidebarCollapsed">ESG Initiative</span></a>
          <a routerLink="/reporting" routerLinkActive="active" class="stake-nav-link"><span class="stake-nav-icon">📊</span><span *ngIf="!sidebarCollapsed">Reporting & Analysis</span></a>
          <a routerLink="/communication-hub" routerLinkActive="active" class="stake-nav-link"><span class="stake-nav-icon">💬</span><span *ngIf="!sidebarCollapsed">Communication Hub</span></a>
          <a routerLink="/training" routerLinkActive="active" class="stake-nav-link"><span class="stake-nav-icon">🎓</span><span *ngIf="!sidebarCollapsed">Training & Development</span></a>
          <a routerLink="/workspace" routerLinkActive="active" class="stake-nav-link"><span class="stake-nav-icon">📁</span><span *ngIf="!sidebarCollapsed">Workspace</span></a>
          <a routerLink="/stakeholder-engagement" routerLinkActive="active" class="stake-nav-link"><span class="stake-nav-icon">🤝</span><span *ngIf="!sidebarCollapsed">Stakeholder Engagement</span></a>
          <a routerLink="/data-management" routerLinkActive="active" class="stake-nav-link"><span class="stake-nav-icon">🗄️</span><span *ngIf="!sidebarCollapsed">Data Management</span></a>
          <a routerLink="/user-role-management" routerLinkActive="active" class="stake-nav-link"><span class="stake-nav-icon">👤</span><span *ngIf="!sidebarCollapsed">User & Role Management</span></a>
          <a routerLink="/notifications" routerLinkActive="active" class="stake-nav-link"><span class="stake-nav-icon">🔔</span><span *ngIf="!sidebarCollapsed">Notifications & Alerts</span></a>
          <a routerLink="/calendar" routerLinkActive="active" class="stake-nav-link"><span class="stake-nav-icon">📅</span><span *ngIf="!sidebarCollapsed">Calendar & Events</span></a>
          <div class="stake-nav-actions">
            <button class="stake-sidenav-toggle" (click)="sidebarCollapsed=!sidebarCollapsed" aria-label="Toggle sidenav">
              <span class="icon">{{ sidebarCollapsed ? '➡️' : '⬅️' }}</span>
              <span *ngIf="!sidebarCollapsed">Collapse</span>
            </button>
            <button class="stake-dark-toggle" (click)="toggleDarkMode()" aria-label="Toggle dark mode">
              <span class="icon">{{ darkMode ? '☀️' : '🌙' }}</span>
              <span *ngIf="!sidebarCollapsed">{{ darkMode ? 'Light' : 'Dark' }} Mode</span>
            </button>
            <button class="stake-logout" (click)="logout()" aria-label="Logout">
              <span class="icon">🚪</span>
              <span *ngIf="!sidebarCollapsed">Logout</span>
            </button>
          </div>
        </nav>
      </aside>
      <main class="stake-main">
        <div class="stake-header" style="margin-bottom:2.5rem;">Stakeholder Engagement</div>
        <div class="stake-main-content">
          <!-- Surveys & Feedback -->
          <div class="stake-section-panel">
            <h2>Surveys & Feedback</h2>
            <input class="stake-input" [(ngModel)]="newSurvey" placeholder="Survey title..." />
            <textarea class="stake-textarea" [(ngModel)]="newSurveyDesc" placeholder="Survey description..."></textarea>
            <button class="stake-btn" (click)="addSurvey()">Launch Survey</button>
            <ul class="stake-list">
              <li *ngFor="let s of surveys; let i = index" class="stake-list-item">
                <span><b>{{ s.title }}</b>: {{ s.desc }}</span>
                <button class="stake-btn" (click)="deleteSurvey(i)">Delete</button>
              </li>
            </ul>
            <div class="stake-analytics">
              <div><b>Engagement Analytics</b></div>
              <div>Total Surveys: {{ surveys.length }}</div>
              <div>Avg. Responses: {{ avgResponses }}</div>
              <div>Positive Feedback: {{ positiveFeedback }}%</div>
            </div>
          </div>

          <!-- Community Initiatives -->
          <div class="stake-section-panel">
            <h2>Community Initiatives</h2>
            <input class="stake-input" [(ngModel)]="newInitiative" placeholder="Initiative name..." />
            <textarea class="stake-textarea" [(ngModel)]="newInitiativeDesc" placeholder="Initiative description..."></textarea>
            <button class="stake-btn" (click)="addInitiative()">Add Initiative</button>
            <ul class="stake-list">
              <li *ngFor="let c of initiatives; let i = index" class="stake-list-item">
                <span><b>{{ c.name }}</b>: {{ c.desc }}</span>
                <button class="stake-btn" (click)="deleteInitiative(i)">Delete</button>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  `,
})

export class StakeholderEngagementComponent {
  sidebarCollapsed = false;
  darkMode = false;
  logout() { alert('Logged out!'); }
  toggleDarkMode() { this.darkMode = !this.darkMode; }

  // Surveys & Feedback
  surveys: { title: string; desc: string }[] = [
    { title: 'Sustainability Awareness', desc: 'Quarterly survey on sustainability practices.' },
  ];
  newSurvey = '';
  newSurveyDesc = '';
  addSurvey() {
    if (this.newSurvey.trim() && this.newSurveyDesc.trim()) {
      this.surveys.unshift({ title: this.newSurvey.trim(), desc: this.newSurveyDesc.trim() });
      this.newSurvey = '';
      this.newSurveyDesc = '';
    }
  }
  deleteSurvey(i: number) {
    this.surveys.splice(i, 1);
  }
  get avgResponses() { return 42; }
  get positiveFeedback() { return 87; }

  // Community Initiatives
  initiatives: { name: string; desc: string }[] = [
    { name: 'Tree Planting Drive', desc: 'Annual community tree planting event.' },
  ];
  newInitiative = '';
  newInitiativeDesc = '';
  addInitiative() {
    if (this.newInitiative.trim() && this.newInitiativeDesc.trim()) {
      this.initiatives.unshift({ name: this.newInitiative.trim(), desc: this.newInitiativeDesc.trim() });
      this.newInitiative = '';
      this.newInitiativeDesc = '';
    }
  }
  deleteInitiative(i: number) {
    this.initiatives.splice(i, 1);
  }
} 