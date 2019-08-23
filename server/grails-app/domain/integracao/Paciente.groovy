package integracao

import hamb.Atendimento

class Paciente {
    String id
    String nome
    String nomeMae
    String contato
    Date nascimento

    static hasMany = [registros: RegistroAtendimento, atendimentos: Atendimento]

    static constraints = {
        nome nullable: false, blank: false
        nascimento nullable: false, blank: false
        nomeMae nullable: false, blank: false
        contato nullable: true
    }

    static mapping = {
        id generator: 'assigned'
        version false
    }
}
