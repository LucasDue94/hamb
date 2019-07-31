package integracao

class PacienteAgendado {

    String id
    String nome
    Date nascimento
    Convenio convenio
    Date hora
    RegistroAtendimento registro

    static belongsTo = [agenda: Agenda]

    static mapping = {
        id generator: 'assigned'
        version false
    }
}
