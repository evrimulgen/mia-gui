package nl.maastro.mia.gui.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Configuration.
 */
@Entity
@Table(name = "configuration")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Configuration implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "configuration_identifier")
    private String configurationIdentifier;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "configuration_module",
               joinColumns = @JoinColumn(name="configurations_id", referencedColumnName="ID"),
               inverseJoinColumns = @JoinColumn(name="modules_id", referencedColumnName="ID"))
    private Set<ModuleConfiguration> modules = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getConfigurationIdentifier() {
        return configurationIdentifier;
    }

    public void setConfigurationIdentifier(String configurationIdentifier) {
        this.configurationIdentifier = configurationIdentifier;
    }

    public Set<ModuleConfiguration> getModules() {
        return modules;
    }

    public void setModules(Set<ModuleConfiguration> moduleConfigurations) {
        this.modules = moduleConfigurations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Configuration configuration = (Configuration) o;
        if(configuration.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, configuration.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Configuration{" +
            "id=" + id +
            ", userId='" + userId + "'" +
            ", configurationIdentifier='" + configurationIdentifier + "'" +
            '}';
    }
}
