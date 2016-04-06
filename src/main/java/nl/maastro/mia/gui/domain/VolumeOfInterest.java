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
 * A VolumeOfInterest.
 */
@Entity
@Table(name = "volume_of_interest")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class VolumeOfInterest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "volume_of_interest_rtogs",
               joinColumns = @JoinColumn(name="volume_of_interests_id", referencedColumnName="ID"),
               inverseJoinColumns = @JoinColumn(name="rtogss_id", referencedColumnName="ID"))
    private Set<Rtog> rtogss = new HashSet<>();

    @ManyToMany(mappedBy = "vois")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Computation> computations = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Rtog> getRtogss() {
        return rtogss;
    }

    public void setRtogss(Set<Rtog> rtogs) {
        this.rtogss = rtogs;
    }

    public Set<Computation> getComputations() {
        return computations;
    }

    public void setComputations(Set<Computation> computations) {
        this.computations = computations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        VolumeOfInterest volumeOfInterest = (VolumeOfInterest) o;
        if(volumeOfInterest.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, volumeOfInterest.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "VolumeOfInterest{" +
            "id=" + id +
            ", name='" + name + "'" +
            '}';
    }
}
