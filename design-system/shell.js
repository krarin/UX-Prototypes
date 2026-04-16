/**
 * shell.js — Shared prototype shell
 * Design System / Prototypes
 *
 * Generates the full app chrome (sidebar, topbar, page-header, info-bar, tab-nav)
 * from a config object. Changes here update every prototype instantly.
 *
 * Usage:
 *   <script src="../../design-system/shell.js"></script>
 *   <script>
 *     Shell.init({
 *       title:     "Page Title",
 *       subtitle:  "Subtitle or amount",
 *       tabs:      ["Tab One", "Tab Two"],
 *       activeTab: 0,
 *       activeNav: "antraege",
 *       infoItems: [{ label: "Label", value: "Value" }],
 *       actions:   [{ label: "Action", type: "primary", icon: "check", id: "my-btn" }],
 *       onTabChange: function(index, label) { ... }
 *     });
 *   </script>
 *   <div id="proto-content">
 *     <!-- everything that lives inside .content goes here -->
 *     <!-- e.g. section-nav, content-inner, drawers -->
 *   </div>
 */

(function (global) {
  'use strict';

  /* --------------------------------------------------
     Default sidebar items — matches the app navigation
  -------------------------------------------------- */
  var DEFAULT_NAV = [
    { id: 'mein-tag',    icon: 'calendar_today',  label: 'Mein Tag'    },
    { id: 'antraege',    icon: 'description',      label: 'Anträge'     },
    { id: 'leads',       icon: 'person_search',    label: 'Leads'       },
    { id: 'quellen',     icon: 'hub',              label: 'Quellen'     },
    { id: 'unternehmen', icon: 'domain',           label: 'Unternehmen' },
    { id: 'buchhaltung', icon: 'account_balance',  label: 'Buchhaltung' },
    { id: 'reporting',   icon: 'bar_chart',        label: 'Reporting'   },
    { id: 'lead-shop',   icon: 'storefront',       label: 'Lead-Shop'   },
    { id: 'email',       icon: 'mail',             label: 'Email'       }
  ];

  /* --------------------------------------------------
     Shell object
  -------------------------------------------------- */
  var Shell = {

    _cfg: null,

    /**
     * Initialise the shell with config. Call this before #proto-content in body.
     */
    init: function (cfg) {
      this._cfg = {
        title:       cfg.title       || '',
        subtitle:    cfg.subtitle    || '',
        activeNav:   cfg.activeNav   || 'antraege',
        navItems:    cfg.navItems    || DEFAULT_NAV,
        tabs:        cfg.tabs        || [],
        activeTab:   cfg.activeTab   !== undefined ? cfg.activeTab : 0,
        infoItems:   cfg.infoItems   || [],
        actions:     cfg.actions     || [],
        onTabChange: cfg.onTabChange || null
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { Shell._render(); });
      } else {
        Shell._render();
      }
    },

    /* ------------------------------------------------
       Render — called once DOM is ready
    ------------------------------------------------ */
    _render: function () {
      var c = this._cfg;

      // Save proto content HTML before replacing body
      var protoEl  = document.getElementById('proto-content');
      var protoHTML = protoEl ? protoEl.innerHTML : '';

      // Build full shell + re-inject proto content inside .content
      document.body.innerHTML = [
        '<div class="app">',
          this._sidebar(c),
          '<div class="main">',
            this._topbar(),
            this._pageHeader(c),
            c.infoItems.length ? this._infoBar(c.infoItems) : '',
            c.tabs.length      ? this._tabNav(c.tabs, c.activeTab) : '',
            '<div class="content">',
              protoHTML,
            '</div>',
          '</div>',
        '</div>'
      ].join('');

      // Notify prototype scripts that the shell is ready
      document.dispatchEvent(new CustomEvent('shell:ready'));
    },

    /* ------------------------------------------------
       Sidebar
    ------------------------------------------------ */
    _sidebar: function (c) {
      var items = c.navItems.map(function (item) {
        var isActive = item.id === c.activeNav;
        return [
          '<li>',
            '<button class="sidebar-item' + (isActive ? ' active' : '') + '"',
                    ' data-nav="' + item.id + '"',
                    ' onclick="Shell.onNav(this)">',
              '<span class="sidebar-icon material-symbols-outlined">' + item.icon + '</span>',
              '<span class="sidebar-label">' + item.label + '</span>',
            '</button>',
          '</li>'
        ].join('');
      }).join('');

      return [
        '<nav class="sidebar" id="global-sidebar" aria-label="Hauptnavigation">',
          '<ul class="sidebar-nav" role="list">',
            items,
          '</ul>',
        '</nav>'
      ].join('');
    },

    /* ------------------------------------------------
       Topbar
    ------------------------------------------------ */
    _topbar: function () {
      return [
        '<header class="topbar">',
          '<div class="topbar-actions">',
            '<button class="topbar-icon-btn" title="Benachrichtigungen">',
              '<span class="material-symbols-outlined">notifications</span>',
            '</button>',
            '<button class="topbar-icon-btn" title="Hilfe">',
              '<span class="material-symbols-outlined">help_outline</span>',
            '</button>',
            '<div class="topbar-divider"></div>',
            '<div class="topbar-user">',
              '<div class="topbar-avatar">JJ</div>',
              '<div class="topbar-user-info">',
                '<span class="topbar-user-name">Jan Joisten</span>',
                '<span class="topbar-user-role">Advisor</span>',
              '</div>',
              '<span class="material-symbols-outlined">expand_more</span>',
            '</div>',
          '</div>',
        '</header>'
      ].join('');
    },

    /* ------------------------------------------------
       Page header
    ------------------------------------------------ */
    _pageHeader: function (c) {
      var actionsHTML = c.actions.map(function (a) {
        var idAttr   = a.id   ? ' id="' + a.id + '"'         : '';
        var iconHTML = a.icon ? '<span class="material-symbols-outlined">' + a.icon + '</span>' : '';
        return '<button class="btn btn-' + (a.type || 'secondary') + '"' + idAttr + '>'
               + iconHTML + (a.label ? a.label : '') + '</button>';
      }).join('');

      return [
        '<div class="page-header">',
          '<div class="page-header-title">',
            '<h1 class="page-header-name">' + c.title + '</h1>',
            c.subtitle ? '<span class="page-header-amount">' + c.subtitle + '</span>' : '',
          '</div>',
          '<div class="page-header-actions">',
            actionsHTML,
          '</div>',
        '</div>'
      ].join('');
    },

    /* ------------------------------------------------
       Info bar
    ------------------------------------------------ */
    _infoBar: function (items) {
      var parts = items.map(function (item, i) {
        var divider = i < items.length - 1 ? '<div class="info-divider"></div>' : '';
        return [
          '<div class="info-item">',
            '<span class="info-label">' + item.label + '</span>',
            '<span class="info-value">' + item.value + '</span>',
          '</div>',
          divider
        ].join('');
      }).join('');

      return '<div class="info-bar">' + parts + '</div>';
    },

    /* ------------------------------------------------
       Tab navigation
    ------------------------------------------------ */
    _tabNav: function (tabs, activeTab) {
      var tabsHTML = tabs.map(function (label, i) {
        return [
          '<button class="tab' + (i === activeTab ? ' active' : '') + '"',
                  ' role="tab"',
                  ' aria-selected="' + (i === activeTab) + '"',
                  ' data-tab-index="' + i + '"',
                  ' onclick="Shell.onTab(this)">',
            label,
          '</button>'
        ].join('');
      }).join('');

      return [
        '<nav class="tab-nav" aria-label="Seitennavigation">',
          '<div class="tab-bar" role="tablist">',
            tabsHTML,
          '</div>',
        '</nav>'
      ].join('');
    },

    /* ------------------------------------------------
       Public event handlers (called from onclick attrs)
    ------------------------------------------------ */

    /** Sidebar nav item clicked */
    onNav: function (btn) {
      document.querySelectorAll('#global-sidebar .sidebar-item').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
    },

    /** Tab clicked */
    onTab: function (tab) {
      document.querySelectorAll('.tab-nav .tab').forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      var index = parseInt(tab.dataset.tabIndex, 10);
      var label = tab.textContent.trim();

      if (Shell._cfg.onTabChange) {
        Shell._cfg.onTabChange(index, label);
      }

      document.dispatchEvent(new CustomEvent('shell:tab-change', {
        detail: { index: index, label: label }
      }));
    }

  };

  /* --------------------------------------------------
     Expose globally
  -------------------------------------------------- */
  global.Shell = Shell;

  // Backwards-compatibility aliases so existing prototype
  // onclick="setActive(this)" and onclick="setActiveTab(this)" still work
  global.setActive    = function (btn) { Shell.onNav(btn); };
  global.setActiveTab = function (tab) { Shell.onTab(tab); };

}(window));
