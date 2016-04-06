package nl.maastro.mia.gui.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ModuleConfiguration.
 */
@Entity
@Table(name = "module_configuration")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ModuleConfiguration implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "module_name")
    private String moduleName;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "module_configuration_computation",
               joinColumns = @JoinColumn(name="module_configurations_id", referencedColumnName="ID"),
               inverseJoinColumns = @JoinColumn(name="computations_id", referencedColumnName="ID"))
    private Set<Computation> computations = new HashSet<>();

    @ManyToMany(mappedBy = "modules")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Configuration> configurations = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public Set<Computation> getComputations() {
        return computations;
    }

    public void setComputations(Set<Computation> computations) {
        this.computations = computations;
    }

    public Set<Configuration> getConfigurations() {
        return configurations;
    }

    public void setConfigurations(Set<Configuration> configurations) {
        this.configurations = configurations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ModuleConfiguration moduleConfiguration = (ModuleConfiguration) o;
        if(moduleConfiguration.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, moduleConfiguration.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ModuleConfiguration{" +
            "id=" + id +
            ", moduleName='" + moduleName + "'" +
            '}';
    }
}
