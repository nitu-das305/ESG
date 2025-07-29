import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

interface MaterialityTopic {
  name: string;
  financialMateriality: number; // 1-5
  environmentalSocialMateriality: number; // 1-5
  aiFinancialSuggestion: number;
  aiEnvSocSuggestion: number;
  aiExplanation: string;
  history: number[];
}

@Component({
  selector: 'app-materiality',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <style>
      .matdash-root {
        min-height: 100vh;
        background: #f8fafc;
        color: #222;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        display: flex;
        flex-direction: row;
      }
      .matdash-sidenav {
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
        transition: background 0.3s, color 0.3s;
      }
      .matdash-root > .matdash-main {
        margin-left: 260px;
      }
      .matdash-sidenav.dark-mode {
        background: #1a1a2e;
        color: #e0e0e0;
        border-right: 1px solid #333;
      }
      .matdash-sidenav-header {
        padding: 2rem 1rem 1rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      .matdash-logo {
        width: 48px;
        height: 48px;
        margin-bottom: 0.5rem;
      }
      .matdash-title {
        font-size: 1.2rem;
        font-weight: 700;
        color: #2563eb;
      }
      .matdash-sidenav.dark-mode .matdash-title {
        color: #7eaaff;
      }
      .matdash-nav {
        display: flex;
        flex-direction: column;
        padding: 1rem 0;
        flex: 1 1 auto;
      }
      .matdash-nav-link {
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
      .matdash-nav-link.active {
        background: #e6f0ff;
        color: #2563eb;
        border-right: 3px solid #2563eb;
      }
      .matdash-nav-link:hover {
        background: #f3f4f6;
        color: #2563eb;
      }
      .matdash-sidenav.dark-mode .matdash-nav-link {
        color: #e0e0e0;
      }
      .matdash-sidenav.dark-mode .matdash-nav-link.active {
        background: #223c2c;
        color: #7eaaff;
        border-right: 3px solid #7eaaff;
      }
      .matdash-sidenav.dark-mode .matdash-nav-link:hover {
        background: #22223c;
        color: #7eaaff;
      }
      .matdash-nav-actions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 2rem;
      }
      .matdash-nav-actions button {
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
      .matdash-nav-actions button:focus {
        outline: 2px solid #2563eb;
        outline-offset: 2px;
      }
      .matdash-nav-actions button:hover {
        background: #f3f4f6;
        color: #2563eb;
      }
      .matdash-sidenav.dark-mode .matdash-nav-actions button {
        color: #e0e0e0;
      }
      .matdash-sidenav.dark-mode .matdash-nav-actions button:hover {
        background: #23284a;
        color: #7eaaff;
      }
      .matdash-nav-actions .icon {
        font-size: 1.2rem;
        display: inline-block;
      }
      .matdash-nav-actions .matdash-logout {
        color: #dc3545;
        font-weight: 600;
      }
      .matdash-sidenav.dark-mode .matdash-nav-actions .matdash-logout {
        color: #ffb3b3;
      }
      .matdash-nav-actions .matdash-logout:hover {
        background: #ffe6e6;
        color: #a71d2a;
      }
      .matdash-sidenav.dark-mode .matdash-nav-actions .matdash-logout:hover {
        background: #3a1a1a;
        color: #ff4d4d;
      }
      @media (max-width: 900px) {
        .matdash-sidenav {
          position: static;
          width: 100%;
          height: auto;
          margin-left: 0;
        }
        .matdash-root > .matdash-main {
          margin-left: 0;
        }
      }
    </style>
    <div class="matdash-root" [class.dark-mode]="darkMode" [class.light-mode]="!darkMode">
      <aside class="matdash-sidenav" [class.collapsed]="sidebarCollapsed" [class.dark-mode]="darkMode">
        <div class="matdash-sidenav-header">
          <img src="assets/logo.png" alt="Logo" class="matdash-logo" />
          <span *ngIf="!sidebarCollapsed" class="matdash-title">Materiality Dashboard</span>
        </div>
        <nav class="matdash-nav">
          <a routerLink="/environmental-dashboard" class="matdash-nav-link">
            <span class="matdash-nav-icon">🌱</span>
            <span *ngIf="!sidebarCollapsed">Sustainability Dashboard</span>
          </a>
          <a routerLink="/materiality" class="matdash-nav-link active"><span class="matdash-nav-icon">📊</span><span *ngIf="!sidebarCollapsed">Materiality Assessment</span></a>
          <a routerLink="/team" class="matdash-nav-link"><span class="matdash-nav-icon">🧑‍🤝‍🧑</span><span *ngIf="!sidebarCollapsed">Manage Team</span></a>
          <a routerLink="/initiatives" class="matdash-nav-link"><span class="matdash-nav-icon">📣</span><span *ngIf="!sidebarCollapsed">ESG Initiative</span></a>
          <a routerLink="/reporting" class="matdash-nav-link"><span class="matdash-nav-icon">📊</span><span *ngIf="!sidebarCollapsed">Reporting & Analysis</span></a>
          <a routerLink="/communication" class="matdash-nav-link"><span class="matdash-nav-icon">💬</span><span *ngIf="!sidebarCollapsed">Communication Hub</span></a>
          <a routerLink="/training" class="matdash-nav-link"><span class="matdash-nav-icon">🎓</span><span *ngIf="!sidebarCollapsed">Training & Development</span></a>
          <a routerLink="/workspace" class="matdash-nav-link"><span class="matdash-nav-icon">📁</span><span *ngIf="!sidebarCollapsed">Workspace</span></a>
          <a routerLink="/stakeholder-engagement" class="matdash-nav-link"><span class="matdash-nav-icon">🤝</span><span *ngIf="!sidebarCollapsed">Stakeholder Engagement</span></a>
          <a routerLink="/data-management" class="matdash-nav-link"><span class="matdash-nav-icon">🗄️</span><span *ngIf="!sidebarCollapsed">Data Management</span></a>
          <a routerLink="/user-role-management" class="matdash-nav-link"><span class="matdash-nav-icon">👤</span><span *ngIf="!sidebarCollapsed">User & Role Management</span></a>
          <a routerLink="/notifications" class="matdash-nav-link"><span class="matdash-nav-icon">🔔</span><span *ngIf="!sidebarCollapsed">Notifications & Alerts</span></a>
          <a routerLink="/calendar" class="matdash-nav-link"><span class="matdash-nav-icon">📅</span><span *ngIf="!sidebarCollapsed">Calendar & Events</span></a>
          <div class="matdash-nav-actions">
            <button class="matdash-sidenav-toggle" (click)="sidebarCollapsed=!sidebarCollapsed" aria-label="Toggle sidenav">
              <span class="icon">{{ sidebarCollapsed ? '➡️' : '⬅️' }}</span>
              <span *ngIf="!sidebarCollapsed">Collapse</span>
            </button>
            <button class="matdash-dark-toggle" (click)="toggleDarkMode()" aria-label="Toggle dark mode">
              <span class="icon">{{ darkMode ? '☀️' : '🌙' }}</span>
              <span *ngIf="!sidebarCollapsed">{{ darkMode ? 'Light' : 'Dark' }} Mode</span>
            </button>
            <button class="matdash-logout" (click)="logout()" aria-label="Logout">
              <span class="icon">🚪</span>
              <span *ngIf="!sidebarCollapsed">Logout</span>
            </button>
          </div>
        </nav>
      </aside>
      <main class="matdash-main">
    <main class="materiality-main">
      <section class="purpose-section">
        <h2>Materiality Assessment</h2>
        <p class="purpose-desc">
          <b>Purpose:</b> This materiality assessment helps your organization identify, prioritize, and visualize the most relevant ESG (Environmental, Social, and Governance) factors for your business. It supports both single and double materiality perspectives, enabling you to assess how ESG topics impact your company financially and how your company impacts the environment and society.
        </p>
        <p class="scope-desc">
          <b>Scope:</b> The assessment covers key ESG factors including: Climate Change, Water Usage, Diversity & Inclusion, Data Privacy, Supply Chain, Waste Management, and Board Diversity. You can also add custom topics relevant to your industry or region.
        </p>
      </section>
      <div class="materiality-customization">
        <label>Industry:
          <select [(ngModel)]="industry">
            <option *ngFor="let ind of industries" [value]="ind">{{ ind }}</option>
          </select>
        </label>
        <label>Stakeholder Group:
          <select [(ngModel)]="selectedStakeholder">
            <option *ngFor="let s of stakeholderGroups" [value]="s">{{ s }}</option>
          </select>
        </label>
        <label>In-house ESG Goal:
          <input [(ngModel)]="inHouseGoal" placeholder="e.g. Net Zero by 2030" />
        </label>
      </div>
      <div class="stakeholder-section">
        <h4>Stakeholder Engagement</h4>
        <div class="stakeholder-row">
          <input [(ngModel)]="newStakeholder" placeholder="Add stakeholder group..." />
          <button (click)="addStakeholder()">Add</button>
        </div>
        <table class="stakeholder-table" *ngIf="stakeholderGroups.length">
          <thead>
            <tr><th>Stakeholder</th><th *ngFor="let topic of topics">{{ topic.name }}</th><th></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let s of stakeholderGroups; let i = index">
              <td>{{ s }}</td>
              <td *ngFor="let topic of topics; let j = index">
                <input type="number" min="1" max="5" [(ngModel)]="stakeholderScores[i][j]" />
              </td>
              <td><button (click)="removeStakeholder(i)">🗑️</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="import-section">
        <h4>Import External Materiality Analysis</h4>
        <input type="file" (change)="importCSV($event)" accept=".csv" />
      </div>
      <div class="materiality-toggle">
        <button [class.active]="mode==='single'" (click)="mode='single'">Single Materiality</button>
        <button [class.active]="mode==='double'" (click)="mode='double'">Double Materiality</button>
      </div>
      <div class="scenario-bar">
        <label>Global Risk Scenario: </label>
        <input type="range" min="-2" max="2" step="1" [(ngModel)]="scenario" (change)="applyScenario()" />
        <span>{{ scenarioLabel }}</span>
      </div>
      <div class="add-topic-row">
        <input [(ngModel)]="newTopicName" placeholder="Add ESG Topic..." />
        <button (click)="addTopic()">Add</button>
      </div>
      <div *ngIf="mode==='single'">
        <h3>Single Materiality: Financial Impact</h3>
        <table class="materiality-table">
          <thead>
            <tr><th>ESG Topic</th><th>Financial Impact</th><th>AI Suggestion</th><th></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let topic of topics; let i = index">
              <td>{{ topic.name }}</td>
              <td>
                <input type="range" min="1" max="5" [(ngModel)]="topic.financialMateriality" />
                <span class="score">{{ topic.financialMateriality }}</span>
              </td>
              <td>
                <span class="ai-badge" (mouseenter)="showExplanation(i, 'fin')" (mouseleave)="hideExplanation()">{{ topic.aiFinancialSuggestion }}
                  <span class="ai-info">?</span>
                </span>
                <div class="ai-explanation" *ngIf="explanationIndex===i && explanationType==='fin'">{{ topic.aiExplanation }}</div>
              </td>
              <td><button (click)="removeTopic(i)">🗑️</button></td>
            </tr>
          </tbody>
        </table>
        <div class="heatmap">
          <h4>Materiality Heatmap</h4>
          <div class="heatmap-row">
            <div *ngFor="let topic of topics" class="heatmap-cell" [style.background]="getColor(topic.financialMateriality)">
              {{ topic.name }}<br><b>{{ topic.financialMateriality }}</b>
            </div>
          </div>
        </div>
        <div class="trend-section">
          <h4>Historical Trends (Demo)</h4>
          <svg width="500" height="120">
            <polyline [attr.points]="getTrendLine()" style="fill:none;stroke:#6c63ff;stroke-width:3" />
            <g *ngFor="let topic of topics; let i = index">
              <circle *ngFor="let v of topic.history; let j = index" [attr.cx]="j*60+30" [attr.cy]="110-v*20" r="3" fill="#4bc0c0" />
            </g>
          </svg>
        </div>
      </div>
      <div *ngIf="mode==='double'">
        <h3>Double Materiality: Financial & Environmental/Social Impact</h3>
        <table class="materiality-table">
          <thead>
            <tr><th>ESG Topic</th><th>Financial Impact</th><th>AI</th><th>Env/Soc Impact</th><th>AI</th><th></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let topic of topics; let i = index">
              <td>{{ topic.name }}</td>
              <td>
                <input type="range" min="1" max="5" [(ngModel)]="topic.financialMateriality" />
                <span class="score">{{ topic.financialMateriality }}</span>
              </td>
              <td>
                <span class="ai-badge" (mouseenter)="showExplanation(i, 'fin')" (mouseleave)="hideExplanation()">{{ topic.aiFinancialSuggestion }}
                  <span class="ai-info">?</span>
                </span>
                <div class="ai-explanation" *ngIf="explanationIndex===i && explanationType==='fin'">{{ topic.aiExplanation }}</div>
              </td>
              <td>
                <input type="range" min="1" max="5" [(ngModel)]="topic.environmentalSocialMateriality" />
                <span class="score">{{ topic.environmentalSocialMateriality }}</span>
              </td>
              <td>
                <span class="ai-badge" (mouseenter)="showExplanation(i, 'env')" (mouseleave)="hideExplanation()">{{ topic.aiEnvSocSuggestion }}
                  <span class="ai-info">?</span>
                </span>
                <div class="ai-explanation" *ngIf="explanationIndex===i && explanationType==='env'">{{ topic.aiExplanation }}</div>
              </td>
              <td><button (click)="removeTopic(i)">🗑️</button></td>
            </tr>
          </tbody>
        </table>
        <div class="scatter-section">
          <h4>Double Materiality Matrix (Scatter Plot)</h4>
          <svg width="500" height="300" style="background:#f7f9ff;border-radius:1rem;">
            <g *ngFor="let topic of topics; let i = index">
              <circle [attr.cx]="topic.financialMateriality*90" [attr.cy]="300-topic.environmentalSocialMateriality*55" r="12" fill="#6c63ff" />
              <text [attr.x]="topic.financialMateriality*90" [attr.y]="300-topic.environmentalSocialMateriality*55-16" text-anchor="middle" font-size="12" fill="#2d2e83">{{ topic.name }}</text>
            </g>
            <text x="250" y="295" text-anchor="middle" font-size="13">Financial Materiality →</text>
            <text x="10" y="150" text-anchor="middle" font-size="13" transform="rotate(-90 10,150)">Env/Soc Materiality ↑</text>
          </svg>
        </div>
        <div class="scatter-section">
          <h4>Double Materiality Matrix (Stakeholder Weighted)</h4>
          <svg width="500" height="300" style="background:#f7f9ff;border-radius:1rem;">
            <g *ngFor="let topic of topics; let i = index">
              <circle [attr.cx]="getWeightedFinancial(i)*90" [attr.cy]="300-getWeightedEnvSoc(i)*55" r="12" fill="#4bc0c0" />
              <text [attr.x]="getWeightedFinancial(i)*90" [attr.y]="300-getWeightedEnvSoc(i)*55-16" text-anchor="middle" font-size="12" fill="#2d2e83">{{ topic.name }}</text>
            </g>
            <text x="250" y="295" text-anchor="middle" font-size="13">Financial Materiality (Weighted) →</text>
            <text x="10" y="150" text-anchor="middle" font-size="13" transform="rotate(-90 10,150)">Env/Soc Materiality (Weighted) ↑</text>
          </svg>
        </div>
      </div>
      <div class="materiality-overview">
        <h4>Materiality Assessment Overview</h4>
        <div class="overview-grid">
          <div class="overview-card">
            <h5>Assessment Status</h5>
            <p>{{ assessmentStatus }}</p>
          </div>
          <div class="overview-card">
            <h5>Last Updated</h5>
            <p>{{ lastUpdated }}</p>
          </div>
          <div class="overview-card">
            <h5>Priority Matrix</h5>
            <p>{{ materialityMatrix }}</p>
          </div>
        </div>
      </div>

      <div class="priority-categories">
        <h4>Topics by Priority Category</h4>
        <div class="category-grid">
          <div class="category-card high-priority">
            <h5>High Priority ({{ getTopicsByCategory('High Priority').length }})</h5>
            <ul>
              <li *ngFor="let topic of getTopicsByCategory('High Priority')">{{ topic.name }}</li>
            </ul>
          </div>
          <div class="category-card financial-priority">
            <h5>Financial Priority ({{ getTopicsByCategory('Financial Priority').length }})</h5>
            <ul>
              <li *ngFor="let topic of getTopicsByCategory('Financial Priority')">{{ topic.name }}</li>
            </ul>
          </div>
          <div class="category-card sustainability-priority">
            <h5>Sustainability Priority ({{ getTopicsByCategory('Sustainability Priority').length }})</h5>
            <ul>
              <li *ngFor="let topic of getTopicsByCategory('Sustainability Priority')">{{ topic.name }}</li>
            </ul>
          </div>
          <div class="category-card monitor">
            <h5>Monitor ({{ getTopicsByCategory('Monitor').length }})</h5>
            <ul>
              <li *ngFor="let topic of getTopicsByCategory('Monitor')">{{ topic.name }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="stakeholder-weights">
        <h4>Stakeholder Weights</h4>
        <div class="weights-grid">
          <div *ngFor="let stakeholder of stakeholderGroups; let i = index" class="weight-item">
            <label>{{ stakeholder }}: {{ stakeholderWeights[i] }}%</label>
            <input type="range" min="0" max="50" [(ngModel)]="stakeholderWeights[i]" (change)="updateStakeholderWeight(i, stakeholderWeights[i])" />
          </div>
        </div>
      </div>

      <div class="export-actions">
        <button (click)="exportCSV()">Export to CSV</button>
        <button (click)="generateStakeholderSurvey()">Generate Survey</button>
        <button (click)="exportMaterialityReport()">Export Full Report</button>
      </div>

      <div class="ai-summary">
        <h4>AI-Powered Insights & Recommendations</h4>
        <div class="insights-content">
          <p><strong>Current Assessment:</strong> {{ aiSummary }}</p>
          <div class="actionable-insights">
            <h5>Actionable Insights:</h5>
            <ul>
              <li *ngFor="let topic of getTopicsByCategory('High Priority')">
                <strong>{{ topic.name }}:</strong> Requires immediate attention for both financial and sustainability aspects
              </li>
              <li *ngFor="let topic of getTopicsByCategory('Financial Priority')">
                <strong>{{ topic.name }}:</strong> Focus on financial risk mitigation and compliance
              </li>
              <li *ngFor="let topic of getTopicsByCategory('Sustainability Priority')">
                <strong>{{ topic.name }}:</strong> Prioritize environmental and social impact management
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .materiality-main { padding: 2rem; max-width: 900px; margin: auto; }
    .purpose-section { background: #f7f9ff; border-radius: 1.2rem; padding: 1.2rem 1.5rem; margin-bottom: 2rem; box-shadow: 0 2px 8px #6c63ff11; }
    .purpose-desc, .scope-desc { font-size: 1.08rem; color: #2d2e83; margin-bottom: 0.5rem; }
    .materiality-customization { margin-bottom: 1.5rem; }
    .materiality-customization label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #2d2e83; }
    .materiality-customization select, .materiality-customization input { padding: 0.4rem 1rem; border-radius: 0.7rem; border: 1px solid #ccc; margin-right: 0.7rem; }
    .stakeholder-section { margin-bottom: 1.5rem; }
    .stakeholder-row { display: flex; gap: 0.7rem; margin-bottom: 0.7rem; }
    .stakeholder-row input { flex-grow: 1; }
    .stakeholder-row button { padding: 0.4rem 1.2rem; border-radius: 0.7rem; border: none; background: #4bc0c0; color: #fff; font-weight: 600; }
    .stakeholder-table { width: 100%; border-collapse: collapse; margin-top: 0.7rem; }
    .stakeholder-table th, .stakeholder-table td { padding: 0.5em 1em; text-align: left; }
    .stakeholder-table th { background: #6c63ff; color: #fff; }
    .stakeholder-table tr:nth-child(even) { background: #f7f9ff; }
    .stakeholder-table tr:nth-child(odd) { background: #e3e6ff22; }
    .import-section { margin-bottom: 1.5rem; }
    .import-section input { padding: 0.4rem 1rem; border-radius: 0.7rem; border: 1px solid #ccc; }
    .materiality-toggle { margin-bottom: 1.5rem; }
    .materiality-toggle button { margin-right: 1rem; padding: 0.5rem 1.2rem; border-radius: 1rem; border: none; background: #e3e6ff; color: #2d2e83; font-weight: 600; cursor: pointer; }
    .materiality-toggle button.active { background: #6c63ff; color: #fff; }
    .scenario-bar { margin-bottom: 1.2rem; }
    .add-topic-row { margin-bottom: 1.2rem; }
    .add-topic-row input { padding: 0.4rem 1rem; border-radius: 0.7rem; border: 1px solid #ccc; margin-right: 0.7rem; }
    .add-topic-row button { padding: 0.4rem 1.2rem; border-radius: 0.7rem; border: none; background: #4bc0c0; color: #fff; font-weight: 600; }
    .materiality-table { width: 100%; border-collapse: collapse; margin-bottom: 2rem; }
    .materiality-table th, .materiality-table td { padding: 0.7em 1em; text-align: left; }
    .materiality-table th { background: #6c63ff; color: #fff; }
    .materiality-table tr:nth-child(even) { background: #f7f9ff; }
    .materiality-table tr:nth-child(odd) { background: #e3e6ff22; }
    .ai-badge { background: #4bc0c0; color: #fff; border-radius: 0.7em; padding: 0.1em 0.6em; font-size: 0.85em; font-weight: 600; position: relative; cursor: pointer; }
    .ai-info { margin-left: 0.3em; font-size: 1em; color: #fff; background: #2d2e83; border-radius: 50%; padding: 0 0.4em; }
    .ai-explanation { position: absolute; background: #fff; color: #2d2e83; border: 1px solid #6c63ff; border-radius: 0.7em; padding: 0.7em 1em; font-size: 0.95em; z-index: 10; margin-top: 0.5em; min-width: 180px; box-shadow: 0 2px 8px #6c63ff22; }
    .score { font-weight: 700; margin-left: 0.5em; }
    .heatmap { margin-top: 2rem; }
    .heatmap-row, .heatmap-grid { display: flex; gap: 1rem; flex-wrap: wrap; }
    .heatmap-cell { min-width: 120px; min-height: 70px; border-radius: 1rem; color: #fff; font-weight: 700; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 2px 8px #6c63ff22; text-align: center; font-size: 1rem; }
    .trend-section { margin-top: 2rem; }
    .scatter-section { margin-top: 2rem; }
    .materiality-overview { margin-top: 2rem; }
    .overview-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem; }
    .overview-card { background: #fff; border-radius: 0.7rem; padding: 1rem; box-shadow: 0 2px 8px #6c63ff11; text-align: center; }
    .overview-card h5 { color: #2d2e83; margin-bottom: 0.5rem; }
    .overview-card p { color: #6c63ff; font-weight: 600; }
    
    .priority-categories { margin-top: 2rem; }
    .category-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1rem; }
    .category-card { border-radius: 0.7rem; padding: 1rem; box-shadow: 0 2px 8px #6c63ff11; }
    .category-card.high-priority { background: linear-gradient(135deg, #ff6b6b, #ee5a52); color: #fff; }
    .category-card.financial-priority { background: linear-gradient(135deg, #4ecdc4, #44a08d); color: #fff; }
    .category-card.sustainability-priority { background: linear-gradient(135deg, #45b7d1, #96c93d); color: #fff; }
    .category-card.monitor { background: linear-gradient(135deg, #f7f9ff, #e3e6ff); color: #2d2e83; }
    .category-card h5 { margin-bottom: 0.5rem; font-weight: 600; }
    .category-card ul { list-style: none; padding: 0; }
    .category-card li { padding: 0.2rem 0; font-size: 0.9rem; }
    
    .stakeholder-weights { margin-top: 2rem; }
    .weights-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
    .weight-item { background: #fff; border-radius: 0.7rem; padding: 1rem; box-shadow: 0 2px 8px #6c63ff11; }
    .weight-item label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #2d2e83; }
    .weight-item input[type="range"] { width: 100%; }
    
    .export-actions { margin-top: 2rem; text-align: center; }
    .export-actions button { margin: 0 0.5rem; padding: 0.5rem 1.2rem; border-radius: 0.7rem; border: none; background: #6c63ff; color: #fff; font-weight: 600; cursor: pointer; }
    .export-actions button:hover { background: #5a52d4; }
    
    .ai-summary { margin-top: 2.5rem; background: #f7f9ff; border-radius: 1rem; padding: 1.2rem 1.5rem; box-shadow: 0 2px 8px #6c63ff11; }
    .insights-content { margin-top: 1rem; }
    .actionable-insights { margin-top: 1rem; }
    .actionable-insights h5 { color: #2d2e83; margin-bottom: 0.5rem; }
    .actionable-insights ul { list-style: none; padding: 0; }
    .actionable-insights li { padding: 0.3rem 0; border-bottom: 1px solid #e3e6ff; }
    .actionable-insights li:last-child { border-bottom: none; }
    @media (max-width: 900px) {
      .trend-section svg, .scatter-section svg { width: 100% !important; height: auto !important; }
    }
  `],
})
export class MaterialityComponent {
  darkMode = false;
  sidebarCollapsed = false;
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }
  mode: 'single' | 'double' = 'single';
  scenario = 0;
  scenarioLabel = 'Neutral';
  newTopicName = '';
  explanationIndex: number|null = null;
  explanationType: 'fin'|'env'|null = null;
  aiSummary = '';
  selectedStakeholder = '';
  assessmentStatus = 'In Progress';
  lastUpdated = new Date().toLocaleDateString();
  materialityMatrix = 'High Priority';
  
  // Enhanced topics with more comprehensive ESG coverage
  topics: MaterialityTopic[] = [
    { name: 'Climate Change & Carbon Emissions', financialMateriality: 4, environmentalSocialMateriality: 5, aiFinancialSuggestion: 4, aiEnvSocSuggestion: 5, aiExplanation: 'High regulatory pressure, carbon pricing, and investor expectations make this highly material for financial performance and environmental impact.', history: [3,4,4,4,4] },
    { name: 'Water Management & Scarcity', financialMateriality: 3, environmentalSocialMateriality: 4, aiFinancialSuggestion: 3, aiEnvSocSuggestion: 4, aiExplanation: 'Water scarcity risks, regulatory compliance, and operational continuity concerns.', history: [2,3,3,3,3] },
    { name: 'Diversity, Equity & Inclusion', financialMateriality: 4, environmentalSocialMateriality: 5, aiFinancialSuggestion: 4, aiEnvSocSuggestion: 5, aiExplanation: 'Talent attraction, regulatory requirements, and social license to operate.', history: [3,3,4,4,4] },
    { name: 'Data Privacy & Cybersecurity', financialMateriality: 5, environmentalSocialMateriality: 3, aiFinancialSuggestion: 5, aiEnvSocSuggestion: 3, aiExplanation: 'High financial and reputational risks from data breaches and regulatory fines.', history: [4,4,4,5,5] },
    { name: 'Supply Chain Sustainability', financialMateriality: 4, environmentalSocialMateriality: 4, aiFinancialSuggestion: 4, aiEnvSocSuggestion: 4, aiExplanation: 'Operational resilience, regulatory compliance, and stakeholder expectations.', history: [3,3,4,4,4] },
    { name: 'Waste Management & Circular Economy', financialMateriality: 3, environmentalSocialMateriality: 4, aiFinancialSuggestion: 3, aiEnvSocSuggestion: 4, aiExplanation: 'Regulatory requirements, cost savings opportunities, and environmental impact reduction.', history: [2,2,3,3,3] },
    { name: 'Board Diversity & Governance', financialMateriality: 4, environmentalSocialMateriality: 3, aiFinancialSuggestion: 4, aiEnvSocSuggestion: 3, aiExplanation: 'Investor expectations, regulatory scrutiny, and decision-making quality.', history: [3,3,3,4,4] },
    { name: 'Energy Efficiency & Renewable Energy', financialMateriality: 4, environmentalSocialMateriality: 4, aiFinancialSuggestion: 4, aiEnvSocSuggestion: 4, aiExplanation: 'Cost reduction, regulatory compliance, and climate action alignment.', history: [3,3,4,4,4] },
    { name: 'Human Rights & Labor Standards', financialMateriality: 3, environmentalSocialMateriality: 5, aiFinancialSuggestion: 3, aiEnvSocSuggestion: 5, aiExplanation: 'Reputational risks, regulatory compliance, and social impact considerations.', history: [3,3,3,3,3] },
    { name: 'Biodiversity & Ecosystem Impact', financialMateriality: 2, environmentalSocialMateriality: 4, aiFinancialSuggestion: 2, aiEnvSocSuggestion: 4, aiExplanation: 'Regulatory requirements, stakeholder concerns, and long-term sustainability.', history: [2,2,2,3,2] },
    { name: 'Product Safety & Quality', financialMateriality: 5, environmentalSocialMateriality: 3, aiFinancialSuggestion: 5, aiEnvSocSuggestion: 3, aiExplanation: 'Legal liability, brand reputation, and customer trust.', history: [4,4,5,5,5] },
    { name: 'Community Relations & Social Impact', financialMateriality: 3, environmentalSocialMateriality: 4, aiFinancialSuggestion: 3, aiEnvSocSuggestion: 4, aiExplanation: 'Social license to operate, stakeholder relationships, and long-term business sustainability.', history: [3,3,3,3,3] }
  ];
  // Enhanced stakeholder groups with weights
  stakeholderGroups: string[] = ['Customers', 'Employees', 'Investors', 'Regulators', 'Suppliers', 'Communities', 'Media', 'NGOs'];
  stakeholderWeights: number[] = [25, 20, 20, 15, 10, 5, 3, 2]; // Percentage weights
  stakeholderScores: number[][] = [
    [4, 3, 4, 5, 3, 4, 3, 4, 4, 3, 2, 3], // Customers
    [5, 4, 5, 4, 4, 4, 4, 5, 4, 4, 3, 4], // Employees
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // Investors
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], // Regulators
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], // Suppliers
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // Communities
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], // Media
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]  // NGOs
  ];
  newStakeholder = '';
  industry = 'Technology';
  inHouseGoal = 'Net Zero by 2030';
  industries = ['Technology', 'Energy', 'Financial Services', 'Manufacturing', 'Retail', 'Healthcare', 'Other'];

  showExplanation(i: number, type: 'fin'|'env') { this.explanationIndex = i; this.explanationType = type; }
  hideExplanation() { this.explanationIndex = null; this.explanationType = null; }

  addTopic() {
    if (!this.newTopicName.trim()) return;
    this.topics.push({
      name: this.newTopicName,
      financialMateriality: 3,
      environmentalSocialMateriality: 3,
      aiFinancialSuggestion: 3,
      aiEnvSocSuggestion: 3,
      aiExplanation: 'AI will analyze this topic soon.',
      history: [3,3,3,3,3]
    });
    this.newTopicName = '';
    this.updateSummary();
  }
  removeTopic(i: number) {
    this.topics.splice(i, 1);
    this.updateSummary();
  }
  getColor(score: number): string {
    if (score >= 4) return '#388e3c';
    if (score === 3) return '#ffce56';
    return '#e84343';
  }
  getDoubleColor(topic: MaterialityTopic): string {
    const avg = (topic.financialMateriality + topic.environmentalSocialMateriality) / 2;
    if (avg >= 4) return '#388e3c';
    if (avg >= 3) return '#ffce56';
    return '#e84343';
  }
  getTrendLine(): string {
    // Demo: average of first topic's history
    if (!this.topics.length) return '';
    return this.topics[0].history.map((v, i) => `${i*60+30},${110-v*20}`).join(' ');
  }
  exportCSV() {
    let csv = 'Topic,Financial,Env/Soc,AI Financial,AI Env/Soc\n';
    for (const t of this.topics) {
      csv += `${t.name},${t.financialMateriality},${t.environmentalSocialMateriality},${t.aiFinancialSuggestion},${t.aiEnvSocSuggestion}\n`;
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'materiality.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  applyScenario() {
    // Demo: adjust all scores by scenario
    for (const t of this.topics) {
      t.financialMateriality = Math.max(1, Math.min(5, t.aiFinancialSuggestion + this.scenario));
      t.environmentalSocialMateriality = Math.max(1, Math.min(5, t.aiEnvSocSuggestion + this.scenario));
    }
    this.updateSummary();
    this.scenarioLabel = this.scenario === 0 ? 'Neutral' : (this.scenario > 0 ? 'High Risk' : 'Low Risk');
  }
  updateSummary() {
    // Demo: summarize top 3 topics by average materiality
    const sorted = [...this.topics].sort((a, b) => ((b.financialMateriality + b.environmentalSocialMateriality) - (a.financialMateriality + a.environmentalSocialMateriality)));
    this.aiSummary = 'Top material topics: ' + sorted.slice(0, 3).map(t => t.name).join(', ') + '.';
  }
  addStakeholder() {
    if (!this.newStakeholder.trim()) return;
    this.stakeholderGroups.push(this.newStakeholder);
    this.stakeholderScores.push(this.topics.map(() => 3)); // Initialize scores for new stakeholder
    this.newStakeholder = '';
  }
  removeStakeholder(index: number) {
    this.stakeholderGroups.splice(index, 1);
    this.stakeholderScores.splice(index, 1);
  }
  importCSV(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const csv = e.target.result as string;
        const lines = csv.split('\n');
        const headers = lines[0].split(',');
        const data: MaterialityTopic[] = [];

        for (let i = 1; i < lines.length; i++) {
          const row = lines[i].split(',');
          if (row.length === 5) {
            data.push({
              name: row[0].trim(),
              financialMateriality: parseInt(row[1].trim(), 10),
              environmentalSocialMateriality: parseInt(row[2].trim(), 10),
              aiFinancialSuggestion: parseInt(row[3].trim(), 10),
              aiEnvSocSuggestion: parseInt(row[4].trim(), 10),
              aiExplanation: 'Imported from CSV',
              history: [3,3,3,3,3] // Placeholder for history
            });
          }
        }
        this.topics = data;
        this.updateSummary();
        alert('Topics imported successfully!');
      }
    };
    reader.readAsText(file);
  }
  getWeightedFinancial(topicIndex: number): number {
    let weightedSum = 0;
    let totalWeight = 0;
    for (let i = 0; i < this.stakeholderGroups.length; i++) {
      weightedSum += this.stakeholderScores[i][topicIndex] * this.topics[topicIndex].financialMateriality;
      totalWeight += this.stakeholderScores[i][topicIndex];
    }
    return totalWeight > 0 ? weightedSum / totalWeight : 0;
  }
  getWeightedEnvSoc(topicIndex: number): number {
    let weightedSum = 0;
    let totalWeight = 0;
    for (let i = 0; i < this.stakeholderGroups.length; i++) {
      weightedSum += this.stakeholderScores[i][topicIndex] * this.topics[topicIndex].environmentalSocialMateriality;
      totalWeight += this.stakeholderScores[i][topicIndex];
    }
    return totalWeight > 0 ? weightedSum / totalWeight : 0;
  }

  // Enhanced stakeholder survey functionality
  generateStakeholderSurvey() {
    let survey = 'Materiality Assessment Stakeholder Survey\n\n';
    survey += 'Dear Stakeholder,\n\n';
    survey += 'We are conducting a materiality assessment to identify and prioritize the most important ESG (Environmental, Social, and Governance) topics for our organization. Your input is valuable in helping us understand stakeholder perspectives.\n\n';
    survey += 'Please rate the importance of each topic on a scale of 1-5:\n';
    survey += '1 = Not Important, 2 = Low Importance, 3 = Moderate Importance, 4 = High Importance, 5 = Critical Importance\n\n';
    
    this.topics.forEach((topic, index) => {
      survey += `${index + 1}. ${topic.name}\n`;
      survey += `   Financial Impact: ___ (1-5)\n`;
      survey += `   Environmental/Social Impact: ___ (1-5)\n\n`;
    });
    
    survey += 'Additional Comments:\n';
    survey += '_________________________________\n\n';
    survey += 'Thank you for your participation!\n';
    
    const blob = new Blob([survey], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stakeholder_survey.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Materiality matrix categorization
  getMaterialityCategory(topic: MaterialityTopic): string {
    const finScore = topic.financialMateriality;
    const envSocScore = topic.environmentalSocialMateriality;
    
    if (finScore >= 4 && envSocScore >= 4) return 'High Priority';
    if (finScore >= 4 && envSocScore < 4) return 'Financial Priority';
    if (finScore < 4 && envSocScore >= 4) return 'Sustainability Priority';
    return 'Monitor';
  }

  // Get topics by category
  getTopicsByCategory(category: string): MaterialityTopic[] {
    return this.topics.filter(topic => this.getMaterialityCategory(topic) === category);
  }

  // Enhanced AI summary with actionable insights
  generateActionableInsights() {
    const highPriority = this.getTopicsByCategory('High Priority');
    const financialPriority = this.getTopicsByCategory('Financial Priority');
    const sustainabilityPriority = this.getTopicsByCategory('Sustainability Priority');
    
    let insights = 'Materiality Assessment Insights & Recommendations\n\n';
    insights += `Assessment Date: ${new Date().toLocaleDateString()}\n`;
    insights += `Industry: ${this.industry}\n\n`;
    
    insights += 'HIGH PRIORITY TOPICS (Immediate Action Required):\n';
    highPriority.forEach(topic => {
      insights += `• ${topic.name}: Focus on both financial and sustainability aspects\n`;
    });
    
    insights += '\nFINANCIAL PRIORITY TOPICS (Financial Risk Management):\n';
    financialPriority.forEach(topic => {
      insights += `• ${topic.name}: Prioritize financial risk mitigation\n`;
    });
    
    insights += '\nSUSTAINABILITY PRIORITY TOPICS (Environmental/Social Impact):\n';
    sustainabilityPriority.forEach(topic => {
      insights += `• ${topic.name}: Focus on environmental and social impact management\n`;
    });
    
    insights += '\nSTRATEGIC RECOMMENDATIONS:\n';
    insights += '1. Develop action plans for high-priority topics\n';
    insights += '2. Integrate materiality findings into strategic planning\n';
    insights += '3. Establish KPIs for priority topics\n';
    insights += '4. Regular stakeholder engagement for ongoing assessment\n';
    insights += '5. Annual materiality review and update\n';
    
    return insights;
  }

  // Export comprehensive materiality report
  exportMaterialityReport() {
    const report = this.generateActionableInsights();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'materiality_assessment_report.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Update stakeholder weights
  updateStakeholderWeight(index: number, weight: number) {
    this.stakeholderWeights[index] = weight;
    this.updateSummary();
  }

  constructor(private router: Router) { this.updateSummary(); }
} 