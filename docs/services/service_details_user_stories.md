# Epic: Service Management

## User Story 1: View Service Operational Status
**As a** service owner  
**I want** a dedicated dashboard showcasing my service's metadata and aggregated incident history metrics  
**So that** I can analyze my service's performance and ownership layout

**Acceptance Criteria**
* **Given** the user navigates to a valid Service Details page
* **When** the layout loads
* **Then** the Header Row explicitly populates the Service Name and Status (with colored icon)
* **And** the Metadata block populates hyperlinked associations to the Owner and Escalation Policy
* **And** 5 visual Statistic Cards render displaying exact integers and percentage changes representing Triggered, Acknowledged, Resolved Incident counts alongside the formulated MTTA and MTTR calculations 

## User Story 2: View and Aggregate Analytical Incident Charts
**As a** service owner  
**I want** dynamic chart representations of incident flows  
**So that** I can physically visualize trends over time

**Acceptance Criteria**
* **Given** the user is viewing the default Summary tab
* **When** the Incident Chart renders naturally
* **Then** a stacked bar chart explicitly maps historical incident volumes natively charting Triggered (Purple), Acknowledged (Yellow), and Resolved (Green) states logically
* **And** the user can toggle the chart's structural granularity natively via explicit "Daily" or "Weekly" aggregator buttons dynamically morphing the X-axis projection entirely

## User Story 3: Handle Service Loading and Absence of Data (404 / Empty)
**As a** system user  
**I want** the views to informatively fall back if data isn't present or fetching takes time  
**So that** my experience isn't visually confusing or abruptly broken silently

**Acceptance Criteria**
* **Given** the user attempts to load a service dynamically via an invalid or deleted `service_id` URL directly
* **When** the system resolves the request
* **Then** a comprehensive full-screen 404 "Service Not Found" state is explicitly rendered barring further progression on the faulty path logically

* **Given** the requested service legitimately possesses no incident history entirely across its 30-day tracking window logically
* **When** the Summary tab dynamically renders the primary chart naturally
* **Then** a visual placeholder illustration explicitly states "No data available for the selected timeframe" instead of natively rendering an incomplete graph mapping

* **Given** the API resolution process entails significant delay initially
* **When** the page builds itself mapped structural blocks natively
* **Then** responsive skeleton loaders map physically taking up the exact structural width and height dimensions natively of the Metric Cards to definitively indicate loading status clearly
