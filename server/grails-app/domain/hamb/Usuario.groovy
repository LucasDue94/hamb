package hamb

class Usuario {
    String nome
    String login
    String senha
    String crm
    Date ultimoAcesso
    static hasOne = [perfil: Perfil]
    static hasMany = [atendimentos: Atendimento]

    static constraints = {
        nome nullable: false, blank: false
        login nullable: false, blank: false
        senha nullable: false, blank: false
        crm nullable: true
        ultimoAcesso nullable: true, blank: false
    }
}
