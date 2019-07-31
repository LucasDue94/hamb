package hamb

import integracao.Cid

class UsuarioCid implements Serializable {
    Cid cid
    Usuario usuario
    Long contadorUso = 0L

    static belongsTo = Cid

    static constraints = {
        cid nullable: false, blank: false
        usuario nullable: false, blank: false
        contadorUso nullable: false, min: 0L
    }

    static mapping = {
        id composite: ['cid', 'usuario']
        contadorUso defaultValue: 0L
    }
}
