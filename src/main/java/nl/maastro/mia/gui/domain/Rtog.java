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
 * A Rtog.
 */
@Entity
@Table(name = "rtog")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Rtog implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "rtog_name")
    private String rtogName;

    @ManyToMany(mappedBy = "rtogss")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<VolumeOfInterest> vois = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRtogName() {
        return rtogName;
    }

    public void setRtogName(String rtogName) {
        this.rtogName = rtogName;
    }

    public Set<VolumeOfInterest> getVois() {
        return vois;
    }

    public void setVois(Set<VolumeOfInterest> volumeOfInterests) {
        this.vois = volumeOfInterests;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Rtog rtog = (Rtog) o;
        if(rtog.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, rtog.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Rtog{" +
            "id=" + id +
            ", rtogName='" + rtogName + "'" +
            '}';
    }
}
