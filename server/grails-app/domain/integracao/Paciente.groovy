package integracao

class Paciente {
    String id
    String nome
    String nomeMae
    String contato
    Date dataNasc

    static constraints = {
        nome nullable: false, blank: false
        dataNasc nullable: false, blank: false
        nomeMae nullable: false,blank: false
        contato nullable: true
    }

    static mapping = {
        id generator: 'assigned'
        version false
    }
}
