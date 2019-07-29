package hamb

import integracao.Agenda

class Sala {
    String id
    String descricao

    static hasMany = [agendas: Agenda]

    static constraints = {
        descricao nullable: false, blank: false
    }
}
