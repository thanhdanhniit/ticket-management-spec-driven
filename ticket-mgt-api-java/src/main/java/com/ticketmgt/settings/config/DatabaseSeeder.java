package com.ticketmgt.settings.config;

import com.ticketmgt.settings.dto.EntityPermissionMatrix;
import com.ticketmgt.settings.entity.*;
import com.ticketmgt.settings.mapper.JsonMapper;
import com.ticketmgt.settings.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Slf4j
public class DatabaseSeeder implements CommandLineRunner {

    private final OrganizationRoleRepository orgRoleRepo;
    private final UserRepository userRepo;
    private final TeamRepository teamRepo;
    private final TeamRoleRepository teamRoleRepo;
    private final TeamMemberRepository teamMemberRepo;
    private final PostmortemTemplateRepository templateRepo;
    private final AuditLogRepository auditLogRepo;
    
    private final PasswordEncoder passwordEncoder;
    private final JsonMapper jsonMapper;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (orgRoleRepo.count() > 0) {
            log.info("Database already seeded.");
            return;
        }

        log.info("Seeding database with initial data...");

        // 1. Organization Roles
        EntityPermissionMatrix adminPerms = new EntityPermissionMatrix(true, true, true, true);
        EntityPermissionMatrix readOnlyPerms = new EntityPermissionMatrix(false, true, false, false);

        Map<String, EntityPermissionMatrix> adminMap = Map.of(
            "users", adminPerms,
            "teams", adminPerms,
            "escalation_policies", adminPerms,
            "postmortems", adminPerms,
            "runbooks", adminPerms,
            "schedules", adminPerms,
            "services", adminPerms
        );

        Map<String, EntityPermissionMatrix> readOnlyMap = Map.of(
            "users", readOnlyPerms,
            "teams", readOnlyPerms,
            "escalation_policies", readOnlyPerms,
            "postmortems", readOnlyPerms,
            "runbooks", readOnlyPerms,
            "schedules", readOnlyPerms,
            "services", readOnlyPerms
        );

        String adminJson = jsonMapper.asString(adminMap);
        String readOnlyJson = jsonMapper.asString(readOnlyMap);

        OrganizationRole sysAdmin = orgRoleRepo.save(OrganizationRole.builder().name("System Admin").isImmutable(true).permissions(adminJson).build());
        OrganizationRole engineer = orgRoleRepo.save(OrganizationRole.builder().name("Engineer").isImmutable(false).permissions(readOnlyJson).build());
        OrganizationRole productMgr = orgRoleRepo.save(OrganizationRole.builder().name("Product Manager").isImmutable(false).permissions(readOnlyJson).build());
        OrganizationRole hr = orgRoleRepo.save(OrganizationRole.builder().name("HR Business Partner").isImmutable(false).permissions(readOnlyJson).build());
        OrganizationRole contractor = orgRoleRepo.save(OrganizationRole.builder().name("Contractor").isImmutable(false).permissions(readOnlyJson).build());

        // 2. Users
        String encodedPassword = passwordEncoder.encode("password123");
        User adminUser = userRepo.save(User.builder().fullName("Admin Boss").email("admin@example.com").passwordHash(encodedPassword).organizationRole(sysAdmin).status(User.UserStatus.ACTIVE).build());
        User eng1 = userRepo.save(User.builder().fullName("Alice Coder").email("alice@example.com").passwordHash(encodedPassword).organizationRole(engineer).status(User.UserStatus.ACTIVE).build());
        User eng2 = userRepo.save(User.builder().fullName("Bob Builder").email("bob@example.com").passwordHash(encodedPassword).organizationRole(engineer).status(User.UserStatus.ACTIVE).build());
        User pm1 = userRepo.save(User.builder().fullName("Charlie Manager").email("charlie@example.com").passwordHash(encodedPassword).organizationRole(productMgr).status(User.UserStatus.ACTIVE).build());
        User hr1 = userRepo.save(User.builder().fullName("Diana Human").email("diana@example.com").passwordHash(encodedPassword).organizationRole(hr).status(User.UserStatus.ACTIVE).build());

