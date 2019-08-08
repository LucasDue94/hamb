package hamb

import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.SpringSecurityUtils
import grails.plugin.springsecurity.userdetails.GrailsUserDetailsService
import hamb.auth.UserDetail
import org.springframework.dao.DataAccessException
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UsernameNotFoundException

@Transactional(readOnly = true)
class UserDetailService implements GrailsUserDetailsService {

    static final List NO_ROLES = [new SimpleGrantedAuthority(SpringSecurityUtils.NO_ROLE)]

    @Override
    UserDetails loadUserByUsername(String username, boolean loadRoles) throws UsernameNotFoundException, DataAccessException {
        Usuario usuario = Usuario.findByLogin username
        def autoridades = usuario.permissoes.collect { new SimpleGrantedAuthority(it.autoridade) }

        return new UserDetail(usuario.login, usuario.senha, usuario.ativo, !usuario.expirado, !usuario.senhaExpirada,
                !usuario.bloqueado, autoridades ?: NO_ROLES, usuario.id, usuario.nome, usuario.crm, usuario.perfil.nome)
    }

    @Override
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.loadUserByUsername(username, true)
    }
}
