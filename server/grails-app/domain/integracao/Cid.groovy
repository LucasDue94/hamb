package integracao

class Cid {

    String cod
    String diagnostico
    Boolean ativo

    static constraints = {
        cod unique: true, nullable: false, blank: false
        diagnostico nullable: false, blank: false
        ativo nullable: false, blank: false
    }
}
