# Transaction Reporting Assistant Constitution

## Core Principles

### I. Guided, Transaction-Only Chat Experience

**Rationale:** Customers need a clear, accessible path to report a transaction without the assistant attempting to answer unrelated banking questions.

**Rule:** The chat must greet every customer. It must only assist with triaging a transaction; for any other request, it must respond gracefully with language equivalent to: “I am here to help you with any issues with transactions.” Responses, transaction search results, selected transaction details, and the final confirmation must be rendered in the chat. The chat UI must use a modern design, display the Westpac logo, and provide a traiging-oriented placeholder such as “Report $50 at ZeroCoffeeShop”.

**How to Apply:** Implement chat states and cards as first-class UI components. Route unsupported intents to the transaction-only response rather than improvising an answer.

### II. Deterministic Transaction Discovery and Triage

**Rationale:** A traiging outcome must be explainable, reproducible, and safe to test without depending on probabilistic external services.

**Rule:** The system must use local Python functions and keyword-matching heuristics to identify transaction-reporting intent, merchant names, amounts, and fraud/dispute indicators. It must ask no more than three triage questions in this order: (1) whether the merchant is known, (2) if known, whether the merchant agreed to refund, and (3) if no refund was agreed, whether the customer made the purchase. An unknown merchant or a purchase the customer did not make produces a Fraud/Scam proposal. A known merchant that will refund produces no case and directs the customer to the merchant. A customer-made purchase with no agreed refund produces a Dispute proposal.

**How to Apply:** Keep the classification rules in typed, unit-tested local Python functions. Record question responses and the exact rule that generated each proposed outcome. Do not call external LLMs for intent parsing or classification.

### III. Mock-Only, Local Architecture

**Rationale:** Development and demonstrations must never expose banking systems, customer data, or external infrastructure.

**Rule:** The React frontend, Python API, and localized Python reasoning agent must run entirely on local mock utilities and static JSON data. The mock data must contain at least 50 customer transactions and include searchable popular merchants such as Coles and Woolworths. Real databases, live banking APIs, external cloud services, and external AI services are prohibited.

**How to Apply:** Search mock transactions by normalized merchant and amount. If a requested merchant is outside the known mock scope, return a not-found result and suggest available mock transactions. Reject any implementation plan that introduces production credentials, network integrations, or persistent external storage.

### IV. Financial Safety, Privacy, and Confirmed Verdicts

**Rationale:** Transaction reports contain sensitive customer information and a classification must never trigger a case without the customer reviewing it.

**Rule:** The Python API boundary must mask personally identifiable information using regex-based string sanitization before data is logged, returned, or passed to reasoning functions. Every Fraud/Scam or Dispute classification is immutable only as a proposed verdict until the customer reviews a rendered confirmation card and explicitly selects a manual confirm action. A case ID and next steps may be produced only after confirmation.

**How to Apply:** Test masking rules at API boundaries. Treat an unconfirmed verdict as a non-submittable state; never create a case from chat text, intent detection, or automatic workflow progression alone.

### V. Component-Scoped Specifications and Maintainable Code

**Rationale:** The UI, API, and reasoning agent have independent contracts and must stay understandable as the prototype evolves.

**Rule:** Specifications must be generated per component: React UI, Python API, and localized Python reasoning agent. Python code requires strict type hints and PEP 8 compliance enforced with Ruff. Frontend code must comply with its configured linting rules. Unused boilerplate, stale mock-data paths, and legacy code must be deleted rather than commented out or retained as fallback code.

**How to Apply:** Plans and tasks must identify the affected component and its interface. CI and local validation must run Ruff and frontend linting. Reviewers must reject commented-out dead code and remove unused paths as part of each change.

## Architecture and Product Constraints

The product consists of a React chat UI, a Python API, and a localized Python reasoning agent. The only supported journey is selecting a mock transaction from a natural-language report, completing the prescribed triage, reviewing the proposed outcome, and confirming before a simulated case ID and next steps are shown. Example supported phrasing includes “Report $50 at Woolworths” and “I don’t recognise $50 spent at Woolworths.”

## Development Workflow and Quality Gates

1. Create or update the component-specific specification before planning implementation.
2. Test deterministic parsing, transaction matching, ordered triage, PII masking, and confirmation gating through their public interfaces.
3. Run Python type checking and Ruff, plus the configured frontend linting, before considering a change complete.
4. Review every flow to ensure mock-only boundaries are preserved and no case ID can be returned before explicit confirmation.

## Governance

This constitution supersedes conflicting project guidance. Any exception requires an explicit amendment that records the rationale, scope, migration impact, and verification plan. All specifications, plans, tasks, implementations, and reviews must demonstrate compliance with the principles above.

**Version**: 1.0.0 | **Ratified**: 2026-11-07 | **Last Amended**: 2026-11-07
