package hamb

import integracao.Cid

class UsuarioCid {
    Usuario usuario
    Cid cid

    static constraints = {
        usuario nullable: false, blank: false
        cid nullable: false, blank: false
    }
}
