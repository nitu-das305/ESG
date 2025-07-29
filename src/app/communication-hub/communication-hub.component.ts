import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-communication-hub',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <style>
      .comm-root {
        min-height: 100vh;
        background: #f8fafc;
        color: #222;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        display: flex;
        flex-direction: row;
      }
      .comm-sidenav {
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
      .comm-sidenav.collapsed {
        width: 70px;
      }
      .comm-root > .comm-main {
        margin-left: 260px;
        width: 100%;
        padding-left: 2.5rem;
        transition: margin-left 0.3s, padding-left 0.3s;
      }
      .comm-sidenav.collapsed ~ .comm-main {
        margin-left: 70px;
        padding-left: 1rem;
      }
      .comm-sidenav-header {
        padding: 2rem 1rem 1rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      .comm-logo {
        width: 48px;
        height: 48px;
        margin-bottom: 0.5rem;
      }
      .comm-title {
        font-size: 1.2rem;
        font-weight: 700;
        color: #2563eb;
        transition: opacity 0.3s;
      }
      .comm-sidenav.collapsed .comm-title {
        opacity: 0;
      }
      .comm-nav {
        display: flex;
        flex-direction: column;
        padding: 1rem 0;
        flex: 1 1 auto;
      }
      .comm-nav-link {
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
      .comm-nav-link.active {
        background: #e6f0ff;
        color: #2563eb;
        border-right: 3px solid #2563eb;
      }
      .comm-nav-link:hover {
        background: #f3f4f6;
        color: #2563eb;
      }
      .comm-sidenav.collapsed .comm-nav-link span:not(.comm-nav-icon) {
        display: none;
      }
      .comm-nav-actions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 2rem;
      }
      .comm-nav-actions button {
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
      .comm-nav-actions button:focus {
        outline: 2px solid #2563eb;
        outline-offset: 2px;
      }
      .comm-nav-actions button:hover {
        background: #f3f4f6;
        color: #2563eb;
      }
      .comm-nav-actions .icon {
        font-size: 1.2rem;
        display: inline-block;
      }
      .comm-nav-actions .comm-logout {
        color: #dc3545;
        font-weight: 600;
      }
      .comm-nav-actions .comm-logout:hover {
        background: #ffe6e6;
        color: #a71d2a;
      }
      .comm-root.dark-mode {
        background: #181828;
        color: #e0e0e0;
      }
      .comm-root.dark-mode .comm-main {
        background: #181828;
        color: #e0e0e0;
      }
      .comm-root.dark-mode .comm-main-content {
        background: #23284a;
        color: #e0e0e0;
        border: 1px solid #333;
      }
      .comm-root.dark-mode .comm-header {
        color: #7eaaff;
      }
      .comm-root.dark-mode .comm-section h2 {
        color: #7eaaff;
      }
      .comm-root.dark-mode .comm-table th {
        background: #23284a;
        color: #b0b0b0;
      }
      .comm-root.dark-mode .comm-table td {
        background: #23284a;
        color: #e0e0e0;
      }
      .comm-sidenav.dark-mode {
        background: #1a1a2e;
        color: #e0e0e0;
        border-right: 1px solid #333;
      }
      .comm-sidenav.dark-mode .comm-title {
        color: #7eaaff;
      }
      .comm-sidenav.dark-mode .comm-nav-link {
        color: #e0e0e0;
      }
      .comm-sidenav.dark-mode .comm-nav-link.active {
        background: #223c2c;
        color: #7eaaff;
        border-right: 3px solid #7eaaff;
      }
      .comm-sidenav.dark-mode .comm-nav-link:hover {
        background: #22223c;
        color: #7eaaff;
      }
      .comm-sidenav.dark-mode .comm-nav-actions button {
        color: #e0e0e0;
      }
      .comm-sidenav.dark-mode .comm-nav-actions button:hover {
        background: #23284a;
        color: #7eaaff;
      }
      .comm-sidenav.dark-mode .comm-nav-actions .comm-logout {
        color: #ffb3b3;
      }
      .comm-sidenav.dark-mode .comm-nav-actions .comm-logout:hover {
        background: #3a1a1a;
        color: #ff4d4d;
      }
      .comm-main-content {
        max-width: 1200px;
        margin: 2rem auto;
        padding: 2rem;
        background: #fff;
        border-radius: 18px;
        box-shadow: 0 6px 32px rgba(0,0,0,0.07);
        color: #222;
      }
      .comm-header {
        font-size: 2rem;
        font-weight: 700;
        color: #2563eb;
        margin-bottom: 2rem;
      }
      .comm-section {
        margin-bottom: 2.5rem;
      }
      .comm-section h2 {
        font-size: 1.3rem;
        font-weight: 600;
        color: #2563eb;
        margin-bottom: 1rem;
      }
      .comm-table, .comm-table th, .comm-table td {
        border: 1px solid #ececec;
        border-collapse: collapse;
      }
      .comm-table {
        width: 100%;
        margin-bottom: 1rem;
      }
      .comm-table th, .comm-table td {
        padding: 0.75rem 1rem;
        text-align: left;
      }
      .comm-table th {
        background: #f3f4f6;
      }
      .heatmap {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .heatmap-cell {
        width: 120px;
        height: 80px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        color: #fff;
        font-size: 1rem;
      }
      .heatmap-low { background: #22c55e; }
      .heatmap-medium { background: #facc15; color: #222; }
      .heatmap-high { background: #ef4444; }
      @media (max-width: 900px) {
        .comm-sidenav {
          position: static;
          width: 100%;
          height: auto;
        }
        .comm-root > .comm-main {
          margin-left: 0;
          padding-left: 0.5rem;
        }
      }
      .comm-section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }
      .comm-btn {
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
      .comm-btn:hover {
        background: #1746a2;
      }
      .comm-input, .comm-textarea {
        width: 100%;
        margin-bottom: 0.5rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
      .comm-textarea { min-height: 60px; }
      .comm-root.dark-mode .comm-input, .comm-root.dark-mode .comm-textarea {
        background: #181828;
        color: #e0e0e0;
        border: 1px solid #333;
      }
      .comm-news-list, .comm-msg-list, .comm-doc-list, .comm-calendar-list, .comm-contact-list, .comm-audit-list {
        list-style: none;
        padding: 0;
        margin: 0 0 1rem 0;
      }
      .comm-news-item, .comm-msg-item, .comm-doc-item, .comm-calendar-item, .comm-contact-item, .comm-audit-item {
        background: #f3f4f6;
        margin-bottom: 0.5rem;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .comm-root.dark-mode .comm-news-item,
      .comm-root.dark-mode .comm-msg-item,
      .comm-root.dark-mode .comm-doc-item,
      .comm-root.dark-mode .comm-calendar-item,
      .comm-root.dark-mode .comm-contact-item,
      .comm-root.dark-mode .comm-audit-item {
        background: #23284a;
        color: #e0e0e0;
      }
      .comm-news-title { font-weight: 600; }
      .comm-msg-user { font-weight: 600; color: #2563eb; margin-right: 0.5rem; }
      .comm-root.dark-mode .comm-msg-user { color: #7eaaff; }
      .comm-doc-link { color: #2563eb; text-decoration: underline; cursor: pointer; }
      .comm-root.dark-mode .comm-doc-link { color: #7eaaff; }
      .comm-calendar-date { font-weight: 600; margin-right: 0.5rem; }
      .comm-contact-email, .comm-contact-phone { margin-left: 0.5rem; color: #2563eb; text-decoration: underline; cursor: pointer; }
      .comm-root.dark-mode .comm-contact-email, .comm-root.dark-mode .comm-contact-phone { color: #7eaaff; }
      .comm-heatmap-cell.selected { outline: 2px solid #2563eb; }
      .comm-search-bar { margin-bottom: 1rem; }
      .comm-search-input { width: 100%; padding: 0.5rem; border-radius: 6px; border: 1px solid #ccc; }
      .comm-root.dark-mode .comm-search-input { background: #181828; color: #e0e0e0; border: 1px solid #333; }
    </style>
    <div class="comm-root" [class.dark-mode]="darkMode">
      <aside class="comm-sidenav" [class.collapsed]="sidebarCollapsed" [class.dark-mode]="darkMode">
        <div class="comm-sidenav-header">
          <img src="assets/logo.png" alt="Logo" class="comm-logo" />
          <span class="comm-title" *ngIf="!sidebarCollapsed">Communication Hub</span>
        </div>
        <nav class="comm-nav">
          <a routerLink="/environmental-dashboard" routerLinkActive="active" class="comm-nav-link"><span class="comm-nav-icon">🌱</span><span *ngIf="!sidebarCollapsed">Sustainability Dashboard</span></a>
          <a routerLink="/materiality" routerLinkActive="active" class="comm-nav-link"><span class="comm-nav-icon">📊</span><span *ngIf="!sidebarCollapsed">Materiality Assessment</span></a>
          <a routerLink="/team" routerLinkActive="active" class="comm-nav-link"><span class="comm-nav-icon">🧑‍🤝‍🧑</span><span *ngIf="!sidebarCollapsed">Manage Team</span></a>
          <a routerLink="/initiatives-dashboard" routerLinkActive="active" class="comm-nav-link"><span class="comm-nav-icon">📣</span><span *ngIf="!sidebarCollapsed">ESG Initiative</span></a>
          <a routerLink="/reporting" routerLinkActive="active" class="comm-nav-link"><span class="comm-nav-icon">📊</span><span *ngIf="!sidebarCollapsed">Reporting & Analysis</span></a>
          <a routerLink="/communication-hub" routerLinkActive="active" class="comm-nav-link"><span class="comm-nav-icon">💬</span><span *ngIf="!sidebarCollapsed">Communication Hub</span></a>
          <a routerLink="/training" routerLinkActive="active" class="comm-nav-link"><span class="comm-nav-icon">🎓</span><span *ngIf="!sidebarCollapsed">Training & Development</span></a>
          <a routerLink="/workspace" routerLinkActive="active" class="comm-nav-link"><span class="comm-nav-icon">📁</span><span *ngIf="!sidebarCollapsed">Workspace</span></a>
          <a routerLink="/stakeholder-engagement" routerLinkActive="active" class="comm-nav-link"><span class="comm-nav-icon">🤝</span><span *ngIf="!sidebarCollapsed">Stakeholder Engagement</span></a>
          <a routerLink="/data-management" routerLinkActive="active" class="comm-nav-link"><span class="comm-nav-icon">🗄️</span><span *ngIf="!sidebarCollapsed">Data Management</span></a>
          <a routerLink="/user-role-management" routerLinkActive="active" class="comm-nav-link"><span class="comm-nav-icon">👤</span><span *ngIf="!sidebarCollapsed">User & Role Management</span></a>
          <a routerLink="/notifications" routerLinkActive="active" class="comm-nav-link"><span class="comm-nav-icon">🔔</span><span *ngIf="!sidebarCollapsed">Notifications & Alerts</span></a>
          <a routerLink="/calendar" routerLinkActive="active" class="comm-nav-link"><span class="comm-nav-icon">📅</span><span *ngIf="!sidebarCollapsed">Calendar & Events</span></a>
          <div class="comm-nav-actions">
            <button class="comm-sidenav-toggle" (click)="sidebarCollapsed=!sidebarCollapsed" aria-label="Toggle sidenav">
              <span class="icon">{{ sidebarCollapsed ? '➡️' : '⬅️' }}</span>
              <span *ngIf="!sidebarCollapsed">Collapse</span>
            </button>
            <button class="comm-dark-toggle" (click)="toggleDarkMode()" aria-label="Toggle dark mode">
              <span class="icon">{{ darkMode ? '☀️' : '🌙' }}</span>
              <span *ngIf="!sidebarCollapsed">{{ darkMode ? 'Light' : 'Dark' }} Mode</span>
            </button>
            <button class="comm-logout" (click)="logout()" aria-label="Logout">
              <span class="icon">🚪</span>
              <span *ngIf="!sidebarCollapsed">Logout</span>
            </button>
          </div>
        </nav>
      </aside>
      <main class="comm-main">
        <div class="comm-main-content">
          <div class="comm-header">Communication Hub</div>

          <!-- Search and Filter -->
          <div class="comm-search-bar">
            <input class="comm-search-input" [(ngModel)]="searchTerm" placeholder="Search announcements, docs, messages..." />
          </div>

          <!-- Announcements/News Feed -->
          <div class="comm-section">
            <div class="comm-section-header">
              <h2>Announcements & News</h2>
              <button class="comm-btn" (click)="addAnnouncement()">Add</button>
            </div>
            <input class="comm-input" [(ngModel)]="newAnnouncement" placeholder="New announcement..." />
            <ul class="comm-news-list">
              <li *ngFor="let ann of filteredAnnouncements(); let i = index" class="comm-news-item">
                <span class="comm-news-title">{{ ann }}</span>
                <button class="comm-btn" (click)="deleteAnnouncement(i)">Delete</button>
              </li>
            </ul>
          </div>

          <!-- Message Center -->
          <div class="comm-section">
            <div class="comm-section-header">
              <h2>Message Center</h2>
              <span *ngIf="unreadCount > 0" style="color:#ef4444;font-weight:600">{{ unreadCount }} unread</span>
            </div>
            <input class="comm-input" [(ngModel)]="newMessage" placeholder="Type a message..." (keyup.enter)="sendMessage()" />
            <ul class="comm-msg-list">
              <li *ngFor="let msg of filteredMessages(); let i = index" class="comm-msg-item">
                <span><span class="comm-msg-user">{{ msg.user }}:</span> {{ msg.text }}</span>
                <button class="comm-btn" (click)="markRead(i)" *ngIf="!msg.read">Mark Read</button>
              </li>
            </ul>
          </div>

          <!-- Document Sharing -->
          <div class="comm-section">
            <div class="comm-section-header">
              <h2>Document Sharing</h2>
              <button class="comm-btn" (click)="addDocument()">Upload</button>
            </div>
            <input class="comm-input" [(ngModel)]="newDocName" placeholder="Document name..." />
            <ul class="comm-doc-list">
              <li *ngFor="let doc of filteredDocs(); let i = index" class="comm-doc-item">
                <span>{{ doc.name }}</span>
                <span>
                  <span class="comm-doc-link" (click)="downloadDoc(doc)">Download</span>
                  <button class="comm-btn" (click)="deleteDoc(i)">Delete</button>
                </span>
              </li>
            </ul>
          </div>

          <!-- Compliance Calendar -->
          <div class="comm-section">
            <div class="comm-section-header">
              <h2>Compliance Calendar</h2>
              <button class="comm-btn" (click)="addCalendarEvent()">Add Event</button>
            </div>
            <input class="comm-input" [(ngModel)]="newCalendarEvent" placeholder="Event (e.g. Audit, Deadline)..." />
            <input class="comm-input" [(ngModel)]="newCalendarDate" type="date" />
            <ul class="comm-calendar-list">
              <li *ngFor="let ev of filteredCalendar(); let i = index" class="comm-calendar-item">
                <span class="comm-calendar-date">{{ ev.date }}</span> {{ ev.event }}
                <button class="comm-btn" (click)="deleteCalendarEvent(i)">Delete</button>
              </li>
            </ul>
          </div>

          <!-- Contact Directory -->
          <div class="comm-section">
            <div class="comm-section-header">
              <h2>Contact Directory</h2>
              <button class="comm-btn" (click)="addContact()">Add</button>
            </div>
            <input class="comm-input" [(ngModel)]="newContactName" placeholder="Name..." />
            <input class="comm-input" [(ngModel)]="newContactEmail" placeholder="Email..." />
            <input class="comm-input" [(ngModel)]="newContactPhone" placeholder="Phone..." />
            <ul class="comm-contact-list">
              <li *ngFor="let c of filteredContacts(); let i = index" class="comm-contact-item">
                <span>{{ c.name }}</span>
                <a class="comm-contact-email" [href]="'mailto:' + c.email">{{ c.email }}</a>
                <a class="comm-contact-phone" [href]="'tel:' + c.phone">{{ c.phone }}</a>
                <button class="comm-btn" (click)="deleteContact(i)">Delete</button>
              </li>
            </ul>
          </div>

          <!-- Interactive Risk Heatmap -->
          <div class="comm-section">
            <div class="comm-section-header">
              <h2>Risk Heatmap</h2>
              <button class="comm-btn" (click)="addRisk()">Add Risk</button>
            </div>
            <input class="comm-input" [(ngModel)]="newRiskName" placeholder="Risk name..." />
            <select class="comm-input" [(ngModel)]="newRiskLevel">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <div class="heatmap">
              <div *ngFor="let risk of risks; let i = index" class="heatmap-cell heatmap-{{ risk.level }}" [class.selected]="selectedRisk === i" (click)="selectRisk(i)">
                {{ risk.name }}<br/>{{ risk.level | titlecase }}
                <button class="comm-btn" (click)="deleteRisk(i); $event.stopPropagation();">Delete</button>
              </div>
            </div>
            <div *ngIf="selectedRisk !== null" style="margin-top:1rem;">
              <b>Selected Risk:</b> {{ risks[selectedRisk].name }} ({{ risks[selectedRisk].level | titlecase }})
              <button class="comm-btn" (click)="selectedRisk = null">Deselect</button>
            </div>
          </div>

          <!-- Audit Trail -->
          <div class="comm-section">
            <div class="comm-section-header">
              <h2>Audit Trail</h2>
            </div>
            <ul class="comm-audit-list">
              <li *ngFor="let log of filteredAuditTrail()" class="comm-audit-item">{{ log }}</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  `,
})

export class CommunicationHubComponent {
  sidebarCollapsed = false;
  darkMode = false;
  logout() { alert('Logged out!'); }
  toggleDarkMode() { this.darkMode = !this.darkMode; }

  // Announcements/News Feed
  announcements: string[] = ['Welcome to the ESG Communication Hub!', 'Q2 Compliance Report Released'];
  newAnnouncement = '';
  addAnnouncement() {
    if (this.newAnnouncement.trim()) {
      this.announcements.unshift(this.newAnnouncement.trim());
      this.auditTrail.unshift('Announcement added: ' + this.newAnnouncement.trim());
      this.newAnnouncement = '';
    }
  }
  deleteAnnouncement(i: number) {
    this.auditTrail.unshift('Announcement deleted: ' + this.announcements[i]);
    this.announcements.splice(i, 1);
  }
  filteredAnnouncements() {
    return this.announcements.filter(a => a.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  // Message Center
  messages: { user: string; text: string; read: boolean }[] = [
    { user: 'Alice', text: 'Please review the new compliance policy.', read: false },
    { user: 'Bob', text: 'Audit scheduled for next week.', read: true },
  ];
  newMessage = '';
  unreadCount = 1;
  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.unshift({ user: 'You', text: this.newMessage.trim(), read: false });
      this.auditTrail.unshift('Message sent: ' + this.newMessage.trim());
      this.newMessage = '';
      this.unreadCount++;
    }
  }
  markRead(i: number) {
    this.messages[i].read = true;
    this.unreadCount = this.messages.filter(m => !m.read).length;
    this.auditTrail.unshift('Message marked as read: ' + this.messages[i].text);
  }
  filteredMessages() {
    return this.messages.filter(m => m.text.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  // Document Sharing
  docs: { name: string }[] = [
    { name: 'GRI Compliance.pdf' },
    { name: 'Audit2024.xlsx' },
  ];
  newDocName = '';
  addDocument() {
    if (this.newDocName.trim()) {
      this.docs.unshift({ name: this.newDocName.trim() });
      this.auditTrail.unshift('Document uploaded: ' + this.newDocName.trim());
      this.newDocName = '';
    }
  }
  deleteDoc(i: number) {
    this.auditTrail.unshift('Document deleted: ' + this.docs[i].name);
    this.docs.splice(i, 1);
  }
  downloadDoc(doc: { name: string }) {
    alert('Download: ' + doc.name);
    this.auditTrail.unshift('Document downloaded: ' + doc.name);
  }
  filteredDocs() {
    return this.docs.filter(d => d.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  // Compliance Calendar
  calendar: { event: string; date: string }[] = [
    { event: 'GRI Audit', date: '2024-06-15' },
    { event: 'CSRD Deadline', date: '2024-07-01' },
  ];
  newCalendarEvent = '';
  newCalendarDate = '';
  addCalendarEvent() {
    if (this.newCalendarEvent.trim() && this.newCalendarDate) {
      this.calendar.unshift({ event: this.newCalendarEvent.trim(), date: this.newCalendarDate });
      this.auditTrail.unshift('Calendar event added: ' + this.newCalendarEvent.trim() + ' on ' + this.newCalendarDate);
      this.newCalendarEvent = '';
      this.newCalendarDate = '';
    }
  }
  deleteCalendarEvent(i: number) {
    this.auditTrail.unshift('Calendar event deleted: ' + this.calendar[i].event);
    this.calendar.splice(i, 1);
  }
  filteredCalendar() {
    return this.calendar.filter(ev => ev.event.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  // Contact Directory
  contacts: { name: string; email: string; phone: string }[] = [
    { name: 'Compliance Officer', email: 'compliance@company.com', phone: '123-456-7890' },
    { name: 'Lead Auditor', email: 'auditor@company.com', phone: '987-654-3210' },
  ];
  newContactName = '';
  newContactEmail = '';
  newContactPhone = '';
  addContact() {
    if (this.newContactName.trim() && this.newContactEmail.trim() && this.newContactPhone.trim()) {
      this.contacts.unshift({ name: this.newContactName.trim(), email: this.newContactEmail.trim(), phone: this.newContactPhone.trim() });
      this.auditTrail.unshift('Contact added: ' + this.newContactName.trim());
      this.newContactName = '';
      this.newContactEmail = '';
      this.newContactPhone = '';
    }
  }
  deleteContact(i: number) {
    this.auditTrail.unshift('Contact deleted: ' + this.contacts[i].name);
    this.contacts.splice(i, 1);
  }
  filteredContacts() {
    return this.contacts.filter(c => c.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || c.email.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  // Interactive Risk Heatmap
  risks: { name: string; level: 'high' | 'medium' | 'low' }[] = [
    { name: 'Climate Risk', level: 'high' },
    { name: 'Social Unrest', level: 'medium' },
    { name: 'Regulatory', level: 'low' },
    { name: 'Supply Chain', level: 'medium' },
    { name: 'Reputation', level: 'low' },
  ];
  newRiskName = '';
  newRiskLevel: 'high' | 'medium' | 'low' = 'high';
  selectedRisk: number | null = null;
  addRisk() {
    if (this.newRiskName.trim()) {
      this.risks.unshift({ name: this.newRiskName.trim(), level: this.newRiskLevel });
      this.auditTrail.unshift('Risk added: ' + this.newRiskName.trim() + ' (' + this.newRiskLevel + ')');
      this.newRiskName = '';
      this.newRiskLevel = 'high';
    }
  }
  deleteRisk(i: number) {
    this.auditTrail.unshift('Risk deleted: ' + this.risks[i].name);
    this.risks.splice(i, 1);
    if (this.selectedRisk === i) this.selectedRisk = null;
  }
  selectRisk(i: number) {
    this.selectedRisk = i;
  }

  // Audit Trail
  auditTrail: string[] = [
    'User logged in',
    'Initial data loaded',
  ];
  filteredAuditTrail() {
    return this.auditTrail.filter(a => a.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  // Search
  searchTerm = '';
} 