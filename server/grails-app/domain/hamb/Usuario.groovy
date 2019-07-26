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
    static hasMany = [atendimentos: Atendimento]

    static constraints = {
        nome nullable: false, blank: false
        login nullable: false, blank: false
        senha nullable: false, blank: false
        crm nullable: true, blank: false
        ultimoAcesso nullable: true, blank: false
        perfil nullable: false, blank: false
        telefone nullable: true, blank: false
        email nullable: true, blank: false
    }
}
