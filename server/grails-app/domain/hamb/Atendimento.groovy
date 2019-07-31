package hamb

import integracao.Cid
import integracao.Convenio
import integracao.Paciente

class Atendimento {
    Usuario usuario
    Paciente paciente
    Cid cid
    Date dataAtendimento
    String conteudo
    String codReg
    Convenio convenio

    static hasOne = [usuario: Usuario]

    static constraints = {
        conteudo nullable: false, blank: false
        paciente nullable: false, blank: false
        cid nullable: false, blank: false
        codReg nullable: false, blank: false
        dataAtendimento nullable: false, blank: false
        convenio nullable: false, blank: false
    }

    static mapping = {

    }
}
