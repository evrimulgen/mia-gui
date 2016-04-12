package nl.maastro.mia.gui.repository;

import nl.maastro.mia.gui.domain.Computation;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Computation entity.
 */
public interface ComputationRepository extends JpaRepository<Computation,Long> {

}
