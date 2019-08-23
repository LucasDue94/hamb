package integracao

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class PacienteAgendadoServiceSpec extends Specification {

    PacienteAgendadoService pacienteAgendadoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new PacienteAgendado(...).save(flush: true, failOnError: true)
        //new PacienteAgendado(...).save(flush: true, failOnError: true)
        //PacienteAgendado pacienteAgendado = new PacienteAgendado(...).save(flush: true, failOnError: true)
        //new PacienteAgendado(...).save(flush: true, failOnError: true)
        //new PacienteAgendado(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //pacienteAgendado.id
    }

    void "test get"() {
        setupData()

        expect:
        pacienteAgendadoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<PacienteAgendado> pacienteAgendadoList = pacienteAgendadoService.list(max: 2, offset: 2)

        then:
        pacienteAgendadoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        pacienteAgendadoService.count() == 5
    }

    void "test delete"() {
        Long pacienteAgendadoId = setupData()

        expect:
        pacienteAgendadoService.count() == 5

        when:
        pacienteAgendadoService.delete(pacienteAgendadoId)
        sessionFactory.currentSession.flush()

        then:
        pacienteAgendadoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        PacienteAgendado pacienteAgendado = new PacienteAgendado()
        pacienteAgendadoService.save(pacienteAgendado)

        then:
        pacienteAgendado.id != null
    }
}
