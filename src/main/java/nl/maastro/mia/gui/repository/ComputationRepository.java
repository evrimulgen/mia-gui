package nl.maastro.mia.gui.repository;

import nl.maastro.mia.gui.domain.Computation;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Computation entity.
 */
public interface ComputationRepository extends JpaRepository<Computation,Long> {

    @Query("select distinct computation from Computation computation left join fetch computation.vois")
    List<Computation> findAllWithEagerRelationships();

    @Query("select computation from Computation computation left join fetch computation.vois where computation.id =:id")
    Computation findOneWithEagerRelationships(@Param("id") Long id);

}
