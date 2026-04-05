1. Database Schema & ER Diagram
mermaid
erDiagram
    ESCALATION_POLICY {
        UUID id PK
        String name
        String description
        Timestamp created_at
        Timestamp updated_at
        Integer version "Optimistic Locking"
    }
    ESCALATION_STEP {
        UUID id PK
        UUID policy_id FK
        Integer step_order "1, 2, 3..."
        Integer wait_time_minutes
        UUID target_id FK
        String target_type "USER or TEAM"
    }
    ESCALATION_EXECUTION {
        UUID id PK
        UUID incident_id FK
        UUID policy_id FK
        Integer current_step_order
        String status "ACTIVE, PAUSED, COMPLETED, CANCELLED"
        Timestamp next_escalation_at
        Timestamp created_at
        Timestamp updated_at
    }
    ESCALATION_POLICY ||--o{ ESCALATION_STEP : "has many (ordered)"
    ESCALATION_EXECUTION }o--|| ESCALATION_POLICY : "runs against"
JPA Entity Mapping:

EscalationPolicy: Primary aggregate root with @Version for optimistic locking.
EscalationStep: Has @ManyToOne(fetch = LAZY) back to EscalationPolicy. Use a dedicated step_order integer column (not relying on DB insert order) so steps can be cleanly re-ordered or partially deleted. Validate minSize = 1 at the Service layer.
EscalationExecution: A runtime tracking entity created when an incident begins escalating. Think of it as a "state machine cursor" tracking exactly which step is active and when the next escalation fires.
2. Escalation Execution Engine
The engine is the core business logic. It operates as a state machine driven by a timer:

INCIDENT TRIGGERED
       │
       ▼
EscalationExecution CREATED (step_order = 1, status = ACTIVE)
       │
       ▼
Timer fires at `next_escalation_at`
       │
       ├─► Check incident status (still OPEN/TRIGGERED?)
       │        ├─ Acknowledged or Resolved → CANCEL execution
       │        └─ Still active → notify Step target (User/Team)
       │                │
       │                └─► Advance step_order + 1
       │                        ├─ More steps? → schedule next timer
       │                        └─ No more steps? → status = COMPLETED
       ▼
Done
Implementation Pattern:

EscalationEngineService: On incident creation, queries the assigned policy, creates an EscalationExecution, and schedules the first timer using a TaskScheduler or Quartz.
NotificationDispatcherService: Called by the engine to notify the target_id (User or Team) via email/SMS/webhook.
EscalationStepAdvancerService: Moves the state machine cursor forward, or terminates the execution cleanly.
3. Timer & Scheduling Strategy
Escalation policies are highly time-sensitive. Here is the recommended approach:

Strategy	Use When
Spring TaskScheduler	Single-node deployments, simpler projects
Quartz Scheduler (clustered)	Multi-node deployments requiring distributed coordination
Database polling	Simplest approach, appropriate for smaller scale
Recommended for production: Quartz + Database Job Store

java
// EscalationJob.java (Quartz JobDetail)
public class EscalationJob implements Job {
    public void execute(JobExecutionContext ctx) {
        UUID executionId = ctx.getJobDetail().getJobDataMap().getUUID("executionId");
        escalationEngineService.processStep(executionId);
    }
}
Store JobDetail and Trigger in the database via JdbcJobStore.
Set next_escalation_at = NOW() + waitTimeMinutes on each step advance.
If the application restarts, Quartz automatically recovers missed jobs from the database — critical for ensuring no alerts are dropped.
4. Incident State Synchronization
The escalation engine must always verify the latest incident state before notifying, to avoid sending false alerts on already-resolved incidents.

Strategy: Fetch-before-act pattern

java
public void processStep(UUID executionId) {
    EscalationExecution execution = executionRepository.findById(executionId);
    
    // 1. Re-fetch incident state from Incident domain
    Incident incident = incidentRepository.findById(execution.getIncidentId());
    
    // 2. Guard: abort if no longer active
    if (incident.isAcknowledged() || incident.isResolved()) {
        execution.cancel();
        executionRepository.save(execution);
        return;
    }
    // 3. Safe to dispatch notification
    notificationDispatcher.notify(currentStep.getTargetId());
    
    // 4. Advance to next step
    advanceOrComplete(execution);
}
Also recommended:

Event Listeners: The IncidentAcknowledgedEvent / IncidentResolvedEvent should immediately fire a call to cancel any active EscalationExecution for that incident — this provides a proactive cancellation in addition to the reactive guard above.
5. Concurrency & Race Conditions
This is the most critical risk area. Two concurrent scenarios need protection:

Scenario A: Timer fires AND incident gets acknowledged simultaneously

Both threads try to modify the same EscalationExecution. Solution:

java
// Use @Lock on the repository query
@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT e FROM EscalationExecution e WHERE e.id = :id")
Optional<EscalationExecution> findByIdForUpdate(@Param("id") UUID id);
Scenario B: Two timer nodes fire the same job (duplicate notification)

Solution: Use @Version (Optimistic Locking) on EscalationExecution. Only the first thread to commit wins; the second will throw OptimisticLockException, which the framework handles gracefully by discarding.

Scenario C: Policy updated while an active execution is running

Solution: EscalationExecution snapshots the policy_id and the steps it was created with. It does not dynamically re-read the policy on every step. This ensures in-flight escalations are deterministic and immune to mid-flight policy modifications by admins.

Proposed Package Structure
text
com.ticketmanagement.escalationpolicy
├── api
│    └── EscalationPolicyController.java
├── engine
│    ├── EscalationEngineService.java      (State machine)
│    ├── EscalationStepAdvancerService.java
│    ├── EscalationJob.java               (Quartz Job)
│    └── NotificationDispatcherService.java
├── service
│    └── EscalationPolicyManagementService.java (CRUD)
├── repository
│    ├── EscalationPolicyRepository.java
│    ├── EscalationStepRepository.java
│    └── EscalationExecutionRepository.java
├── model
│    ├── entity
│    │    ├── EscalationPolicyEntity.java
│    │    ├── EscalationStepEntity.java
│    │    └── EscalationExecutionEntity.java
│    ├── dto
│    │    ├── EscalationPolicyDTO.java
│    │    └── EscalationPolicyMutationRequest.java
│    └── mapper
│         └── EscalationPolicyMapper.java  (MapStruct)
└── exception
     └── EscalationPolicyExceptionHandler.java
The architecture cleanly separates the management plane (CRUD policy configuration) from the data plane (the runtime execution engine), which makes each layer independently testable and scalable.

