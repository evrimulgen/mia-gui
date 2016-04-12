package nl.maastro.mia.gui.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
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

    @NotNull
    @Column(name = "computation_identifier", nullable = false)
    private String computationIdentifier;

    @Column(name = "module_name")
    private String moduleName;

    @Column(name = "computation_configuration")
    private String computationConfiguration;

    @ManyToOne
    private VolumeOfInterest volumeOfInterest;

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

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public String getComputationConfiguration() {
        return computationConfiguration;
    }

    public void setComputationConfiguration(String computationConfiguration) {
        this.computationConfiguration = computationConfiguration;
    }

    public VolumeOfInterest getVolumeOfInterest() {
        return volumeOfInterest;
    }

    public void setVolumeOfInterest(VolumeOfInterest volumeOfInterest) {
        this.volumeOfInterest = volumeOfInterest;
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
            ", moduleName='" + moduleName + "'" +
            ", computationConfiguration='" + computationConfiguration + "'" +
            '}';
    }
}
