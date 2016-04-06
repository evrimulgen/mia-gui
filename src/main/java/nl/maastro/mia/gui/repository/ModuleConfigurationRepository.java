package nl.maastro.mia.gui.repository;

import nl.maastro.mia.gui.domain.ModuleConfiguration;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the ModuleConfiguration entity.
 */
public interface ModuleConfigurationRepository extends JpaRepository<ModuleConfiguration,Long> {

    @Query("select distinct moduleConfiguration from ModuleConfiguration moduleConfiguration left join fetch moduleConfiguration.computations")
    List<ModuleConfiguration> findAllWithEagerRelationships();

    @Query("select moduleConfiguration from ModuleConfiguration moduleConfiguration left join fetch moduleConfiguration.computations where moduleConfiguration.id =:id")
    ModuleConfiguration findOneWithEagerRelationships(@Param("id") Long id);

}
