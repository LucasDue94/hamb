grails.gorm.default.mapping = {
    id(generator: 'hamb.db.SequenceGenerator')
}

def usernameProperty = 'login'
def passwordProperty = 'senha'

grails.plugin.springsecurity.userLookup.userDomainClassName = 'hamb.Usuario'
grails.plugin.springsecurity.userLookup.usernamePropertyName = usernameProperty
grails.plugin.springsecurity.userLookup.passwordPropertyName = passwordProperty
grails.plugin.springsecurity.userLookup.enabledPropertyName = 'ativo'
grails.plugin.springsecurity.userLookup.accountExpiredPropertyName = 'expirado'
grails.plugin.springsecurity.userLookup.accountLockedPropertyName = 'bloqueado'
grails.plugin.springsecurity.userLookup.passwordExpiredPropertyName = 'senhaExpirada'
grails.plugin.springsecurity.userLookup.authoritiesPropertyName = 'permissoes'

grails.plugin.springsecurity.authority.className = 'hamb.Perfil'
grails.plugin.springsecurity.authority.nameField = 'autoridade'

grails.plugin.springsecurity.roleHierarchy = 'ROLE_ADMIN > ROLE_MEDICO'

grails.plugin.springsecurity.rest.login.usernamePropertyName = usernameProperty
grails.plugin.springsecurity.rest.login.passwordPropertyName = passwordProperty
grails.plugin.springsecurity.rest.logout.postOnly = false

grails.plugin.springsecurity.rest.token.validation.useBearerToken = false
grails.plugin.springsecurity.rest.token.validation.headerName = 'X-Auth-Token'

grails.plugin.springsecurity.rest.token.storage.useGorm = true
grails.plugin.springsecurity.rest.token.storage.gorm.tokenDomainClassName = 'hamb.UsuarioToken'
grails.plugin.springsecurity.rest.token.storage.gorm.tokenValuePropertyName = 'valor'
grails.plugin.springsecurity.rest.token.storage.gorm.usernamePropertyName = 'login'

grails.plugin.springsecurity.filterChain.chainMap = [
        [pattern: '/application', filters: 'none'],
        [pattern: '/api/**', filters: 'JOINED_FILTERS,-anonymousAuthenticationFilter,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter,-rememberMeAuthenticationFilter'],
        [pattern: '/**', filters: 'JOINED_FILTERS,-anonymousAuthenticationFilter,-exceptionTranslationFilter,-authenticationProcessingFilter,-securityContextPersistenceFilter,-rememberMeAuthenticationFilter']
]