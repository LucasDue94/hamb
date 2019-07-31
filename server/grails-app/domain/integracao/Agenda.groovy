package integracao

class Agenda {

    String id
    String crm
    Date dataHora
    Sala sala

    static hasMany = [pacientes: PacienteAgendado]

    static mapping = {
        id generator: 'assigned'
        version false
    }
}
