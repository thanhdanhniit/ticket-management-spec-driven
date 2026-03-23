package com.ticketmgt.settings.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddUsersRequest {
    private List<UserInvite> users;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserInvite {
        private String email;
        private String role;
    }
}
