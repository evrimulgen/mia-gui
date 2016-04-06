package nl.maastro.mia.gui.repository;

import nl.maastro.mia.gui.domain.VolumeOfInterest;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the VolumeOfInterest entity.
 */
public interface VolumeOfInterestRepository extends JpaRepository<VolumeOfInterest,Long> {

    @Query("select distinct volumeOfInterest from VolumeOfInterest volumeOfInterest left join fetch volumeOfInterest.rtogss")
    List<VolumeOfInterest> findAllWithEagerRelationships();

    @Query("select volumeOfInterest from VolumeOfInterest volumeOfInterest left join fetch volumeOfInterest.rtogss where volumeOfInterest.id =:id")
    VolumeOfInterest findOneWithEagerRelationships(@Param("id") Long id);

}
