package hamb.auth

import grails.plugin.springsecurity.userdetails.GrailsUser
import org.springframework.security.core.GrantedAuthority

class UserDetail extends GrailsUser{

    final String nome
    final String crm
    final String perfil

    UserDetail(String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired,
               boolean accountNonLocked, Collection<GrantedAuthority> authorities, Object id, String nome, String crm, String perfil) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities, id)

        this.nome = nome
        this.crm = crm
        this.perfil = perfil
    }
}
