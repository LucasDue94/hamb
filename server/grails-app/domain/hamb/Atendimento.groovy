package hamb

import integracao.Cid
import integracao.RegistroAtendimento

class Atendimento {
    Usuario usuario
    RegistroAtendimento registroAtendimento
    Date dataAtendimento
    Cid cid
    String conteudo

    static constraints = {
        usuario nullable: false, blank: false
        registroAtendimento nullable: false, blank: false
        dataAtendimento nullable: false, blank: false
        cid nullable: false, blank: false
        conteudo nullable: false, blank: false
    }
}
