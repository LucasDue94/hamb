package hamb

import integracao.Cid

class Atendimento {
    Usuario usuario
    Cid cid
    Date dataAtendimento
    String conteudo
    String codPrt
    String codReg

    static hasOne = [usuario: Usuario]

    static constraints = {
        conteudo nullable: false, blank: false
        codPrt nullable: false, blank: false
        codReg nullable: false, blank: false
    }
}
