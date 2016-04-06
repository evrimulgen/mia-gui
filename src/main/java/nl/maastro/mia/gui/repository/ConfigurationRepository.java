package nl.maastro.mia.gui.repository;

import nl.maastro.mia.gui.domain.Configuration;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Configuration entity.
 */
public interface ConfigurationRepository extends JpaRepository<Configuration,Long> {

    @Query("select distinct configuration from Configuration configuration left join fetch configuration.modules")
    List<Configuration> findAllWithEagerRelationships();

    @Query("select configuration from Configuration configuration left join fetch configuration.modules where configuration.id =:id")
    Configuration findOneWithEagerRelationships(@Param("id") Long id);

}
