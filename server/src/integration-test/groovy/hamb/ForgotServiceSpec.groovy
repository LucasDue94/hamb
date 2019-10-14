package hamb

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class ForgotServiceSpec extends Specification {

    ForgotService forgotService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Forgot(...).save(flush: true, failOnError: true)
        //new Forgot(...).save(flush: true, failOnError: true)
        //Forgot forgot = new Forgot(...).save(flush: true, failOnError: true)
        //new Forgot(...).save(flush: true, failOnError: true)
        //new Forgot(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //forgot.id
    }

    void "test get"() {
        setupData()

        expect:
        forgotService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Forgot> forgotList = forgotService.list(max: 2, offset: 2)

        then:
        forgotList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        forgotService.count() == 5
    }

    void "test delete"() {
        Long forgotId = setupData()

        expect:
        forgotService.count() == 5

        when:
        forgotService.delete(forgotId)
        sessionFactory.currentSession.flush()

        then:
        forgotService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Forgot forgot = new Forgot()
        forgotService.save(forgot)

        then:
        forgot.id != null
    }
}
