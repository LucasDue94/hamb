package hamb

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class SalaServiceSpec extends Specification {

    SalaService salaService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Sala(...).save(flush: true, failOnError: true)
        //new Sala(...).save(flush: true, failOnError: true)
        //Sala sala = new Sala(...).save(flush: true, failOnError: true)
        //new Sala(...).save(flush: true, failOnError: true)
        //new Sala(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //sala.id
    }

    void "test get"() {
        setupData()

        expect:
        salaService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Sala> salaList = salaService.list(max: 2, offset: 2)

        then:
        salaList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        salaService.count() == 5
    }

    void "test delete"() {
        Long salaId = setupData()

        expect:
        salaService.count() == 5

        when:
        salaService.delete(salaId)
        sessionFactory.currentSession.flush()

        then:
        salaService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Sala sala = new Sala()
        salaService.save(sala)

        then:
        sala.id != null
    }
}
