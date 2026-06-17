# Andrew Baldock

**Senior Frontend Engineer ◆ Engineering Manager**

El Cerrito, CA · andrewbaldock3@gmail.com · 510-682-3924

[andrewbaldock.com](https://andrewbaldock.com) · [LinkedIn](https://linkedin.com/in/andrewbaldock) · [GitHub](https://github.com/andrewbaldock)

## Summary

Senior frontend engineer and engineering leader with deep experience building data-intensive, real-time web applications for enterprise manufacturing. A first-principles UI engineer who builds polished, production-grade interfaces from the ground up — and an experienced team builder who knows the best results come from helping people become their best selves. Effective as both a senior IC and a manager, and fully AI-enabled: I treat tools like Claude Code as serious force-multipliers, not gimmicks. Seeking a senior engineering role — IC and/or leadership — with real ownership and room to go deep.

## Core Stack

React · Redux · JavaScript / TypeScript · D3 · Plotly · MUI · Cytoscape.js · Webpack · Vite · Jest · Python · Node · REST APIs · Data Visualization · Frontend Architecture

## Experience

### Sight Machine — Senior Frontend Engineer

*Aug 2015 – May 2026 · SF Bay Area*

Manufacturing data platform ingesting real-time data from factory sensors and PLCs for customers like Coca-Cola, Mars, and Asian Paints, partnered with Microsoft, NVIDIA, and Databricks. Primary architect and builder on both core products across nearly eleven years, and the company's consistent champion for mobile-first design.

- **Factory Operate** — architected and built a config-driven, mobile-first PWA from the ground up where floor operators interact with the factory digital twin in real time: live machine speeds, downtime tracking, CIL reports, 2D line layouts on Cytoscape.js, and 3D views via NVIDIA Omniverse and 3dverse. Chose React over Microsoft PowerApps and designed the config-driven architecture so it runs on iPads on the factory floor.
- **Factory Analyze** — primary contributor to the data-visualization platform where engineers and plant leaders monitor KPIs and act on AI-powered insights. Built scheduled reports, internationalization, and alerting; evolved the frontend over years with React, Redux, D3, and Plotly.
- **App-storage API** *(a feature within Factory Analyze)* — built a tenant-wide key-value store in Python that grew into shared infrastructure for the Analyze app, backing dashboard config, user preferences, and broadcast messaging, and replacing one-off localStorage hacks with a clean service other developers could build on.

**Tech:** React, Redux, JS/TS, MUI, D3, Plotly, Cytoscape.js, 3dverse, Monaco Editor, TanStack Query, Webpack, Jest, Python, Node

### Sight Machine — Frontend Engineering Manager

*Oct 2021 – Sep 2023 · SF Bay Area*

Stepped into management when the startup needed it, then returned to senior IC work. Managing well meant trading deep flow for being interrupt-driven — constantly patrolling for friction to remove.

- Led a team of 6; delivered homepage redesign, personalized content feed, machine-downtime reason capture, and dashboard notepads, among others.
- Hired 3 engineers; mentored 3 to promotion to Senior, plus a summer intern.
- Established rigorous guardrails — PR template, mandatory unit-test coverage, coding standards, documentation.
- Ran agile delivery and invested in career development through 1:1s, goal-setting, and a weekly Engineering Lounge.

### ConnectSolutions — Senior Software Engineer → Senior Engineering Manager

*Aug 2013 – Aug 2015 · SF Bay Area*

Cloud collaboration software. Moved from IC to team lead to managing the Engineering department.

- Built frontend modules and Node.js/MySQL APIs for two large-scale SPAs (TeamUp, Visualize) using Backbone.js.
- Led the consolidation of two divergent forked codebases into a single deployable stack.
- As Senior Engineering Manager, led a 4-person JS/Java team reporting to C-level — sprint planning, hiring, mentoring.

**Tech:** JavaScript, Backbone.js, Node.js, MySQL, Sequelize, Java

### Mindjet — Senior Web Developer

*Jan 2011 – Jul 2013 · SF Bay Area*

Owned mindjet.com end-to-end — the full marketing funnel for a global SaaS product.

- Migrated the site from an unversioned Java CMS to a static Apache site versioned in GitHub, **cutting global page load from 12–16 seconds to under 1 second.**
- Built Apache configuration for localization across 7 languages and an AJAX user signup flow.

### Macy's — Developer → Senior Developer

*Aug 2000 – Dec 2010 · SF Bay Area*

Ten years building large-scale content management and retail applications for macys.com.

- Migrated the CMS from a monolithic legacy system to a custom YUI web application; built the macys.com retail pricing management app on enterprise Java/Spring MVC.
- Authored 1,000+ pages of requirements, use cases, UML diagrams, functional specs, and IA documentation.

**Tech:** Java, Hibernate, Spring MVC, Oracle 10g, YUI, JavaScript, HTML/CSS

### UC Berkeley — Web Director

*1998 – 2000 · Berkeley, CA*

Led the team that designed, built, and launched www.berkeley.edu — **a site that stood with minimal change from 2000 to 2008.** Owned IA, UI architecture, frontend, and a FileMaker-to-PostgreSQL data migration.

### UC Santa Cruz — Web Developer / Support Specialist

*1994 – 1998 · Santa Cruz, CA*

Designed and built 10+ divisional websites; managed departmental servers and supported 100+ workstations.

## Projects

### Aether — AI-Native Full-Stack Platform

*React 19 · TypeScript · Bun · Hono · Supabase*

A conversational AI platform built as a portfolio piece, demonstrating AI-native full-stack development. Live at andrewbaldock.com.

- **Two-runtime model** — Bun backend holds secrets and runs the agent loop; React SPA is pure UI via an /api proxy. **Agent loop with tool use** executes tools mid-stream and continues to completion.
- **Streaming SSE pipeline** with a custom line-buffered parser; **plugin architecture** via a capability registry so agent tools and user clicks drive the same state.
- **LLM connector abstraction** — swap Claude → Gemini/Ollama in a single file. Session persistence via Supabase; strict TypeScript monorepo with Vitest unit tests.

## Education

- **University of California, Santa Cruz** — BA, Latin American Studies (1992–1994)
- **UCLA** — History (1987–1990)

## Certifications

- **Certified Usability Analyst** — Human Factors International
