package integracao

import hamb.Sala
import hamb.Usuario

class Agenda {
    String id //cod_provisorio
    Usuario medico
    String codReg
    Date data
    Convenio convenio

    static hasMany = [pacientes: Paciente]
    static belongsTo = [sala: Sala]

    static constraints = {
        medico nullable: false, blank: false
        codReg nullable: false, blank: false
        data nullable: false, blank: false
        convenio nullable: false, blank: false
    }

    static mapping = {
        id generator: 'assigned'
        version false
    }

}