        // 3. Teams
        Team backendTeam = teamRepo.save(Team.builder().name("Backend Platform").description("Core APIs").defaultUser(eng1).isImmutable(true).build());
        Team frontendTeam = teamRepo.save(Team.builder().name("Frontend Web").description("React Apps").defaultUser(eng2).isImmutable(false).build());
        Team sreTeam = teamRepo.save(Team.builder().name("SRE").description("Infra & Ops").defaultUser(adminUser).isImmutable(true).build());
        Team productTeam = teamRepo.save(Team.builder().name("Product Strategy").description("Roadmaps").defaultUser(pm1).isImmutable(false).build());
        Team hrTeam = teamRepo.save(Team.builder().name("People Ops").description("Human Resources").defaultUser(hr1).isImmutable(false).build());

        // 4. Team Roles
        TeamRole beLead = teamRoleRepo.save(TeamRole.builder().team(backendTeam).name("Backend Lead").isImmutable(true).permissions(adminJson).build());
        TeamRole beDev = teamRoleRepo.save(TeamRole.builder().team(backendTeam).name("Backend Dev").isImmutable(false).permissions(readOnlyJson).build());
        TeamRole feLead = teamRoleRepo.save(TeamRole.builder().team(frontendTeam).name("Frontend Lead").isImmutable(true).permissions(adminJson).build());
        TeamRole sreAdmin = teamRoleRepo.save(TeamRole.builder().team(sreTeam).name("SRE Admin").isImmutable(true).permissions(adminJson).build());
        TeamRole pmLead = teamRoleRepo.save(TeamRole.builder().team(productTeam).name("Strategy Lead").isImmutable(true).permissions(adminJson).build());

        // 5. Team Members
        teamMemberRepo.save(TeamMember.builder().team(backendTeam).user(eng1).isDefaultUser(true).teamRoles(Set.of(beLead)).build());
        teamMemberRepo.save(TeamMember.builder().team(backendTeam).user(eng2).isDefaultUser(false).teamRoles(Set.of(beDev)).build());
        teamMemberRepo.save(TeamMember.builder().team(frontendTeam).user(eng2).isDefaultUser(true).teamRoles(Set.of(feLead)).build());
        teamMemberRepo.save(TeamMember.builder().team(sreTeam).user(adminUser).isDefaultUser(true).teamRoles(Set.of(sreAdmin)).build());
        teamMemberRepo.save(TeamMember.builder().team(productTeam).user(pm1).isDefaultUser(true).teamRoles(Set.of(pmLead)).build());

        // 6. Postmortem Templates
        templateRepo.save(PostmortemTemplate.builder().name("Standard Outage").content("## Incident Summary\n...").build());
        templateRepo.save(PostmortemTemplate.builder().name("Security Breach").content("## Breach Vector\n...").build());
        templateRepo.save(PostmortemTemplate.builder().name("Data Loss").content("## Lost Records\n...").build());
        templateRepo.save(PostmortemTemplate.builder().name("Performance Degradation").content("## Latency Metrics\n...").build());
        templateRepo.save(PostmortemTemplate.builder().name("Third Party Failure").content("## Vendor Info\n...").build());

        // 7. Audit Logs
        String adminDetails = "{\"browser\":\"Chrome\",\"ip\":\"192.168.1.1\"}";
        auditLogRepo.save(AuditLog.builder().timestamp(LocalDateTime.now().minusDays(1)).actorName("Admin Boss").actorEmail("admin@example.com").action("LOGIN").actee("SYSTEM").details(adminDetails).build());
        auditLogRepo.save(AuditLog.builder().timestamp(LocalDateTime.now().minusHours(5)).actorName("Admin Boss").actorEmail("admin@example.com").action("CREATE_TEAM").actee("Backend Platform").details("{\"teamId\": \"assigned\"}").build());
        auditLogRepo.save(AuditLog.builder().timestamp(LocalDateTime.now().minusHours(4)).actorName("Alice Coder").actorEmail("alice@example.com").action("EDIT_POSTMORTEM").actee("Standard Outage").details("{}").build());
        auditLogRepo.save(AuditLog.builder().timestamp(LocalDateTime.now().minusHours(3)).actorName("Charlie Manager").actorEmail("charlie@example.com").action("VIEW_USERS").actee("Users List").details("{}").build());
        auditLogRepo.save(AuditLog.builder().timestamp(LocalDateTime.now().minusMinutes(30)).actorName("Admin Boss").actorEmail("admin@example.com").action("DELETE_USER").actee("contractor@example.com").details("{\"reason\":\"Contract Ended\"}").build());

        log.info("Successfully seeded database with 5 records per table.");
    }
}
