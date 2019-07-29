package integracao

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class AgendaServiceSpec extends Specification {

    AgendaService agendaService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Agenda(...).save(flush: true, failOnError: true)
        //new Agenda(...).save(flush: true, failOnError: true)
        //Agenda agenda = new Agenda(...).save(flush: true, failOnError: true)
        //new Agenda(...).save(flush: true, failOnError: true)
        //new Agenda(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //agenda.id
    }

    void "test get"() {
        setupData()

        expect:
        agendaService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Agenda> agendaList = agendaService.list(max: 2, offset: 2)

        then:
        agendaList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        agendaService.count() == 5
    }

    void "test delete"() {
        Long agendaId = setupData()

        expect:
        agendaService.count() == 5

        when:
        agendaService.delete(agendaId)
        sessionFactory.currentSession.flush()

        then:
        agendaService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Agenda agenda = new Agenda()
        agendaService.save(agenda)

        then:
        agenda.id != null
    }
}
