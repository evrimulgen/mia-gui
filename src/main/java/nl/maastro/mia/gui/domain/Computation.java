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
 * A Computation.
 */
@Entity
@Table(name = "computation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Computation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "computation_identifier")
    private String computationIdentifier;

    @Column(name = "config")
    private String config;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "computation_voi",
               joinColumns = @JoinColumn(name="computations_id", referencedColumnName="ID"),
               inverseJoinColumns = @JoinColumn(name="vois_id", referencedColumnName="ID"))
    private Set<VolumeOfInterest> vois = new HashSet<>();

    @ManyToMany(mappedBy = "computations")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ModuleConfiguration> modules = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComputationIdentifier() {
        return computationIdentifier;
    }

    public void setComputationIdentifier(String computationIdentifier) {
        this.computationIdentifier = computationIdentifier;
    }

    public String getConfig() {
        return config;
    }

    public void setConfig(String config) {
        this.config = config;
    }

    public Set<VolumeOfInterest> getVois() {
        return vois;
    }

    public void setVois(Set<VolumeOfInterest> volumeOfInterests) {
        this.vois = volumeOfInterests;
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
        Computation computation = (Computation) o;
        if(computation.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, computation.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Computation{" +
            "id=" + id +
            ", computationIdentifier='" + computationIdentifier + "'" +
            ", config='" + config + "'" +
            '}';
    }
}
