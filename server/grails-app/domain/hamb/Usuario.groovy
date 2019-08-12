package hamb

class Usuario {
    String nome
    String login
    String senha
    String crm
    Date ultimoAcesso
    Perfil perfil
    String telefone
    String email
    Boolean ativo = true
    Boolean expirado = false
    Boolean bloqueado = false
    Boolean senhaExpirada = false

    static hasMany = [atendimentos: Atendimento]

    static transients = ['springSecurityService', 'permissoes']

    static constraints = {
        nome nullable: false, blank: false
        login nullable: false, blank: false
        senha nullable: false, blank: false
        crm nullable: true, blank: false
        ultimoAcesso nullable: true, blank: false
        perfil nullable: false, blank: false
        telefone nullable: true, blank: true
        email nullable: true, blank: true, email: true
        email nullable: true, blank: true
        ativo nullable: false
        expirado nullable: false
        bloqueado nullable: false
        senhaExpirada nullable: false
    }

    static mapping = {
        ativo defaultValue: true
        expirado defaultValue: false
        bloqueado defaultValue: false
        senhaExpirada defaultValue: false
    }

    Set getPermissoes() { [this.perfil] }
}
